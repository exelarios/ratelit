import { Fragment } from "react";
import View from "@/mobile/components/View";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import Category from "@/mobile/components/Categories";
import colors from "@/mobile/design/colors";
import { Feather } from '@expo/vector-icons';
import Back from "@/mobile/components/Back";
import Text from "@/mobile/components/Text";

interface Searchbar extends TextInputProps {

}

function Searchbar() {
  return (
    <View style={styles.searchbarContainer}>
      <Feather name="search" size={20} color={colors.neutral[600]} />
      <TextInput placeholder="search"/>
    </View>
  );
}

function Search() {
  return (
    <Fragment>
      <View safe style={styles.header}>
        <Back/>
        <Text style={styles.text}>Browse</Text>
        <View style={{ width: 24.3, height: 30 }}/>
      </View>
      <View style={styles.container}>
        <Searchbar/>
      </View>
      <Category/>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20
  },
  container: {
    paddingHorizontal: 20
  },
  searchbarContainer: {
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
    borderColor: colors.neutral[600],
    borderWidth: 1.5,
    padding: 10
  }
});

export default Search;