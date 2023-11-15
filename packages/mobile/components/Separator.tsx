import React from "react";
import { View as RNView, ViewProps, StyleSheet } from "react-native";
import colors from "../design/colors";

import View from "./View";
import Text from "./Text";

const Separator = React.forwardRef<RNView, ViewProps>((props, forwardedRef) => {
  const { style, children, ...otherProps } = props;

  const composedStyles = StyleSheet.compose(styles.base, style);

  if (!children) {
    return (
      <View style={composedStyles} {...otherProps}/>
    );
  }

  return (
    <View ref={forwardedRef} style={styles.container}>
      <View style={composedStyles} {...otherProps}/>
      <Text color={styles.base.backgroundColor}>{children}</Text>
      <View style={composedStyles} {...otherProps}/>
    </View>
  );
});

Separator.displayName = "Separator";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  base: {
    marginVertical: 5,
    borderRadius: 2,
    height: 1,
    flexGrow: 1,
    backgroundColor: colors.neutral[400],
  }
});

export default Separator;