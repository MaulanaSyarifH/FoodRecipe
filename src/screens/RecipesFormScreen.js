import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const { recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
  const [title, setTitle] = useState(recipeToEdit ? recipeToEdit.title : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [description, setDescription] = useState(
    recipeToEdit ? recipeToEdit.description : ""
  );

  const saverecipe = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Error", "Title and description are required.");
      return;
    }

    const newrecipe = { title, image, description };

    try {
      const existing = await AsyncStorage.getItem("customrecipes");
      const recipes = existing ? JSON.parse(existing) : [];

      if (recipeToEdit !== undefined) {
        recipes[recipeIndex] = newrecipe;
        await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));
        if (onrecipeEdited) onrecipeEdited();
      } else {
        recipes.push(newrecipe);
        await AsyncStorage.setItem("customrecipes", JSON.stringify(recipes));
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error saving the recipe:", error);
      Alert.alert("Error", "Failed to save recipe");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Image URL"
          value={image}
          onChangeText={setImage}
          style={styles.input}
          autoCapitalize="none"
        />
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
        )}
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
          style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
        />
        <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save recipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: wp(4),
    paddingTop: hp(6),
  },
  input: {
    marginTop: hp(2),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(2),
    marginVertical: hp(1),
    borderRadius: 6,
  },
  image: {
    width: 200,
    height: 150,
    margin: wp(2),
    borderRadius: 8,
  },
  imagePlaceholder: {
    height: hp(12),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
    borderRadius: 6,
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(3),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
