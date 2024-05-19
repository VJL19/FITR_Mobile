import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import React, { useState } from "react";

const CheckoutScreen = ({ url }: { url: string }) => {
  const url_checkout = url;

  const [confirmationUrl, setConfirmationUrl] = useState("");
  const checkout_link = url;

  console.log("url passed in props", url_checkout);
  console.log("url var", checkout_link);
  console.log("the next url of the webview is " + confirmationUrl);
  return (
    <View style={styles.container}>
      {url !== checkout_link ? (
        <View>
          <Text>You paid today!</Text>
        </View>
      ) : (
        <WebView
          originWhitelist={["*"]}
          source={{
            uri: url,
          }}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          style={styles.webStyle}
          onNavigationStateChange={(state) => {
            setConfirmationUrl(state.url);
          }}
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
