import React from "react";
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from "react-native";

import colors from "../design/colors";
import composeStyles from "../utils/composeStyles";

interface TextProps extends RNTextProps {
  color?: string;
  size?: number | string;
}

const Text = React.forwardRef<RNText, TextProps>((props: TextProps, forwardedRef) => {
  let { color, size, style, children, ...otherProps } = props;

  const definedPropStyles = {
    color: color,
    fontSize: size
  }

  const composedStyles = composeStyles(styles.base, definedPropStyles, style);

  return (
    <RNText ref={forwardedRef} style={composedStyles} {...otherProps}>{children}</RNText>
  );
});

const styles = StyleSheet.create({
  base: {
    color: colors.neutral[900]
  },
  faded: {
    color: colors.neutral[300]
  }
});

export default Text;