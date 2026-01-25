import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import FastImage, {ResizeMode} from '@d11/react-native-fast-image';
import {
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  StyleSheet,
  View,
} from 'react-native';
import React, {FC, ReactNode, useEffect, useState} from 'react';
import {screenHeight, screenWidth} from '@utils/Constants';

interface Props {
  /** Source of the image (remote URI or local require) */
  source: ImageSourcePropType;
  /** Height of the background container. Defaults to Screen Height */
  height?: number;
  /** Width of the background container. Defaults to Screen Width */
  width?: number;
  /** How long (in ms) it takes to scroll one full screen width. Lower = Faster */
  duration?: number;
  /** Direction of the scroll */
  direction?: 'left' | 'right';
  /** Image resize mode (cover, contain, stretch) */
  resizeMode?: ResizeMode;
  /** Any children (buttons, text) to overlay on top of the background */
  children?: ReactNode;
}

const ImageAutoScroll: FC<Props> = ({
  source,
  height = screenHeight,
  width = screenWidth,
  duration = 20000,
  direction = 'left',
  resizeMode = FastImage.resizeMode.cover,
  children,
}) => {
  const [containerWidth, setContainerWidth] = useState(width);
  const translateX = useSharedValue(0);

  // Determine animation target based on direction
  // If moving left, we go from 0 to -width.
  // If moving right, we go from -width to 0.
  const startVal = direction === 'left' ? 0 : -containerWidth;
  const endVal = direction === 'left' ? -containerWidth : 0;

  useEffect(() => {
    // Reset animation if props change
    cancelAnimation(translateX);
    translateX.value = startVal;

    translateX.value = withRepeat(
      withTiming(endVal, {
        duration: duration,
        easing: Easing.linear,
      }),
      -1, // Infinite repetitions
      false, // Do not reverse (yoyo), just loop
    );
  }, [translateX, direction, duration, containerWidth, startVal, endVal]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const onLayout = (e: LayoutChangeEvent) => {
    if (width === screenWidth) {
      setContainerWidth(e.nativeEvent.layout.width);
    }
  };

  return (
    <View style={[styles.container, {height}]} onLayout={onLayout}>
      {/* The Animated View acts as a slider holding two copies of the image.
        It is absolutely positioned to cover the background.
      */}
      <Animated.View
        style={[
          styles.imageSlider,
          {width: containerWidth * 2},
          animatedStyle,
        ]}>
        {/* Image Copy 1 */}
        <Image
          source={source}
          style={[styles.image, {width: containerWidth}]}
          resizeMode={resizeMode}
        />

        {/* Image Copy 2 (The seamless clone) */}
        <Image
          source={source}
          style={[styles.image, {width: containerWidth}]}
          resizeMode={resizeMode}
        />
      </Animated.View>

      {/* Overlay Content */}
      <View style={styles.overlayContent}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden', // Ensures we don't see the images spilling out
    backgroundColor: 'black',
  },
  imageSlider: {
    flexDirection: 'row', // Places images side-by-side
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
  },
  overlayContent: {
    flex: 1,
    zIndex: 1, // Ensures content sits on top of the scrolling images
  },
  image: {height: '100%'},
});

export default ImageAutoScroll;
