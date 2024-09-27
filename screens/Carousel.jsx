import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Animated, Dimensions, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const Carousel = () => {
  const NewsList = [
    {
      id: 1,
      Image: 'https://images.unsplash.com/photo-1570179538662-faa5e38e9d8f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Breaking News 1',
    },
    {
      id: 2,
      Image: 'https://images.unsplash.com/photo-1604595704321-f24afaa2fa6e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Breaking News 2',
    },
    {
      id: 3,
      Image: 'https://images.unsplash.com/photo-1585282263861-f55e341878f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Breaking News 3',
    },
    {
      id: 4,
      Image: 'https://images.unsplash.com/photo-1593789198777-f29bc259780e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Breaking News 4',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % NewsList.length;
      setActiveIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    const listenerId = scrollX.addListener(({ value }) => {
      const index = Math.floor(value / width);
      setActiveIndex(index);
    });

    return () => {
      scrollX.removeListener(listenerId);
    };
  }, [scrollX]);

  const renderNewsItem = ({ item }) => (
    <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{ uri: item.Image }}
        style={{ width: '95%', height: 250, borderRadius: 15 }}
        resizeMode="cover"
      />
      <View style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        padding: 10
      }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.FlatList
        ref={flatListRef}
        data={NewsList}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        snapToInterval={width}
        bounces={false}
      />
      <View style={{
        width: '90%',
        height: 4,
        backgroundColor: 'gray',
        borderRadius: 2,
        overflow: 'hidden',
        marginTop: 10,
      }}>         
        <Animated.View
          style={{
            width: `${(activeIndex + 1) / NewsList.length * 100}%`,
            height: '100%',
            backgroundColor: 'blue',
            borderRadius: 2,
          }}
        />
      </View>
    </View>
  );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
};

export default Carousel;