import { useFonts } from "expo-font";
import { useState } from "react";

const useFontsLoaded = () => {
  const [fontsLoaded] = useFonts({
    "Inter-Light": require("assets/fonts/static/Inter-Light.ttf"),
    "Inter-Medium": require("assets/fonts/static/Inter-Medium.ttf"),
    "Inter-Regular": require("assets/fonts/static/Inter-Regular.ttf"),
    "Inter-Bold": require("assets/fonts/static/Inter-Bold.ttf"),
    "Inter-Black": require("assets/fonts/static/Inter-Black.ttf"),
    "Inter-SemiBold": require("assets/fonts/static/Inter-SemiBold.ttf"),
    "Inter-Thin": require("assets/fonts/static/Inter-Thin.ttf"),
    "Inter-ExtraBold": require("assets/fonts/static/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("assets/fonts/static/Inter-ExtraLight.ttf"),
  });

  return fontsLoaded;
};

export default useFontsLoaded;
