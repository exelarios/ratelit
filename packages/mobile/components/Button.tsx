import React, { useMemo, useState } from "react";
import {
  PressableProps,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle
} from "react-native";

import Text from "../components/Text";
import colors from "../design/colors";
import composeStyles from "../utils/composeStyles";

interface ButtonProps extends PressableProps {
  icon?: any;
  iconAligin?: "start" | "end"
  color?: string;
  variant?: "fill" | "outline" | "none"
}

const Button = React.forwardRef<Pressable, ButtonProps>((props, forwardedRef) => {
  const { variant = "none", icon, iconAligin = "start", color, style, children, ...otherProps } = props;

  const [hovering, setHovering] = useState(false);

  const fill = useMemo(() => {
    return composeStyles(styles.base, styles.fill, style);
  }, [hovering]);

  const outline = useMemo(() => {
    return composeStyles(styles.base, styles.outline, style);
  }, [hovering]);

  const selection = useMemo(() => {
    return {
      fill,
      outline,
      none
    }
  }, [fill, outline]);

  if (!selection[variant]) {
    throw new Error("The variant doesn't exist.");
  }

  const currentVarient = selection[variant];

  const composedStyles = composeStyles(
    currentVarient, 
    iconAligin === "end" && { flexDirection: "row-reverse" }, 
    style as StyleProp<ViewStyle>
    );

  const isText = !React.isValidElement(children) && typeof children === "string";

  const child = useMemo(() => {
    if (isText) {
      return (
        <Text
          color={color}
          style={textSyles[variant]}>
          {children}
        </Text> 
      );
    }

    return children;
  }, [color, children]);

  return (
    <Pressable
      style={composedStyles}
      ref={forwardedRef}
      {...otherProps}>
      {icon}
      {child}
    </Pressable>
  );
});

Button.displayName = "Button";

const styles = StyleSheet.create({
  base: {
    padding: 10,
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 10,
    minHeight: 50,
    alignItems: "center",
    borderRadius: 5
  },
  fill: {
    backgroundColor: colors.neutral[800],
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.neutral[800],
  },
  none: {
    width: "auto"
  },
  hovering: {
    backgroundColor: colors.neutral[700]
  }
});

const textSyles = StyleSheet.create({
  fill: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.neutral[100]
  },
  outline: {
    fontWeight: "500",
    textAlign: "center",
    color: colors.neutral[800]
  },
  none: {}
});

const none = styles.none;

export default Button;
