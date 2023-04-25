import { images } from "@constants";
import { ProductsProvider } from "@hooks/useProducts";
import { Slot } from "expo-router";
import { NativeBaseProvider } from "native-base";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function Layout() {
  return (
    <ProductsProvider>
      <NativeBaseProvider>
        <ImageBackground
          source={images.background}
          style={styles.backgroundImage}
        >
          <SafeAreaView>
            <View style={styles.container}>
              <Slot />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </NativeBaseProvider>
    </ProductsProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "rgba(0,0,0,0.25)",
    margin: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#fff",
    backdropFilter: "blur(6px)",
  },
});
