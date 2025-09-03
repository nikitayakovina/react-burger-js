export const checkResponse = <T>(data): Promise<T> => {
  return data.ok ? data.json() : data.json().then((err) => Promise.reject(err));
};
