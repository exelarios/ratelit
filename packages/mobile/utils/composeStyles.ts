import { StyleSheet, StyleProp } from "react-native";

/**
 * A wrapper of StyleSheet.compose(), where it takes an unlimited amount of styles to compose.
 * The farthest to the right of the paramters will take the least priority.
 */
export default function composeStyles(...styles: StyleProp<any>[]) {
  let result = styles[0];

  for (let i = 1; i < styles.length; i++) {
    result = StyleSheet.compose(result, styles[i]);
  }

  return result;
}