// Importing components and hooks
import EmptyBasket from "@components/EmptyBasket";
import Header from "@components/Header";
import ProductsList from "@components/ProductsList";
import CATEGORIES from "@constants/categories";
import { useProducts } from "@hooks/useProducts";
import { inputStyles } from "@styles";
import { useRouter } from "expo-router";
import { Button, Input, Select } from "native-base";

export default function Products() {
  // Retrieving products and router functions
  const {
    allProducts,
    allFilteredProducts,
    clearProducts,
    filters,
    setFilters,
  } = useProducts();
  const { push } = useRouter();

  // Routing function to home screen
  const routeHome = () => push("/");

  const renderCorrectComponent = () => {
    if (!allProducts.length) {
      return <EmptyBasket message="Basket is Empty" />;
    } else if (!allFilteredProducts.length) {
      return <EmptyBasket message="Products not found" />;
    } else {
      return <ProductsList />;
    }
  };

  return (
    <>
      {/* Header component */}
      <Header />

      <Input
        placeholder="Enter the desired product name"
        value={filters.name}
        onChangeText={(name) => setFilters((state) => ({ ...state, name }))}
        {...inputStyles}
      />

      <Select
        selectedValue={filters.category}
        placeholder="Choose Category"
        _selectedItem={{
          bg: "teal.600",
        }}
        onValueChange={(category) =>
          setFilters((state) => ({ ...state, category }))
        }
        {...inputStyles}
      >
        {/* Map over categories and render a Select.Item component for each */}
        <Select.Item label="All" value="" />
        {CATEGORIES.map(({ id, slug, label }) => (
          <Select.Item key={id} label={label} value={slug} />
        ))}
      </Select>

      {renderCorrectComponent()}

      {/* Button to clear all products */}
      <Button onPress={clearProducts} mt={2} height={50} size="lg">
        Clear Basket
      </Button>

      {/* Button to route back to home screen */}
      <Button onPress={routeHome} mt={2} height={50} size="lg">
        Route Home
      </Button>
    </>
  );
}
