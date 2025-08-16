export const checkResponse = (data) => {
  return data.ok ? data.json() : data.json().then((err) => Promise.reject(err));
};
