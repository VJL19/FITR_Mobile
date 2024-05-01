import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import bmiSchema from "../../utils/validations/bmi.validations";
import CustomTextInput from "../../components/CustomTextInput";
import DisplayFormError from "../../components/DisplayFormError";
import calculateBMI from "../../utils/helpers/getBmi";
import getClassification from "../../utils/helpers/getClassification";
export interface IBMIField {
  Height: string;
  Weight: string;
}

const IDefaultValue: IBMIField = {
  Height: "",
  Weight: "",
};
const CalculateBMI = () => {
  const [BMI, setBMI] = useState("");
  const [classification, setClassificiation] = useState("");

  const {
    handleSubmit,
    reset,
    control,
    formState: { isLoading, errors, isSubmitted },
  } = useForm<IBMIField>({
    defaultValues: IDefaultValue,
    resolver: joiResolver(bmiSchema),
  });

  const onCalculate = async (data: IBMIField) => {
    const res = calculateBMI(+data.Height, +data.Weight);
    console.log(data);
    setBMI(res.toFixed(2));
    setClassificiation(getClassification(res));
  };
  return (
    <View style={styles.container}>
      <Text>CalculateBMI</Text>
      <View style={{ width: "90%" }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <React.Fragment>
              <Text
                style={{
                  color: "#f5f5f5",
                  fontSize: 18,
                  fontFamily: "Inter-Bold",
                  letterSpacing: 1,
                }}
              >
                Height
              </Text>

              <CustomTextInput
                inputMode="numeric"
                error={errors.Height}
                placeholder="Enter your Height in cm"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            </React.Fragment>
          )}
          name="Height"
        />
        <DisplayFormError errors={errors.Height} />
      </View>
      <View style={{ width: "90%" }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <React.Fragment>
              <Text
                style={{
                  color: "#f5f5f5",
                  fontSize: 18,
                  fontFamily: "Inter-Bold",
                  letterSpacing: 1,
                }}
              >
                Weight
              </Text>
              <CustomTextInput
                inputMode="numeric"
                error={errors.Height}
                placeholder="Enter your Weight in kg"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            </React.Fragment>
          )}
          name="Weight"
        />
        <DisplayFormError errors={errors.Weight} />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: " 50%" }}>
          <Button title="Clear" color="#121212" onPress={() => reset()} />
        </View>
        <View style={{ width: " 50%" }}>
          <Button
            title="calculate"
            color="#ff2e00"
            onPress={handleSubmit(onCalculate)}
          />
        </View>
      </View>
      <View>
        <Text style={styles.textStyle}>Your BMI is: {BMI}</Text>
        <Text style={styles.textStyle}>
          Your BMI is: classified as {classification}
        </Text>
      </View>
    </View>
  );
};

export default CalculateBMI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202020",
  },
  textStyle: {
    color: "#f5f5f5",
  },
});
