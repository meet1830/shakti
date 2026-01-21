import {Colors, windowWidth} from '@utils/Constants';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';

interface CarouselProps<T> {
  data: T[];
  renderItem: ({item, index}: {item: T; index: number}) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  itemWidth?: number;
  containerStyle?: ViewStyle;
  enableAutoscroll?: boolean;
}

export const Carousel = <T,>({
  data,
  renderItem,
  keyExtractor,
  itemWidth = windowWidth,
  containerStyle,
  enableAutoscroll,
}: CarouselProps<T>) => {
  const listRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoscrollIndex = useRef(0);

  // Update index based on scroll position
  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollOffset = event.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(scrollOffset / itemWidth);

      if (currentIndex !== activeIndex) {
        setActiveIndex(currentIndex);
      }
    },
    [activeIndex, itemWidth],
  );

  useEffect(() => {
    if (!data?.length || data.length === 1 || !enableAutoscroll) {
      return;
    }

    const timer = setInterval(() => {
      autoscrollIndex.current =
        autoscrollIndex.current === data.length - 1
          ? 0
          : autoscrollIndex.current + 1;

      listRef.current?.scrollToIndex({
        index: autoscrollIndex.current,
        animated: true,
      });
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  }, [data.length, enableAutoscroll]);

  return (
    <View style={[styles.container, {width: itemWidth}, containerStyle]}>
      <FlatList
        ref={listRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={itemWidth}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16} // Captures scroll at ~60fps
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {data?.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: Colors.lightYellow,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#CCC',
  },
});
