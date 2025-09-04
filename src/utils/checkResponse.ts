export const checkResponse = <T>(data: Response): Promise<T> => {
  return data.ok ? data.json() : data.json().then((err) => Promise.reject(err));
};
