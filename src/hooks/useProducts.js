import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { v4 as uuidv4 } from "uuid";

const filtersSchema = {
  name: "",
  category: "",
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState(filtersSchema);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const allFilteredProducts = useMemo(
    () =>
      allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(filters.name.toLowerCase()) &&
          product.category
            .toLowerCase()
            .includes(filters.category.toLowerCase())
      ),
    [allProducts, filters]
  );

  const clearProducts = useCallback(() => {
    setAllProducts([]);
    setFilters(filtersSchema);
  }, []);

  const handleAddProduct = useCallback((product, reset) => {
    if (product.name.length < 3) {
      setErrorMessage("Please use more than 2 characters in name");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    if (!product.category.length) {
      product.category = "grocery";
    }

    const extendedProduct = {
      ...product,
      id: uuidv4(),
      checked: false,
    };

    setAllProducts((prevAllProducts) => [...prevAllProducts, extendedProduct]);

    setSuccessMessage("Product has been added successfully");
    setTimeout(() => setSuccessMessage(""), 2000);

    reset();
  }, []);

  const handleProductCheck = useCallback((productId) => {
    setAllProducts((prevAllProducts) => {
      return prevAllProducts.filter((product) => product.id !== productId);
    });
  }, []);

  const contextValues = {
    allProducts,
    allFilteredProducts,
    filters,
    setFilters,
    handleAddProduct,
    errorMessage,
    successMessage,
    clearProducts,
    handleProductCheck,
  };

  return (
    <ProductsContext.Provider value={contextValues}>
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => useContext(ProductsContext);

export { ProductsProvider, useProducts };
