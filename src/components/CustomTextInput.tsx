import {
  InputModeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from "react-native";
import React from "react";
import { FieldError, FieldErrors } from "react-hook-form";
import IForm from "../utils/types/form.types";

interface ICustomTextInputProps {
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChange: (e: string) => void;
  value: string | undefined;
  error: FieldErrors<IForm> | undefined;
  inputMode?: InputModeOptions | undefined;
  placeholder: string;
  secureTextEntry?: boolean;
  isEditable?: boolean;
  maxLength?: number;
  readOnly?: boolean;
}

const CustomTextInput = ({
  onBlur,
  onChange,
  value,
  error,
  placeholder,
  inputMode,
  secureTextEntry,
  isEditable,
  maxLength,
  readOnly,
}: ICustomTextInputProps) => {
  return (
    <TextInput
      maxLength={maxLength}
      editable={isEditable}
      secureTextEntry={secureTextEntry}
      inputMode={inputMode}
      placeholder={placeholder}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      style={{
        borderWidth: 1,
        height: 55,
        borderRadius: 8,
        paddingLeft: 15,
        color: "#202020",
        borderColor: error ? "#d9534f" : "#202020",
        marginBottom: 10,
        fontSize: 16,
      }}
      placeholderTextColor={"#c2c2c2"}
      readOnly={readOnly}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({});
