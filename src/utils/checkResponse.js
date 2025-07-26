export const checkResponse = (data) => {
  return data.ok ? data.json() : Promise.reject(`Ошибка ${data.status}`);
};
