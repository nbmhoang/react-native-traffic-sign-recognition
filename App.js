import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
  Image,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const options = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
  quality: 1,
};

export default function App() {
  let windowWidth = Dimensions.get("window").width;
  let windowHeight = Dimensions.get("window").height;

  const [pickedImage, setPickedImage] = useState();

  const requestMediaAccess = async () => {
    if (Platform.OS != "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status != "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(options);
    console.log(result);
    setPickedImage(result);
  };

  useEffect(() => {
    requestMediaAccess();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{ width: windowWidth, height: windowHeight / 3, padding: 10 }}
      >
        {pickedImage && (
          <Image source={{ uri: pickedImage.uri }} style={styles.image} />
        )}
      </View>
      <View style={styles.pickImageButton}>
        <Button onPress={pickImage} title="Image Picker" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pickImageButton: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
    alignItems: "center",
  },
  image: {
    padding: 1,
    width: "100%",
    height: "100%",
  },
});
