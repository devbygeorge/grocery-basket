import { icons } from "@constants";
import { useProducts } from "@hooks/useProducts";
import { Box, Text, Image, FlatList, Pressable } from "native-base";

// ProductItem component that displays a list of products
export default function ProductList() {
  // Retrieve allFilteredProducts and handleProductCheck from useProducts hook
  const { allFilteredProducts, handleProductCheck } = useProducts();

  // Define the gap between items
  const ITEM_GAP = 2;

  // Create a component to render the empty space between items
  const ItemSeparator = () => <Box height={ITEM_GAP} />;

  // Render each product item
  const renderItem = ({ item: product }) => (
    <Box
      key={product.id}
      flexDirection="row"
      alignItems="center"
      bg="#fff"
      borderRadius={8}
      textTransform="capitalize"
    >
      {/* Render the product name */}
      <Text flex={1} my={2} ml={3} numberOfLines={1} ellipsizeMode="tail">
        {product.name}
      </Text>

      {/* Render the product category icon */}
      <Image
        source={icons[product.category]}
        alt={product.category}
        w={25}
        h={25}
        mx={2}
        resizeMode="contain"
      />

      {/* Render the product quantity */}
      <Box
        bg="#d33c4f"
        w={54}
        h="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        textTransform="uppercase"
      >
        <Text color="#fff">{product.quantity}</Text>
        <Text color="#fff">{product.quantityType}</Text>
      </Box>

      {/* Render the product price */}
      <Box
        bg="#0f80a3"
        w={54}
        h="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        textTransform="uppercase"
      >
        <Text color="#fff">{product.price}</Text>
        <Text color="#fff">{product.currency}</Text>
      </Box>

      {/* Render the product check button */}
      <Pressable mx={3} onPress={() => handleProductCheck(product.id)}>
        <Image source={icons.check} alt="Check" w={22} resizeMode="contain" />
      </Pressable>
    </Box>
  );

  // Render the component
  return (
    <Box py={2} height={250}>
      <FlatList
        data={allFilteredProducts}
        renderItem={renderItem}
        keyExtractor={(product) => product.id.toString()}
        ItemSeparatorComponent={ItemSeparator}
      />
    </Box>
  );
}
