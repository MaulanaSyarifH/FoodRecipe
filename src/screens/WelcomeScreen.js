import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.ring}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2024/08/29/02/47/italian-9005494_1280.png",
          }}
          style={styles.logo}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Foodie</Text>
        <Text style={styles.subtitle}>your food recipe app</Text>
        <Text style={styles.hint}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBBF24",
  },
  ring: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 9999,
    padding: hp(3),
  },
  logo: {
    width: hp(20),
    height: hp(20),
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(7),
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#FFFFFF",
    letterSpacing: 3,
    marginTop: 8,
  },
  hint: {
    marginTop: 16,
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
  },
});
