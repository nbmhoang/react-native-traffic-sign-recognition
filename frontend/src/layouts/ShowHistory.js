import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import HistoryItem from "../components/HistoryItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useIsFocused } from "@react-navigation/native";

const STORE_HISTORY_KEY = "predictHistory";

function ShowHistory({ navigation }) {
  const [storeHistories, setStoreHistories] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getDataFromStore();
  }, [isFocused]);

  const getDataFromStore = async () => {
    try {
      console.log("Begin get async storage");
      await AsyncStorage.getItem(STORE_HISTORY_KEY, (err, result) => {
        console.log("Store history key: " + result + " | Error: " + err);
        setStoreHistories(JSON.parse(result));
      });
      console.log("END get async storage");
    } catch (e) {
      console.log("Get Storage history error: " + e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {storeHistories.map((item, index) => {
          return (
            <HistoryItem
              sourceURI={item.uri}
              title={item.name}
              description={item.description}
              time={item.time}
              key={index}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

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

export default ShowHistory;
