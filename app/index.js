import Header from "@components/Header";
import Notification from "@components/Notification";
import CATEGORIES from "@constants/categories";
import { useProducts } from "@hooks/useProducts";
import {
  inputStyles,
  buttonStyles,
  radioGroupStyles,
  radioStyles,
} from "@styles";
import { useRouter } from "expo-router";
import { Select, Input, Button, Radio, Text } from "native-base";

export default function Home() {
  // Retrieving products and router functions
  const {
    errorMessage,
    successMessage,
    newProduct,
    setNewProduct,
    handleAddProduct,
  } = useProducts();
  const { push } = useRouter();

  // Routing function to home screen
  const routeProducts = () => push("/products");

  return (
    <>
      {/* Header component */}
      <Header />

      {/* Notification component with error message if there is one */}
      {errorMessage && <Notification type="error" message={errorMessage} />}

      {/* Notification component with success message if there is one */}
      {successMessage && <Notification message={successMessage} />}

      {/* Input component to add product name */}
      <Input
        placeholder="Enter the desired product name"
        value={newProduct.name}
        onChangeText={(name) => setNewProduct((state) => ({ ...state, name }))}
        {...inputStyles}
      />

      {/* Select component to choose product category */}
      <Select
        selectedValue={newProduct.category}
        placeholder="Choose Category"
        _selectedItem={{
          bg: "teal.600",
        }}
        onValueChange={(category) =>
          setNewProduct((state) => ({ ...state, category }))
        }
        {...inputStyles}
      >
        {/* Map over categories and render a Select.Item component for each */}
        {CATEGORIES.map(({ id, slug, label }) => (
          <Select.Item key={id} label={label} value={slug} />
        ))}
      </Select>

      {/* Input component to add product price */}
      <Input
        placeholder="Enter price for product"
        keyboardType="numeric"
        value={newProduct.price}
        onChangeText={(price) =>
          setNewProduct((state) => ({ ...state, price }))
        }
        {...inputStyles}
        maxLength={5}
      />

      {/* Radio buttons to choose the product currency */}
      <Radio.Group
        name="currencies"
        accessibilityLabel="currencies"
        value={newProduct.currency}
        onChange={(currency) => {
          setNewProduct((state) => ({ ...state, currency }));
        }}
        {...radioGroupStyles}
      >
        <Radio value="$" {...radioStyles}>
          <Text color="muted.50">$</Text>
        </Radio>
        <Radio value="₽" {...radioStyles}>
          <Text color="muted.50">₽</Text>
        </Radio>
        <Radio value="₾" {...radioStyles}>
          <Text color="muted.50">₾</Text>
        </Radio>
      </Radio.Group>

      {/* Input component to add product quantity */}
      <Input
        placeholder="Enter quantity for product"
        keyboardType="numeric"
        value={newProduct.quantity}
        onChangeText={(quantity) =>
          setNewProduct((state) => ({ ...state, quantity }))
        }
        {...inputStyles}
        maxLength={5}
      />

      {/* Radio buttons to choose the product quantity type */}
      <Radio.Group
        name="quantityType"
        accessibilityLabel="quantityType"
        value={newProduct.quantityType}
        onChange={(quantityType) => {
          setNewProduct((state) => ({ ...state, quantityType }));
        }}
        {...radioGroupStyles}
      >
        <Radio value="x" {...radioStyles}>
          <Text color="muted.50">x</Text>
        </Radio>
        <Radio value="kg" {...radioStyles}>
          <Text color="muted.50">kg</Text>
        </Radio>
        <Radio value="mg" {...radioStyles}>
          <Text color="muted.50">mg</Text>
        </Radio>
      </Radio.Group>

      {/* Button component to add product */}
      <Button onPress={handleAddProduct} {...buttonStyles}>
        Add Product
      </Button>

      {/* Button component to route to Products page */}
      <Button onPress={routeProducts} {...buttonStyles}>
        View Products
      </Button>
    </>
  );
}
