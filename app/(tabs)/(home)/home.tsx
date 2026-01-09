import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";
import colors from "../../../data/styling/colors";
import Note from "../../../components/Note";
import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "../../../api/notes";
import { NoteType } from "../../../types/NoteType";
import AuthContext from "@/context/AuthContext";

const Home = () => {
  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getAllNotes,
  });
  const { isAuthenticated } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }
  if (notes?.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.white }}>No notes found</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      {isAuthenticated ? (
        <Text
          style={{
            color: "white",
          }}
        >
          "user is logged in"
        </Text>
      ) : (
        <Text
          style={{
            color: "red",
          }}
        >
          "User is not logged in"
        </Text>
      )}
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {notes?.map((note: NoteType) => (
          <Note key={note._id} note={note} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
