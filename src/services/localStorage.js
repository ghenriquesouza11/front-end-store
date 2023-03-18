const savedProductsKey = 'savedProducts';
if (!JSON.parse(localStorage.getItem(savedProductsKey))) {
  localStorage.setItem(savedProductsKey, JSON.stringify([]));
}
export const addProduct = (productOBJ) => {
  const savedProducts = JSON.parse(localStorage.getItem(savedProductsKey));
  const saved = savedProducts.find((product) => product.product.id === productOBJ.id);
  if (saved) {
    saved.amount += 1;
  } else {
    savedProducts.push({ amount: 1, product: productOBJ });
  }
  localStorage.setItem(savedProductsKey, JSON.stringify(savedProducts));
};

export const increaseProduct = (productID) => {
  const savedProducts = JSON.parse(localStorage.getItem(savedProductsKey));
  const saved = savedProducts.find((product) => product.product.id === productID);
  saved.amount += 1;
  localStorage.setItem(savedProductsKey, JSON.stringify(savedProducts));
};
export const decreaseProduct = (productID) => {
  const savedProducts = JSON.parse(localStorage.getItem(savedProductsKey));
  const saved = savedProducts.find((product) => product.product.id === productID);
  saved.amount -= 1;
  localStorage.setItem(savedProductsKey, JSON.stringify(savedProducts));
};
export const removeProduct = (productID) => {
  const savedProducts = JSON.parse(localStorage.getItem(savedProductsKey));
  const newSavedProducts = savedProducts
    .filter((product) => product
      .product.id !== productID);
  localStorage.setItem(savedProductsKey, JSON.stringify(newSavedProducts));
};
