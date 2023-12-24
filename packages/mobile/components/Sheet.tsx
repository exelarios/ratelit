import { useCallback, useMemo, useRef } from "react";
import {
  Dimensions,
  useWindowDimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewProps,
  GestureResponderEvent,
  LayoutChangeEvent 
} from "react-native";

import View from "@/mobile/components/View";
import colors from "@/mobile/design/colors";

import Animated, {
  Easing, 
  FadeIn, 
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming 
} from "react-native-reanimated";

import { PanGestureHandler } from "react-native-gesture-handler";

const WindowHeight = Dimensions.get("window").height;
const WindowWidth = Dimensions.get("window").width;

interface SheetProps extends ViewProps {
  snapPoints: string[],
  open?: boolean;
  maxHeightOnSnap?: boolean;
  onClose?: () => void;
}

function Sheet(props: SheetProps) {
  const { open = false, snapPoints, onClose, style, children, ...otherProps } = props;

  const currentSnapPointIndex = useSharedValue(0);
  const wrapper = useRef<Animated.View>();

  const containerLayout = useRef({
    width: 0,
    height: 0
  });

  const wrapperLayout = useRef({
    width: 0,
    height: 0
  });

  const dimensions = useWindowDimensions();

  const snaps = useMemo(() => {
    const windowHeight = dimensions.height - 100;
    const partition = Math.floor(windowHeight / snapPoints.length);

    return snapPoints.map((point, index) => {
      const regex = new RegExp(/\d+/);
      let value = parseInt(regex.exec(point)[0]);
      value = value / 100;
      
      if (index == 0) {
        return {
          point,
          start: 0,
          end: partition
        }
      }

      const start = (partition * (index + 1)) - partition;
      const end = partition * (index + 1);

      return {
        point,
        start,
        end
      }
    });
  }, [snapPoints]);

  const height = useSharedValue(snaps[0].end);

  const handleOnGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context: { startY: number }) => {
      context.startY = height.value;
    },
    onActive: (event, context) => {
      "worklet";
      height.value = context.startY - event.translationY;

      if (height.value < 100) {
        runOnJS(onClose)();
      }
    },
    onEnd: (event) => {
      "worklet";
      const maxHeight = dimensions.height - 100;

      // Bound the sheet to the max height.
      if (height.value > maxHeight) {
        height.value = withTiming(maxHeight, {
          duration: 100,
          easing: Easing.ease
        });
        currentSnapPointIndex.value = snaps.length - 1;
        return;
      }

      // Max threshold: [-3000, 3000]
      // Takes the max height of the sheet via swipe up
      // Closes the sheet via swipe down
      if (event.velocityY > 3000) { // swipe down
        runOnJS(onClose)();
        height.value = snaps[0].start
        currentSnapPointIndex.value = 0;
        return;
      }
      
      if (event.velocityY <= -3000) { // swipe up
        height.value = withTiming(maxHeight, {
          duration: 100,
          easing: Easing.ease
        });
        currentSnapPointIndex.value = snaps.length - 1;
        return;
      }

      // Theshold: [-300, 300]
      // Snaps to the next snap point
      if (event.velocityY > 100) { // down
        const index = currentSnapPointIndex.value - 1;
        if (index < 0) return;

        height.value = withTiming(snaps[index].start, {
          duration: 100,
          easing: Easing.ease
        });

        currentSnapPointIndex.value = index;
        return;
      }

      if (event.velocityY <= -100) { // up
        const index = currentSnapPointIndex.value + 1;
        if (index >= snaps.length) return;

        height.value = withTiming(snaps[index].start, {
          duration: 100,
          easing: Easing.ease
        });

        currentSnapPointIndex.value = index;
        return;
      }

      for (let i = 0; i < snaps.length; i++) {
        const snap = snaps[i];
        const { start, end, point } = snap;
        if (height.value > start && height.value < end) {
          // If `start` is zero, we will use the `end` value
          // so the height doesn't become zero.
          height.value = withTiming(start === 0 ? end : start, {
            duration: 100,
            easing: Easing.ease
          });
          currentSnapPointIndex.value = i;
          break;
        }
      }
    }
  }, [height, snaps, dimensions, currentSnapPointIndex]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: height.value
    }
  });

  const handleOnPress = useCallback((event: GestureResponderEvent) => {
    const target = event.nativeEvent;
    const cursor = {
      x: target.pageX,
      y: target.pageY
    }

    const wrapper = wrapperLayout.current;
    const container = containerLayout.current;

    const pressableHeight = wrapper.height - container.height;
    const pressableWidth = wrapper.width - container.width;
    if (cursor.y < pressableHeight || cursor.x < pressableWidth) {
      onClose();
    }
  }, [height]);

  const handleOnWrapperLayout = useCallback((event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    wrapperLayout.current = {
      width: layout.width,
      height: layout.height
    }

    wrapper.current?.measure((x, y, width, height, pageX, pageY) => {
      wrapper.current.setNativeProps({
        transform: [{ translateX: -pageX }, { translateY: -pageY }],
      });
    });
  }, [height]);

  const handleOnSheetLayout = useCallback((event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    containerLayout.current = {
      width: layout.width,
      height: layout.height
    }
  }, [height]);

  const handleSideOutDownCallback = () => {
    "worklet"
    height.value = snaps[0].end
    currentSnapPointIndex.value = 0;
  }

  return open && (
    <TouchableWithoutFeedback
      onPressIn={handleOnPress}
      onLayout={handleOnWrapperLayout}>
      <Animated.View
        ref={wrapper}
        style={styles.wrapper}
        entering={FadeIn}
        exiting={FadeOut}
        {...otherProps}>
        <PanGestureHandler
          onGestureEvent={handleOnGestureEvent}>
          <Animated.View
            style={[styles.sheet, style, animatedStyles]}
            onLayout={handleOnSheetLayout}
            entering={SlideInDown.delay(100)}
            exiting={SlideOutDown.delay(100).withCallback(handleSideOutDownCallback)}>
            <View style={styles.bar}>
              <View style={styles.barInner}></View>
            </View>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    width: WindowWidth,
    height: WindowHeight,
    zIndex: 9999999
  },
  bar: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  barInner: {
    width: 100,
    marginHorizontal: "auto",
    height: 4,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.neutral[500]
  },
  sheet: {
    position: "absolute",
    backgroundColor: colors.neutral[100],
    paddingTop: 15,
    paddingBottom: 40,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    bottom: 0,
    left: 0,
    right: 0,
  }
});

export default Sheet;
