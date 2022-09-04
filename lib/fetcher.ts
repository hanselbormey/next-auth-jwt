export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  debugger;
  console.log(JSON.stringify(res));
  /*   if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  } */
  return res.json();
}
