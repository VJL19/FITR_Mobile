import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { createRef, useEffect, useRef } from "react";
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
import RichToolBar from "components/RichToolBar";
import RichTextEdidor from "components/RichTextEdidor";

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

  const _editor = createRef();

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
  const richText = useRef(null);
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
            control={control}
            defaultValue={data.ProgramDescription}
            render={({ field: { onChange, onBlur, value, ...restField } }) => (
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
                  initialContentHTML={data.ProgramDescription}
                  _editor={_editor}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              </React.Fragment>
            )}
            name="ProgramDescription"
          />
          <DisplayFormError errors={errors.ProgramDescription} />
        </View>
      </ScrollView>
      <View style={{ width: "95%", alignSelf: "center", marginBottom: 15 }}>
        <RichToolBar _editor={_editor} />
        <Button
          title="Edit Program"
          color={"#ff2e00"}
          onPress={handleSubmit(onSubmit, (error: FieldErrors<IProgram>) =>
            console.log("err", error)
          )}
        />
      </View>
    </View>
  );
};

export default EditProgram;

const styles = StyleSheet.create({});
