import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const favoriteRecipes = useSelector((state) => state.favorites);
  const favoriteRecipesList = favoriteRecipes?.favoriterecipes || [];

  if (favoriteRecipesList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackBtn}
        >
          <Text style={{ color: "#fff" }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View testID="FavoriteRecipes">
        <Text style={styles.heading}>My Favorite Recipes</Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.goBackBtn, { marginLeft: 20 }]}
      >
        <Text style={{ color: "#fff" }}>Go back</Text>
      </TouchableOpacity>

      <FlatList
        data={favoriteRecipesList}
        contentContainerStyle={styles.listContentContainer}
        keyExtractor={(item, index) =>
          item.idFood?.toString?.() ?? item.title ?? `fav-${index}`
        }
        renderItem={({ item }) => {
          const name = item.recipeName || item.title || "";
          return (
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => {
                if (item.idFood) {
                  navigation.navigate("RecipeDetail", item);
                } else {
                  navigation.navigate("CustomRecipesScreen", { recipe: item });
                }
              }}
            >
              <Image
                source={{ uri: item.recipeImage || item.image }}
                style={styles.recipeImage}
              />
              <Text style={styles.recipeTitle}>
                {name.length > 20 ? `${name.slice(0, 20)}...` : name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: hp(2.5),
    color: "#6B7280",
  },
  heading: {
    fontSize: hp(3.8),
    marginTop: hp(4),
    marginLeft: 20,
    fontWeight: "600",
    color: "#52525B",
  },
  goBackBtn: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 100,
    alignItems: "center",
  },
  listContentContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  cardContainer: {
    backgroundColor: "white",
    marginBottom: hp(2),
    padding: wp(4),
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: 10,
    marginRight: wp(4),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#4B5563",
    flexShrink: 1,
  },
});
