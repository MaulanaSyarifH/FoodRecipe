import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function Recipe({ categories, foods }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <View testID="recipesDisplay" style={styles.grid}>
        {(foods || []).map((item, index) => (
          <ArticleCard
            key={item.idFood || index}
            item={item}
            index={index}
            navigation={navigation}
          />
        ))}
      </View>
    </View>
  );
}

const ArticleCard = ({ item, index, navigation }) => {
  const name = item.recipeName || "";
  const desc = item.cookingDescription || item.recipeInstructions || "";

  return (
    <View style={styles.cardContainer} testID="articleDisplay">
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeDetail", { ...item })}
      >
        <Image
          source={{ uri: item.recipeImage }}
          style={[
            styles.articleImage,
            { height: index % 3 === 0 ? hp(18) : hp(22) },
          ]}
        />
        <Text style={styles.articleText}>
          {name.length > 20 ? name.slice(0, 20) + "..." : name}
        </Text>
        <Text style={styles.articleDescription}>
          {desc.length > 40 ? desc.slice(0, 40) + "..." : desc}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginHorizontal: wp(4), marginTop: hp(2) },
  title: {
    fontSize: hp(3),
    fontWeight: "600",
    color: "#52525B",
    marginBottom: hp(1.5),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: { width: "48%", marginBottom: hp(1.5) },
  articleImage: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  articleText: {
    fontSize: hp(1.5),
    fontWeight: "600",
    color: "#52525B",
    marginTop: hp(0.5),
  },
  articleDescription: {
    fontSize: hp(1.2),
    color: "#6B7280",
    marginTop: hp(0.3),
  },
});
