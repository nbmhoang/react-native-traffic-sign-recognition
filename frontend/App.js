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
import Constants from "expo-constants";
import HTTPRequest from "./src/services/HttpRequest";
import labels from "./src//resources/labels.json";

const options = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  quality: 1,
};

export default function App() {
  let windowWidth = Dimensions.get("window").width;
  let windowHeight = Dimensions.get("window").height;

  const [pickedImage, setPickedImage] = useState(null);
  const [response, setResponse] = useState(null);

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

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync();
    setPickedImage(result);
  };

  useEffect(() => {
    requestMediaAccess();
  }, []);

  useEffect(() => {
    if (pickedImage) {
      const formData = new FormData();
      formData.append("img", {
        uri: pickedImage.uri,
        name: "upload.png",
        type: "image/png",
      });
      HTTPRequest.postImage("http://192.168.1.9:5000", formData).then((res) => {
        setResponse(res.data);
      });
    }
  }, [pickedImage]);

  const getLabelByID = (id) => {
    return labels.find((item) => item._id == id);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="default" />
      <View
        style={{ width: windowWidth, height: windowHeight * 0.4, padding: 10 }}
      >
        {pickedImage && (
          <Image source={{ uri: pickedImage.uri }} style={styles.image} />
        )}
      </View>
      <View>
        {response ? (
          <>
            <Text>Notice: {getLabelByID(response.traffic_id).name}</Text>
            <Text>
              Description: {getLabelByID(response.traffic_id).description}
            </Text>
          </>
        ) : (
          <Text>Please choosen image or take a photo</Text>
        )}
      </View>
      <View style={styles.pickImageButton}>
        <Button onPress={pickImage} title="Image Picker" />
        <Button onPress={takeImage} title="Take a Photo" />
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
    paddingTop: Constants.statusBarHeight,
  },
  pickImageButton: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 36,
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "space-around",
  },
  image: {
    padding: 1,
    width: "100%",
    height: "100%",
  },
});
