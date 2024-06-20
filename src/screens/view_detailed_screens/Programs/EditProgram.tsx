import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import React, { useEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import CustomTextInput from "components/CustomTextInput";
import DisplayFormError from "components/DisplayFormError";
import getCurrentDate from "utils/helpers/formatDate";
import { useNavigation } from "@react-navigation/native";
import DisplayAlert from "components/CustomAlert";
import { ScrollView } from "react-native-gesture-handler";
import { useGetAccessTokenQuery } from "reducers/authReducer";
import { editProgramSchema } from "utils/validations/planner.validations";
import IProgram from "utils/types/program_planner.types";
import LoadingIndicator from "components/LoadingIndicator";
import {
  setProgramData,
  useEditUserProgramMutation,
} from "reducers/programReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { RootStackNavigationProp } from "utils/types/navigators/RootStackNavigators";

const EditProgram = () => {
  const {
    data: user,
    isError,
    isFetching,
    isUninitialized,
  } = useGetAccessTokenQuery();

  const [editProgram, { data: programRes, isError: errPro, error }] =
    useEditUserProgramMutation();

  const { programData: data } = useSelector(
    (state: RootState) => state.program
  );
  const defaultValue = {
    UserID: 0,
    ProgramTitle: "",
    ProgramDescription: "",
  };

  const navigation = useNavigation<RootStackNavigationProp>();
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { isLoading, errors, isSubmitted },
  } = useForm<IProgram>({
    defaultValues: defaultValue,
    resolver: joiResolver(editProgramSchema),
  });
  const { UserID, FirstName, LastName, Username } = user?.user!;
  useEffect(() => {
    setValue("UserID", UserID);
    setValue("ProgramTitle", data.ProgramTitle);
    setValue("ProgramDescription", data.ProgramDescription);
    setValue("ProgramID", data.ProgramID);
  }, []);

  const onSubmit = async (data: IProgram) => {
    const programData = {
      UserID: getValues("UserID"),
      ProgramTitle: data.ProgramTitle,
      ProgramDescription: data.ProgramDescription,
      ProgramEntryDate: getCurrentDate(),
      ProgramID: data.ProgramID,
    };

    setValue("ProgramID", data.ProgramID);
    editProgram(programData);
    // console.log("add posts", data);
    // dispatch(getPostAction(user.UserID));

    // console.log("post message", result?.[0].NewsfeedID!);

    DisplayAlert("Success message", "Program edited successfully!");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // navigation.goBack();
    navigation.navigate("DashboardScreen");
    reset();
  };
  console.log("edit pressed", programRes);
  console.log("error", error);
  console.log("edit detailed program", data);
  // if (isError) {
  //   return (
  //     <View>
  //       <Text>You are not authenticated! Please Login Again!</Text>
  //     </View>
  //   );
  // }

  if (isUninitialized || isFetching) {
    return <LoadingIndicator />;
  }
  return (
    <ScrollView>
      <View style={{ marginTop: 25 }}>
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
                Title
              </Text>
              <CustomTextInput
                error={errors.ProgramTitle}
                placeholder="Enter the title of the program"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            </React.Fragment>
          )}
          name="ProgramTitle"
        />
        <DisplayFormError errors={errors.ProgramTitle} />

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
                Description
              </Text>

              <TextInput
                multiline={true}
                textAlignVertical="top"
                placeholder="Enter the description"
                placeholderTextColor={"#c2c2c2"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={{
                  borderWidth: 1,
                  height: 300,
                  borderRadius: 8,
                  padding: 15,
                  color: "#202020",
                  borderColor: errors.ProgramDescription
                    ? "#d9534f"
                    : "#202020",
                  marginBottom: 10,
                  fontSize: 16,
                }}
              />
            </React.Fragment>
          )}
          name="ProgramDescription"
        />
      </View>

      <DisplayFormError errors={errors.ProgramDescription} />

      <Button
        title="Edit Program"
        color={"#ff2e00"}
        onPress={handleSubmit(onSubmit, (error: FieldErrors<IProgram>) =>
          console.log("err", error)
        )}
      />
    </ScrollView>
  );
};

export default EditProgram;

const styles = StyleSheet.create({});
