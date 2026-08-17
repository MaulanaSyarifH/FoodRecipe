import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";

export default function RecipeDetailScreen(props) {
  const recipe = props.route.params;
  const dispatch = useDispatch();
  const favoriterecipes = useSelector(
    (state) => state.favorites.favoriterecipes
  );
  const isFavourite = favoriterecipes?.some(
    (fav) => fav.idFood === recipe.idFood
  );
  const navigation = useNavigation();

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  const ingredients = recipe.ingredients || [];

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.imageContainer} testID="imageContainer">
        <Image
          source={{ uri: recipe.recipeImage }}
          style={styles.recipeImage}
        />
      </View>

      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[styles.favoriteButton, { backgroundColor: "white" }]}
        >
          <Text>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View
          style={styles.recipeDetailsContainer}
          testID="recipeDetailsContainer"
        >
          <Text style={styles.recipeTitle} testID="recipeTitle">
            {recipe.recipeName}
          </Text>
          <Text style={styles.recipeCategory} testID="recipeCategory">
            {recipe.category || recipe.recipeCategory}
          </Text>
        </View>

        <View style={styles.miscContainer} testID="miscContainer">
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🕒</Text>
            <Text style={styles.miscText}>35 Mins</Text>
          </View>
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>👥</Text>
            <Text style={styles.miscText}>03 Servings</Text>
          </View>
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🔥</Text>
            <Text style={styles.miscText}>103 Cal</Text>
          </View>
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🎚️</Text>
            <Text style={styles.miscText}>Medium</Text>
          </View>
        </View>

        <View style={styles.sectionContainer} testID="sectionContainer">
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList} testID="ingredientsList">
            {ingredients.map((i, idx) => (
              <View key={idx} style={styles.ingredientItem}>
                <View style={styles.ingredientBullet} />
                <Text style={styles.ingredientText}>
                  {i.ingredientName} {i.measure}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>
            {recipe.recipeInstructions}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1 },
  scrollContent: { paddingBottom: 30 },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  recipeImage: {
    width: wp(98),
    height: hp(40),
    borderRadius: 20,
    marginTop: 4,
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    marginLeft: wp(5),
    backgroundColor: "white",
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    marginRight: wp(5),
  },
  contentContainer: { paddingHorizontal: wp(4), paddingTop: hp(2) },
  recipeDetailsContainer: { marginBottom: hp(2) },
  recipeTitle: { fontSize: hp(3), fontWeight: "bold", color: "#4B5563" },
  recipeCategory: { fontSize: hp(2), fontWeight: "500", color: "#9CA3AF" },
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 8,
  },
  miscItem: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  miscIcon: { fontSize: hp(3), marginBottom: 5 },
  miscText: { fontSize: hp(1.6), fontWeight: "600" },
  sectionContainer: { marginBottom: 20 },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  ingredientsList: { marginLeft: wp(1) },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
    padding: 10,
    backgroundColor: "#FFF9E1",
    borderRadius: 8,
  },
  ingredientBullet: {
    backgroundColor: "#FFD700",
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(2),
  },
  ingredientText: { fontSize: hp(1.8), color: "#333", flexShrink: 1 },
  instructionsText: {
    fontSize: hp(1.8),
    color: "#444",
    lineHeight: hp(2.8),
    textAlign: "justify",
  },
});
