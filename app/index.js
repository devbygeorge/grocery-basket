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
import { useForm, useController } from "react-hook-form";

const NameField = ({ name, control }) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });
  return (
    <Input
      placeholder="Enter the desired product name"
      value={field.value}
      onChangeText={field.onChange}
      {...inputStyles}
    />
  );
};

const SelectField = ({ name, control }) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });

  return (
    <Select
      selectedValue={field.value}
      placeholder="Choose Category"
      _selectedItem={{
        bg: "teal.600",
      }}
      onValueChange={field.onChange}
      {...inputStyles}
    >
      {/* Map over categories and render a Select.Item component for each */}
      {CATEGORIES.map(({ id, slug, label }) => (
        <Select.Item key={id} label={label} value={slug} />
      ))}
    </Select>
  );
};

const PriceField = ({ name, control }) => {
  const { field } = useController({
    control,
    defaultValue: "0.05",
    name,
  });

  return (
    <Input
      placeholder="Enter price for product"
      keyboardType="numeric"
      value={field.value}
      onChangeText={field.onChange}
      {...inputStyles}
      maxLength={5}
    />
  );
};

const CurreciesRadios = ({ name, control }) => {
  const { field } = useController({
    control,
    defaultValue: "$",
    name,
  });

  return (
    <Radio.Group
      name="currencies"
      accessibilityLabel="currencies"
      value={field.value}
      onChange={field.onChange}
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
  );
};

const QuantityField = ({ name, control }) => {
  const { field } = useController({
    control,
    defaultValue: "1",
    name,
  });

  return (
    <Input
      placeholder="Enter quantity for product"
      keyboardType="numeric"
      value={field.value}
      onChangeText={field.onChange}
      {...inputStyles}
      maxLength={5}
    />
  );
};

const QuantityTypeRadios = ({ name, control }) => {
  const { field } = useController({
    control,
    defaultValue: "x",
    name,
  });

  return (
    <Radio.Group
      name="quantityType"
      accessibilityLabel="quantityType"
      value={field.value}
      onChange={field.onChange}
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
  );
};

export default function Home() {
  // Retrieving products and router functions
  const { errorMessage, successMessage, handleAddProduct } = useProducts();
  const { push } = useRouter();

  // Routing function to home screen
  const routeProducts = () => push("/products");

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (product) => {
    handleAddProduct(product, reset);
  };

  return (
    <>
      {/* Header component */}
      <Header />

      {/* Notification component with error message if there is one */}
      {errorMessage && <Notification type="error" message={errorMessage} />}

      {/* Notification component with success message if there is one */}
      {successMessage && <Notification message={successMessage} />}

      {/* Input component to add product name */}
      <NameField name="name" control={control} />

      {/* Select component to choose product category */}
      <SelectField name="category" control={control} />

      {/* Input component to add product price */}
      <PriceField name="price" control={control} />

      {/* Radio buttons to choose the product currency */}
      <CurreciesRadios name="currency" control={control} />

      {/* Input component to add product quantity */}
      <QuantityField name="quantity" control={control} />

      {/* Radio buttons to choose the product quantity type */}
      <QuantityTypeRadios name="quantityType" control={control} />

      {/* Button component to add product */}
      <Button onPress={handleSubmit(onSubmit)} {...buttonStyles}>
        Add Product
      </Button>

      {/* Button component to route to Products page */}
      <Button onPress={routeProducts} {...buttonStyles}>
        View Products
      </Button>
    </>
  );
}
