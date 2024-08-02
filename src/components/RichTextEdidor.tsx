import { ScrollView, StatusBar, StyleSheet } from "react-native";
import React, { LegacyRef } from "react";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";

const RichTextEdidor = ({
  _editor,
  initialContentHTML,
  onChange,
  onBlur,
}: {
  _editor: React.RefObject<unknown> | LegacyRef<QuillEditor> | undefined;
  initialContentHTML?: string;
  onChange: (data: any) => void;
  onBlur: () => void;
}) => {
  return (
    <React.Fragment>
      <ScrollView style={styles.root}>
        <QuillEditor
          style={styles.editor}
          ref={_editor}
          initialHtml={`${
            initialContentHTML !== undefined ? initialContentHTML : ""
          }`}
          onHtmlChange={({ html }) => {
            if (html.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
              html = ""; // that's for handling empty tags
            }
            onChange(html);
          }}
          onBlur={onBlur}
        />
      </ScrollView>
    </React.Fragment>
  );
};

export default RichTextEdidor;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#eaeaea",
  },
  editor: {
    flex: 1,
    height: 250,
    padding: 0,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 5,
    backgroundColor: "white",
  },
});
