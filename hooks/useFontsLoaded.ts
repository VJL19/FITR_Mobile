import { useFonts } from "expo-font";
import { useState } from "react";

const useFontsLoaded = () => {
  const [fontsLoaded] = useFonts({
    "Inter-Light": require("../../../Client/FitrMobile/assets/fonts/static/Inter-Light.ttf"),
    "Inter-Medium": require("../../../Client/FitrMobile/assets/fonts/static/Inter-Medium.ttf"),
    "Inter-Regular": require("../../../Client/FitrMobile/assets/fonts/static/Inter-Regular.ttf"),
    "Inter-Bold": require("../../../Client/FitrMobile/assets/fonts/static/Inter-Bold.ttf"),
    "Inter-Black": require("../../../Client/FitrMobile/assets/fonts/static/Inter-Black.ttf"),
    "Inter-SemiBold": require("../../../Client/FitrMobile/assets/fonts/static/Inter-SemiBold.ttf"),
    "Inter-Thin": require("../../../Client/FitrMobile/assets/fonts/static/Inter-Thin.ttf"),
    "Inter-ExtraBold": require("../../../Client/FitrMobile/assets/fonts/static/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("../../../Client/FitrMobile/assets/fonts/static/Inter-ExtraLight.ttf"),
  });

  return fontsLoaded;
};

export default useFontsLoaded;
