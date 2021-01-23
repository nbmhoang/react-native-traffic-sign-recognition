import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
import { useIsFocused } from "@react-navigation/native";
import { Text, ListItem, Avatar } from "react-native-elements";

import labels from "../resources/labels.json";

const TrafficSignList = ({ navigation }) => {
  // console.log(labels);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {labels.map((item, index) => (
          <ListItem key={index} bottomDivider>
            <ListItem.Content>
              {/* <Image source={require('./images/1.png')} /> */}
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});

export default TrafficSignList;
