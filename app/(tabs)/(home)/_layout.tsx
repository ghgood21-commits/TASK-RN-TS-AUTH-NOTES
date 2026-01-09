import AuthContext from "@/context/AuthContext";
import colors from "../../../data/styling/colors";
import { Stack, useRouter } from "expo-router";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { deletetoken } from "@/api/storage";
import { SimpleLineIcons } from "@expo/vector-icons";

const HomeLayout = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.white,
        },
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          title: "Home",
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={async () => {
                  await deletetoken();
                  setIsAuthenticated(false);
                  router.replace("/(auth)/");
                }}
              >
                <SimpleLineIcons name="logout" size={24} color="red" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen name="[noteId]" options={{ title: "Note Details" }} />
    </Stack>
  );
};

export default HomeLayout;
