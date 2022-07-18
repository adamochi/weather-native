import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
// this is an object of objects >> And the reason to use stylesheetcreate, it is just an object but gives us the auto complete.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(100,220,255)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    color: "darkslateblue",
  },
});
// instead of div, we use View. always need to import. all the text needs to go inside a Text
// some styles are not available. example: border is not valid style property

// IF we cannot find and react native package/component/api we can use an expo package/api. Just need to install for example: expo install expo-document-picker
// So why is there a status bar from expo and one from react-native? they are same but some differences may include the api used, or some added functions etc.
// it's all because now there is an effort from the community to create amazing packages to use since native doesn't support them out of the box.
// Problem with community packages outside of expo is that they may not be updated or bug fixed and you will be dependent on that if there is any problems
