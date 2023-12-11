import React from "react";
import { View as RNView, ViewProps as RNViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ViewProps extends RNViewProps {
  safe?: boolean;
}

const View = React.forwardRef<RNView, ViewProps>((props, forwardedRef) => {
  const { safe = false, children, ...otherProps } = props;

  const Component = safe ? SafeAreaView : RNView;

  return (
    <Component ref={forwardedRef} {...otherProps}>{children}</Component>
  );

});

View.displayName = "View";

export default View;