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
import { useKeyboardVisible } from "hooks/useKeyboardVisible";
import useIsNetworkConnected from "hooks/useIsNetworkConnected";
import { NETWORK_ERROR } from "utils/enums/Errors";

const AddProgram = () => {
  const {
    data: user,
    isError,
    isFetching,
    isUninitialized,
  } = useGetAccessTokenQuery();

  const { isKeyboardVisible } = useKeyboardVisible();
  const [
    addProgram,
    { data: programRes, error: programErr, status: programStat },
  ] = useCreateUserProgramMutation();

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
    formState: { isLoading, errors, isSubmitted, isSubmitting },
  } = useForm<IProgram>({
    defaultValues: defaultValue,
    resolver: joiResolver(programSchema),
  });
  const { UserID, FirstName, LastName, Username } = user?.user!;

  const { isConnected } = useIsNetworkConnected();

  useEffect(() => {
    if (programErr?.status === NETWORK_ERROR.FETCH_ERROR && !isConnected) {
      DisplayAlert(
        "Error message",
        "Network Error. Please check your internet connection and try again this action"
      );
    }
    if (programErr?.status === NETWORK_ERROR.FETCH_ERROR && isConnected) {
      DisplayAlert(
        "Error message",
        "There is a problem within the server side possible maintenance or it crash unexpectedly. We apologize for your inconveniency"
      );
    }
    if (
      programStat === "rejected" &&
      programErr?.status !== NETWORK_ERROR?.FETCH_ERROR
    ) {
      DisplayAlert("Error message", programErr?.data?.error?.sqlMessage);
    }
    if (programStat === "fulfilled") {
      DisplayAlert("Success message", "Program added successfully!");
      const delayRedirect = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        navigation.goBack();
      };
      delayRedirect();
      reset();
    }
  }, [programStat]);

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
  };
  console.log("add pressed", programRes);
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
        {!isKeyboardVisible && (
          <Button
            disabled={isKeyboardVisible || isSubmitting}
            title="Confirm"
            color={"#ff2e00"}
            onPress={handleSubmit(onSubmit, (error: FieldErrors<IProgram>) =>
              console.log("err", error)
            )}
          />
        )}
      </View>
    </View>
  );
};

export default AddProgram;

const styles = StyleSheet.create({});
