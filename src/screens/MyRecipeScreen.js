import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MyRecipeScreen() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [recipes, setrecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchrecipes = async () => {
    try {
      const stored = await AsyncStorage.getItem("customrecipes");
      if (stored) {
        setrecipes(JSON.parse(stored));
      } else {
        setrecipes([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchrecipes();
    }, [])
  );

  const handleAddrecipe = () => {
    navigation.navigate("RecipesFormScreen");
  };

  const handlerecipeClick = (recipe) => {
    navigation.navigate("CustomRecipesScreen", { recipe });
  };

  const deleterecipe = async (index) => {
    try {
      const updatedrecipes = [...recipes];
      updatedrecipes.splice(index, 1);
      await AsyncStorage.setItem(
        "customrecipes",
        JSON.stringify(updatedrecipes)
      );
      setrecipes(updatedrecipes);
    } catch (error) {
      console.error("Error deleting the recipe:", error);
    }
  };

  const editrecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
      onrecipeEdited: fetchrecipes,
    });
  };

  const cardWidth = Math.min(width - 32, 360);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddrecipe} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New recipe</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#f59e0b" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {recipes.length === 0 ? (
            <Text style={styles.norecipesText}>No recipes added yet.</Text>
          ) : (
            recipes.map((recipe, index) => (
              <View
                key={index}
                style={[styles.recipeCard, { width: cardWidth }]}
                testID="recipeCard"
              >
                <TouchableOpacity
                  testID="handlerecipeBtn"
                  onPress={() => handlerecipeClick(recipe)}
                >
                  {recipe.image ? (
                    <Image
                      source={{ uri: recipe.image }}
                      style={[styles.recipeImage, { width: cardWidth - 24 }]}
                    />
                  ) : null}
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  <Text style={styles.recipeDescription} testID="recipeDescp">
                    {recipe.description
                      ? recipe.description.substring(0, 50) + "..."
                      : ""}
                  </Text>
                </TouchableOpacity>

                <View
                  style={styles.actionButtonsContainer}
                  testID="editDeleteButtons"
                >
                  <TouchableOpacity
                    onPress={() => editrecipe(recipe, index)}
                    style={styles.editButton}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => deleterecipe(index)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    paddingTop: hp(6),
    backgroundColor: "#F9FAFB",
  },
  backButton: {
    marginBottom: hp(1.5),
  },
  backButtonText: {
    fontSize: hp(2.2),
    color: "#4F75FF",
  },
  addButton: {
    backgroundColor: "#4F75FF",
    paddingVertical: hp(1.2),
    alignItems: "center",
    borderRadius: 5,
    marginBottom: hp(2),
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(2.2),
  },
  scrollContainer: {
    paddingBottom: hp(2),
    alignItems: "center",
  },
  norecipesText: {
    textAlign: "center",
    fontSize: hp(2),
    color: "#6B7280",
    marginTop: hp(5),
  },
  recipeCard: {
    backgroundColor: "#fff",
    padding: wp(3),
    borderRadius: 8,
    marginBottom: hp(2),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  recipeImage: {
    height: 150,
    borderRadius: 8,
    marginBottom: hp(1),
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#111827",
    marginBottom: hp(0.5),
  },
  recipeDescription: {
    fontSize: hp(1.8),
    color: "#6B7280",
    marginBottom: hp(1.5),
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
  },
  editButton: {
    backgroundColor: "#34D399",
    padding: wp(2),
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    padding: wp(2),
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: hp(1.8),
  },
});
