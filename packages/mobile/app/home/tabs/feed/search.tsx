import { Fragment } from "react";
import View from "@/mobile/components/View";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import Category from "@/mobile/components/Categories";
import colors from "@/mobile/design/colors";
import { Feather } from '@expo/vector-icons';
import Back from "@/mobile/components/Back";
import Text from "@/mobile/components/Text";
import Header from "@/mobile/components/Header";

interface Searchbar extends TextInputProps {

}

function Searchbar() {
  return (
    <View style={styles.searchbarContainer}>
      <Feather name="search" size={20} color={colors.neutral[600]} />
      <TextInput style={{ fontSize: 20 }} placeholder="search"/>
    </View>
  );
}

function Search() {
  return (
    <Fragment>
      <Header title="Browse"/>
      <View style={styles.container}>
        <Searchbar/>
      </View>
      <Category/>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  searchbarContainer: {
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.neutral[200],
    columnGap: 10,
    padding: 12
  }
});

export default Search;