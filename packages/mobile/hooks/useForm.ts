import { useCallback, useState } from "react";
import { z } from "zod";

interface ValidationSuccess<T> {
  success: true
  data: T
}

interface ValidationError<T> {
  success: false
  errors: T
}

interface UseFormParams<T> {
  state: T;
  onSubmit: (state: T) => Promise<any>;
  onValidate?: (state: T) => ValidationSuccess<T> | ValidationError<T>; // mannual validation
  zodValidation?: z.ZodObject<any>; // use zod to validate
}

type FormMessage = Record<string, any>;

function formatZodError<T>(state: T, zodErrors: z.SafeParseError<T>) {
  const issues = {};
  const errors = zodErrors.error.format();
  // Gets the raw format errors.

  // Begins a DFS on the object.
  const stack = [];
  // Since there's no root node, we will add all the top level nodes onto the stack.
  for (const key of Object.keys(state)) {
    stack.push({
      path: issues,
      key: key,
      currentState: typeof state[key] === "string" ? key : state[key],
      errors: errors[key]
    });
  }

  while(stack.length > 0) {
    const { path, key, currentState, errors } = stack.pop();

    // If there is only one key within the `errors` object,
    // this means we reached to a non-nested object.
    if (typeof currentState === "string") {
      path[key] = errors?._errors.join("\n");
    } else {
      // Gets the current keys in the nested oject's state.
      const innerState = Object.keys(currentState);

      // initialize the child's `issues` object as an object.
      path[key] = {};

      for (const innerKey of innerState) {
        stack.push({
          key: innerKey,
          currentState: currentState[innerKey],
          path: path[key],
          errors: errors[innerKey]
        });
      }
    }
  }

  console.log("@result", JSON.stringify(issues, null, 2));

  return issues;
}

function useForm<T extends object>(props: UseFormParams<T>) {
  // If zodValidation passes, it will also check for onValidate.
  const { state, onValidate, zodValidation, onSubmit } = props;

  const [value, setValue] = useState(state);
  const [message, setMessage] = useState<FormMessage>();
  
  const handleOnChange = useCallback((name: string, text: string) => {
    setValue((v) => {
      return {
        ...v,
        [name]: text
      };
    });
  }, [value]);

  const handleOnValidate = useCallback(() => {
    if (!onValidate) {
      return;
    }
    const form = onValidate(value);

    return form.success;
  }, [onValidate]);

  const handleOnZodValidate = useCallback((value: T) => {
    if (!zodValidation) {
      return;
    }

    const parse = zodValidation.safeParse(value);
    if (parse.success === false) {
      return formatZodError(state, parse);
    }

    return null;
  }, []);

  const handleOnSubmit = useCallback(async () => {
    // todo: if value passes validation using zod
    try {
      const issues = handleOnZodValidate(value);
      console.log("@issues", issues);
      if (issues) {
        setMessage(issues);
        return;
      }

      const response = await onSubmit(value);
      if (zodValidation) {
        // todo: revalidate the response and display back to the user.
        console.log(response);
      } else {
        // normal validation
      }
    } catch(error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }, [value]);

  return {
    value,
    message,
    onSubmit: handleOnSubmit,
    handleOnChange
  }
}

export default useForm;