import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FieldError, FieldErrors } from "react-hook-form";
import IForm from "../utils/types/form.types";

const DisplayFormError = ({ errors }: { errors: FieldError | undefined }) => {
  return (
    <View>
      {errors && (
        <Text style={{ color: "#d9534f", fontSize: 13 }}>{errors.message}</Text>
      )}
    </View>
  );
};

export default DisplayFormError;

const styles = StyleSheet.create({});
