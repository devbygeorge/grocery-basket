import { images } from "@constants";
import { Box, Text, Image } from "native-base";

// Component for the app header
export default function Header() {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="flex-end"
      gap={4}
      mb={4}
    >
      {/* Title */}
      <Text fontSize={24} color="#fff">
        Grocery Basket
      </Text>
      {/* Basket image */}
      <Image
        source={images.basket}
        resizeMode="cover"
        alt="Basket"
        w={75}
        h={55}
      />
    </Box>
  );
}
