import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("loading. . ");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const API_KEY = "ca0a1ab3f12d28b20f38d1c2d0459f38";

  const getWeather = async () => {
    const { permission } = await Location.requestForegroundPermissionsAsync();
    if (!permission) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 4 });
    // reverseGeocode allows you to get the address of the lon,lat
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    // console.log(location);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts,minutely,hourly&units=metric&appid=${API_KEY}`
    );
    const json = await response.json();
    setDays(json.daily);
    console.log(json.daily);
  };

  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color={"palevioletred"} size={100} />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.tempNumber}>{Math.floor(day.temp.day)}℃</Text>
              <View style={styles.minMax}>
                <Text style={styles.min}>min: {Math.floor(day.temp.min)}℃</Text>
                <Text style={styles.max}>max: {Math.floor(day.temp.max)}℃</Text>
              </View>
              <Text style={styles.tempText}>{day.weather[0].main}</Text>
              <Text style={styles.tempTextTwo}>
                {day.weather[0].description}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
// this is an object of objects >> And the reason to use stylesheetcreate, it is just an object but gives us the auto complete.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
    // the direction on mobile is column by default!
    backgroundColor: "rgb(100,220,255)",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 48,
    fontWeight: "500",
  },
  weather: {
    gap: 10,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  tempNumber: {
    marginTop: 40,
    fontSize: 108,
    fontWeight: "600",
  },
  tempText: {
    fontSize: 50,
    marginTop: -10,
  },
  tempTextTwo: {
    fontSize: 20,
  },
  minMax: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: -20,
  },
  min: {
    marginRight: 20,
    fontSize: 20,
  },
  max: {
    fontSize: 20,
  },
  boxthree: {
    flex: 1,
    backgroundColor: "palegreen",
  },
});

// instead of div, we use View. always need to import. all the text needs to go inside a Text
// some styles are not available. example: border is not valid style property

// IF we cannot find and react native package/component/api we can use an expo package/api. Just need to install for example: expo install expo-document-picker
// So why is there a status bar from expo and one from react-native? they are same but some differences may include the api used, or some added functions etc.
// it's all because now there is an effort from the community to create amazing packages to use since native doesn't support them out of the box.
// Problem with community packages outside of expo is that they may not be updated or bug fixed and you will be dependent on that if there is any problems
