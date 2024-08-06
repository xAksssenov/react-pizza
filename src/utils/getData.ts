const getLocalStorageData = (key: string, value: any) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : value;
};

export const getCart = () => getLocalStorageData("cart", []);
export const getPrice = () => getLocalStorageData("price", 0);
export const getCount = () => getLocalStorageData("count", 0);
