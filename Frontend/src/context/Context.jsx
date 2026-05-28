import { useState, useEffect, createContext } from "react";
import API from "../api";

export const AppContext = createContext({
  data: [],
  isError: "",
  cart: [],
  isLoading: true,
  addToCart: () => {},
  removeFromCart: () => {},
  refreshData: () => {},
  clearCart: () => {},
  updateStockQuantity: () => {},
});

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [isLoading, setIsLoading] = useState(true);


  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);
    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (productId) => {
    console.log("productID",productId)
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log("CART",cart)
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      const response = await API.get("/products");
      setData(response.data);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart =() =>{
    setCart([]);
  }
  
  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  return (
    <AppContext.Provider value={{ data, isError, cart, isLoading, addToCart, removeFromCart, refreshData, clearCart }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;