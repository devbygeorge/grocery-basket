import { images } from "@constants";
import { Box, Text, Image } from "native-base";

// A component that displays an empty basket image and a message
export default function EmptyBasket({ message }) {
  return (
    // A box that contains the message and the image
    <Box py={38} alignItems="center" justifyContent="center" gap={4}>
      {/* The message displayed in the center of the box */}
      <Text fontSize={32} color="#fff" textAlign="center">
        {message}
      </Text>
      {/* The image of an empty basket */}
      <Image source={images.basket} alt="Basket" width={165} height={120} />
    </Box>
  );
}
