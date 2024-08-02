import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { QuillToolbar } from "react-native-cn-quill";

const RichToolBar = ({ _editor }: { _editor: React.RefObject<unknown> }) => {
  return <QuillToolbar editor={_editor} options="full" theme="light" />;
};

export default RichToolBar;

const styles = StyleSheet.create({});
