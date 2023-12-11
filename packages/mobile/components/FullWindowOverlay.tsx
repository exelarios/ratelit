import { Platform, StyleSheet, Dimensions } from "react-native";

import FullWindowOverlayNativeComponent from "@/mobile/utils/FullWindowOverlayNativeComponent";
import View, { ViewProps} from "@/mobile/components/View";
import { forwardRef } from "react";
import composeStyles from "../utils/composeStyles";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface FullWindowOverflowProps extends ViewProps {
  children: React.ReactNode;
}

const FullWindowOverlay = forwardRef<FullWindowOverflowProps, ViewProps>((props, forwardedRef) => {
  const { children, style, ...otherProps } = props;
  const Component = Platform.OS === "ios" ? FullWindowOverlayNativeComponent : View;

  const composedStyles = composeStyles(styles.container, style);

  return (
    <Component style={styles.wrapper}>
      <View ref={forwardedRef} style={composedStyles} {...otherProps}>
        {children}
      </View>
    </Component>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: width,
    height: height,
  },
  container: {
    width: "100%",
    height: "100%"
  }
});

export default FullWindowOverlay;