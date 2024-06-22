import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "global/firebaseConfig";

export const uploadImage = async (
  uri: string,
  folderName: string,
  fileType: string,
  loading: boolean,
  setLoading: (arg: boolean) => void
) => {
  try {
    if (uri === undefined) return;
    const response = await fetch(uri);
    const blob = await response.blob();
    setLoading(true);

    const storageRef = ref(storage, `${folderName}/` + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      //if the upload image is error
      (error) => {
        console.log("Image upload error!", error);
      }
      // //if the upload image is sucess
      // () => {
      //   getDownloadURL(uploadTask.snapshot.ref)
      //     .then(async (downloadUrl) => {
      //       setImageUploaded(true);
      //       setImage(downloadUrl);

      //       const arg = {
      //         ...accountData,
      //         ProfilePic: downloadUrl,
      //       };
      //       changeAccount(arg);
      //       console.log("Image available at!", downloadUrl);
      //     })
      //     .catch((err) => console.log("error", err));
      // }
    );
    await uploadTask;

    let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadURL;
  } catch (err) {
    console.log("error", err);
  } finally {
    setLoading(false);
  }
};
