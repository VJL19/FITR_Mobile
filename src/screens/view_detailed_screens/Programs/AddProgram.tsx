import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import React, { LegacyRef, createRef, useEffect, useRef } from "react";
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
import programSchema from "utils/validations/planner.validations";
import IProgram from "utils/types/program_planner.types";
import LoadingIndicator from "components/LoadingIndicator";
import { useCreateUserProgramMutation } from "reducers/programReducer";
import RichTextEdidor from "components/RichTextEdidor";
import RichToolBar from "components/RichToolBar";

const AddProgram = () => {
  const {
    data: user,
    isError,
    isFetching,
    isUninitialized,
  } = useGetAccessTokenQuery();

  const [addProgram, { data: programRes, isError: errPro, error }] =
    useCreateUserProgramMutation();

  const defaultValue = {
    UserID: 0,
    ProgramTitle: "",
    ProgramDescription: "",
  };

  const navigation = useNavigation();
  const _editor = createRef();

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { isLoading, errors, isSubmitted },
  } = useForm<IProgram>({
    defaultValues: defaultValue,
    resolver: joiResolver(programSchema),
  });
  const { UserID, FirstName, LastName, Username } = user?.user!;
  useEffect(() => {
    setValue("UserID", UserID);
    console.log("UserID", UserID);
  }, []);

  console.log(UserID);
  const onSubmit = async (data: IProgram) => {
    const programData = {
      UserID: getValues("UserID"),
      ProgramTitle: data.ProgramTitle,
      ProgramDescription: data.ProgramDescription,
      ProgramEntryDate: getCurrentDate(),
    };

    addProgram(programData);
    // console.log("add posts", data);
    // dispatch(getPostAction(user.UserID));

    // console.log("post message", result?.[0].NewsfeedID!);

    console.log(data.ProgramDescription);
    DisplayAlert("Success message", "Program added successfully!");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigation.goBack();
    reset();
  };
  console.log("add pressed", programRes);
  console.log("error", error);
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
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ marginTop: 25, padding: 15 }}>
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
            name="ProgramDescription"
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

                <RichTextEdidor
                  _editor={_editor}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              </React.Fragment>
            )}
          />
          <DisplayFormError errors={errors.ProgramDescription} />
        </View>
      </ScrollView>
      <View style={{ width: "90%", alignSelf: "center", bottom: 10 }}>
        <RichToolBar _editor={_editor} />
        <Button
          title="Confirm"
          color={"#ff2e00"}
          onPress={handleSubmit(onSubmit, (error: FieldErrors<IProgram>) =>
            console.log("err", error)
          )}
        />
      </View>
    </View>
  );
};

export default AddProgram;

const styles = StyleSheet.create({});
