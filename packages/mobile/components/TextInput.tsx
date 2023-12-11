import React from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";

import Text from "@/mobile/components/Text";
import View from "@/mobile/components/View";

import colors from "@/mobile/design/colors";

interface TextProps extends RNTextInputProps {
  label: string;
  message?: string;
  size?: number | string;
}

const TextInput = React.forwardRef<RNTextInput, TextProps>((props, forwardedRef) => {
  const { label, message = "", style, ...otherProps } = props;

  const composedStyles = StyleSheet.compose(styles.base, style);

  // todo: make message's element to be visually hidden when message isn't defined.

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <RNTextInput ref={forwardedRef} style={composedStyles} {...otherProps}/>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
});

TextInput.displayName = "TextInput";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 3
  },
  base: {
    borderRadius: 5,
    backgroundColor: colors.neutral[200],
    minHeight: 50,
    padding: 10
  },
  text: {
    fontWeight: "600",
    color: colors.neutral[700]
  },
  message: {
    color: colors.red[400]
  }
});

export default TextInput;