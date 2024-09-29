import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmH__NnQBHzXIVNzx0AjpqH6SOg_zjW0g",
  authDomain: "boratrocar-7e01f.firebaseapp.com",
  databaseURL: "https://boratrocar-7e01f-default-rtdb.firebaseio.com",
  projectId: "boratrocar-7e01f",
  storageBucket: "boratrocar-7e01f.appspot.com",
  messagingSenderId: "254748397046",
  appId: "1:254748397046:android:2eff7e364002f06d384bd7",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

// Function to upload image to Firebase Storage
export const uploadImage = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const filename = uri.substring(uri.lastIndexOf("/") + 1);
  const imageRef = storageRef(storage, `images/${filename}`);

  try {
    await uploadBytes(imageRef, blob);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};

export { database, storage };

