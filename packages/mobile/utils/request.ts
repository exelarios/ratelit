type METHODS = "get" | "head" | "post" | "put" | "delete" | "connect" | "options" | "trace" | "patch";

enum STATUS {
  SUCCESS,
  FAIL,
  ERROR
}

interface Response<T> {
  status: STATUS;
  message?: string;
  data: T
}

async function fetcher<Input, Output>(method: METHODS, input: URL | RequestInfo, body: Input, init?: RequestInit) {

  const response = await fetch(input, {
    method: method,
    body: JSON.stringify(body),
    ...init
  });

  const data = await response.json() as Response<Output>;
  if (data.status !== STATUS.SUCCESS) {

  }

}

function HTTPRequest(baseURL?: string) {
  return {
    post: async <Input extends {}, Output>(input: URL | RequestInfo, body: Input, init?: RequestInit) => {
      const URL = baseURL ? `${baseURL}/${input}` : input;
      return fetcher<Input, Output>("post", URL, body, init);
    },
  }
}

const request = HTTPRequest("http://localhost:3000");

export default request;