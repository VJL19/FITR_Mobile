import { MD3LightTheme as DefaultTheme } from "react-native-paper";
const theme = {
  ...DefaultTheme,
  myOwnProperty: true,

  colors: {
    primary: "rgb(255, 46, 0)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 218, 211)",
    onPrimaryContainer: "rgb(62, 5, 0)",
    secondary: "rgba(255, 45, 0, .2)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 218, 211)",
    onSecondaryContainer: "rgb(62, 4, 0)",
    tertiary: "rgb(0, 104, 116)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(151, 240, 255)",
    onTertiaryContainer: "rgb(0, 31, 36)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(32, 26, 25)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(32, 26, 25)",
    surfaceVariant: "rgb(245, 221, 217)",
    onSurfaceVariant: "rgb(83, 67, 64)",
    outline: "rgb(133, 115, 111)",
    outlineVariant: "rgb(216, 194, 189)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(54, 47, 45)",
    inverseOnSurface: "rgb(251, 238, 235)",
    inversePrimary: "rgb(255, 180, 165)",
    elevation: {
      level0: "transparent",
      level1: "rgb(252, 240, 242)",
      level2: "rgb(249, 233, 235)",
      level3: "rgb(247, 227, 227)",
      level4: "rgb(247, 225, 224)",
      level5: "rgb(245, 220, 219)",
    },
    surfaceDisabled: "rgba(32, 26, 25, 0.12)",
    onSurfaceDisabled: "rgba(32, 26, 25, 0.38)",
    backdrop: "rgba(59, 45, 42, 0.4)",
  }, // Copy it from the color codes scheme and then use it here
};
export default theme;