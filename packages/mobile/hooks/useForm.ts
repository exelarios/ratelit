import { useCallback, useState } from "react";
import { z } from "zod";
import { useToast } from "../context/ToastContext";

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

function formatZodError<T>(zodErrors: z.SafeParseError<T>) {
  const issues = {}
  const errors = zodErrors.error.format();
  const stack = [];

  for (const key of Object.keys(errors)) {
    if (key === "_errors") continue;
    stack.push({
      path: issues,
      key: key,
      value: errors[key]
    });
  }

  while(stack.length > 0) {
    const { path, key, value } = stack.pop();

    if (Object.keys(value).length === 1) {
      path[key] = value?._errors.join("\n");
    } else {
      const innerPath = Object.keys(value);
      path[key] = {};

      for (const innerKey of innerPath) {
        if (innerKey === "_errors") continue;
        stack.push({
          path: path[key],
          key: innerKey,
          value: value[innerKey]
        })
      }
    }
  }

  return issues;
}

// This is the old method of formating zod errors
// which uses the user's input state rather than zod's schema.
function formatZodError2<T>(state: T, zodErrors: z.SafeParseError<T>) {
  const issues = {};
  const errors = zodErrors.error.format();

  console.log("errors", JSON.stringify(errors, null, 2));
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

    // At the end, if that key doesn't contain any data.
    // we will just remove that key from the object completely.
    // This will make it easier later, if we want to check if any fields contains issues.
    if (path[key] === null) {
      delete path[key];
    }
  }

  console.log("formatZodError", issues);
  return issues;
}

function useForm<T extends {}>(props: UseFormParams<T>) {
  // If zodValidation passes, it will also check for onValidate.
  const toast = useToast();
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
      return formatZodError(parse);
    }

    return null;
  }, [value]);

  const handleOnSubmit = useCallback(async () => {
    // todo: if value passes validation using zod
    try {
      const issues = handleOnZodValidate(value);
      if (issues != null) {
        console.log(issues);
        setMessage(issues);
        return;
      }

      const response = await onSubmit(value);
      console.log("RESPONSEEEE", response);
      if (zodValidation) {
        // todo: revalidate the response and display back to the user.
        console.log("response", response);
      } else {
        // normal validation
      }
    } catch(error) {
      if (error instanceof Error) {
        console.log("handleOnSubmit", error);
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