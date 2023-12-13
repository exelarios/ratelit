async function request<Input, Output>(input: URL | RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Response wasn't sucessfully. code = ${response.status}`);
  }

  const data = await response.json() as Output;
}

export default request;