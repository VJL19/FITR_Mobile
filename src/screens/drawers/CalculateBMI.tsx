import { Button, Keyboard, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import bmiSchema from "utils/validations/bmi.validations";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import calculateBMI from "utils/helpers/getBmi";
import getClassification from "utils/helpers/getClassification";
import { AppDispatch, RootState } from "store/store";
import { useDispatch, useSelector } from "react-redux";
import { setRoute } from "reducers/routeReducer";
import getAccessToken from "actions/homeAction";
import LoadingIndicator from "components/LoadingIndicator";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import CustomError from "components/CustomError";
import { RadioGroup } from "react-native-radio-buttons-group";
import { Classification } from "utils/enums/Classification";

export interface IBMIField {
  Age: string;
  Gender: string;
  Height: string;
  Weight: string;
}

const IDefaultValue: IBMIField = {
  Age: "",
  Gender: "",
  Height: "",
  Weight: "",
};
const CalculateBMI = () => {
  const [BMI, setBMI] = useState("");
  const [classification, setClassificiation] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const { data, isError, isUninitialized, isFetching } =
    useGetAccessTokenQuery();

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<IBMIField>({
    defaultValues: IDefaultValue,
    resolver: joiResolver(bmiSchema),
  });

  const gender = [
    { id: "1", label: "Male", value: "1" },
    { id: "2", label: "Female", value: "2" },
  ];

  console.log("calculate bmi", data);

  useEffect(() => {
    dispatch(setRoute("Calculate BMI"));
    setValue("Height", data?.user?.Height?.toString()!);
    setValue("Weight", data?.user?.Weight?.toString()!);
    setValue("Age", data?.user?.Age?.toString()!);
    setValue("Gender", data?.user?.Gender === "Male" ? "1" : "2");
  }, []);

  const onCalculate = async (data: IBMIField) => {
    const res = calculateBMI(+data.Height, +data.Weight);
    console.log(data);
    setBMI(res.toFixed(2));
    setClassificiation(getClassification(res));
  };

  if (isFetching || isUninitialized) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <CustomError />;
  }
  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <React.Fragment>
              <Text
                style={{
                  color: "#202020",

                  fontSize: 18,
                  fontFamily: "Inter-Bold",
                  letterSpacing: 1,
                }}
              >
                Age
              </Text>

              <CustomTextInput
                inputMode="numeric"
                error={errors.Age}
                placeholder="Enter your Age"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            </React.Fragment>
          )}
          name="Age"
        />
        <DisplayFormError errors={errors.Age} />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <React.Fragment>
              <Text
                style={{
                  color: "#202020",
                  fontSize: 18,
                  fontFamily: "Inter-Bold",
                  letterSpacing: 1,
                }}
              >
                Gender
              </Text>

              <RadioGroup
                radioButtons={gender}
                onPress={onChange}
                selectedId={value}
                containerStyle={{ flexDirection: "row" }}
              />
            </React.Fragment>
          )}
          name="Gender"
        />
        <DisplayFormError errors={errors.Gender} />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <React.Fragment>
              <Text
                style={{
                  color: "#202020",
                  fontSize: 18,
                  fontFamily: "Inter-Bold",
                  letterSpacing: 1,
                }}
              >
                Height in cm
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
                  color: "#202020",
                  fontSize: 18,
                  fontFamily: "Inter-Bold",
                  letterSpacing: 1,
                }}
              >
                Weight in kg
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
        <Text style={styles.result}>Results: </Text>
        <Text style={styles.textStyle}>
          YOUR BMI IS:{" "}
          <Text
            style={[
              styles.textStyle,
              {
                color:
                  classification === Classification.NORMAL
                    ? "green"
                    : classification === Classification.UNDERWEIGHT
                    ? "orange"
                    : "red",
                fontFamily: "Inter-Bold",
              },
            ]}
          >
            {BMI}
          </Text>
        </Text>

        <Text style={styles.textStyle}>
          Your BMI is: classified as{" "}
          <Text
            style={[
              styles.textStyle,
              {
                color:
                  classification === Classification.NORMAL
                    ? "green"
                    : classification === Classification.UNDERWEIGHT
                    ? "orange"
                    : "red",
                fontFamily: "Inter-Bold",
              },
            ]}
          >
            {classification}
          </Text>
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
    backgroundColor: "#f5f5f5",
  },
  result: {
    color: "#202020",
    fontSize: 21,
    fontFamily: "Inter-Bold",
  },
  textStyle: {
    color: "#202020",
    fontSize: 18,
    fontFamily: "Inter-Regular",
  },
});
