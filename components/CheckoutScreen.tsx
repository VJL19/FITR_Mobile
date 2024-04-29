import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import React from "react";

const CheckoutScreen = () => {
  const url_checkout = "https://checkout.paymongo.com/null";

  return (
    <View style={styles.container}>
      {url_checkout == "https://checkout.paymongo.com/null" ? (
        <View>
          <Text>You paid today!</Text>
        </View>
      ) : (
        <WebView
          originWhitelist={["*"]}
          source={{
            uri: url_checkout,
          }}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          style={styles.webStyle}
        />
      )}
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },
  webStyle: {
    flexGrow: 1,
    marginTop: 25,
  },
});
