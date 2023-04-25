import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { v4 as uuidv4 } from "uuid";

const productSchema = {
  id: "",
  name: "",
  category: "",
  price: "0.05",
  quantity: "1",
  currency: "$",
  quantityType: "x",
  checked: false,
};

const filtersSchema = {
  name: "",
  category: "",
};

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(productSchema);
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
  }, [filtersSchema]);

  const handleAddProduct = useCallback(() => {
    if (newProduct.name.length < 3) {
      setErrorMessage("Please use more than 2 characters in name");
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    const product = {
      ...newProduct,
      id: uuidv4(),
    };

    if (!product.category.length) {
      product.category = "grocery";
    }

    setAllProducts((prevAllProducts) => [...prevAllProducts, product]);
    setNewProduct(productSchema);

    setSuccessMessage("Product has been added successfully");
    setTimeout(() => setSuccessMessage(""), 2000);
  }, [newProduct, productSchema]);

  const handleProductCheck = useCallback((productId) => {
    setAllProducts((prevAllProducts) => {
      return prevAllProducts.filter((product) => product.id !== productId);
    });
  }, []);

  const contextValues = {
    allProducts,
    allFilteredProducts,
    newProduct,
    setNewProduct,
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
