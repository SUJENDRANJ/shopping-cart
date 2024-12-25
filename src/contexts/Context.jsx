import React, { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducers";

// Create a context for Cart state
const CartContext = createContext();

// Initial state for the reducer
const initialState = {
  cart: [],
  products: [],
  isLoading: true,
};

// CartProvider component
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=30");
        const data = await response.json();

        dispatch({
          type: "SET_PRODUCTS",
          payload: data.products,
        }); // Dispatch fetched products
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        // Set loading to false
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      }
    };

    fetchData();
  }, []); // Fetch only once on mount

  return (
    <CartContext.Provider
      value={{ state, dispatch, productState, productDispatch }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for accessing the context
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export default CartProvider;
