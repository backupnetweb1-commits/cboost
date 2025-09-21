import { useState, useEffect } from "react";

export interface Product {
  name: string;
  price: number;
  hashRate?: string;
  powerConsumption: string;
  efficiency?: string;
  roi: string | null;
  inStock: boolean;
  image: string;
}

 export const useShop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const createProduct = async (product: Product) => {
    try {
      const response = await fetch("https://crypto-invest-backend-1.onrender.com/api/v1/shop",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
        );
      const data = await response.json();
      setProducts([...products, data.data]);
    } catch (error) {
      setError(error);
    }
  };

  const updateProduct = async (product) => {
    try {
      const response = await fetch(`https://crypto-invest-backend-1.onrender.com/api/v1/shop/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
        );
      const data = await response.json();
      setProducts(products.map((p) => (p._id === data.data._id? data.data : p)));
    } catch (error) {
      setError(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`https://crypto-invest-backend-1.onrender.com/api/v1/shop/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
        );
      const data = await response.json();
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://crypto-invest-backend-1.onrender.com/api/v1/shop",

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setProducts(data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, isLoading, error, createProduct, updateProduct, deleteProduct };

};