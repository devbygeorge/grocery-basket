import { Box, Text } from "native-base";

export default function Notification({ message, type }) {
  return (
    <Box
      p={2}
      borderRadius={4}
      bg={type === "error" ? "red.500" : "green.500"}
      mb={2}
      alignItems="center"
      justifyContent="center"
    >
      <Text fontWeight="bold" color="white" textAlign="center">
        {message}
      </Text>
    </Box>
  );
}
