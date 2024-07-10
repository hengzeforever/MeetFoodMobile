import { ResizeMode, Video, AVPlaybackStatusSuccess } from "expo-av";
import { useEffect, useRef, useState, FC } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { ScreenNavigationProps } from "../type";

interface VideoPlayerProps {
  videoUrl: string;
  videoHeight: number;
  dishTitle: string;
  restaurantName: string;
  videoIndex: number;
  activeVideoIndex: number;
  posterUrl: string;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
  videoUrl,
  videoHeight,
  dishTitle,
  restaurantName,
  videoIndex,
  activeVideoIndex,
  posterUrl,
}) => {
  const video = useRef(null);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ScreenNavigationProps>();
  const [status, setStatus] = useState<Partial<AVPlaybackStatusSuccess>>({});

  const toggleVideoPlay = () => {
    if (video.current) {
      status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();
    }
  };

  useEffect(() => {
    if (videoIndex === activeVideoIndex) {
      video.current?.playAsync();
    } else {
      video.current?.pauseAsync();
    }
  }, [activeVideoIndex]);

  return (
    <View style={{ ...styles.container, height: videoHeight }}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoUrl,
        }}
        posterSource={{ uri: posterUrl }}
        posterStyle={{ height: videoHeight }}
        resizeMode={ResizeMode.STRETCH}
        isLooping
        onPlaybackStatusUpdate={(status) => {
          // Success case
          if (status.isLoaded) {
            setStatus(status);
          }

          // error handling
        }}
      />
      <View
        style={{
          ...styles.controlContainer,
          justifyContent: "center",
          alignContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {status.isPlaying ? null : (
          <FontAwesome.Button
            name="play-circle"
            size={80}
            onTouchEnd={toggleVideoPlay}
            color="grey"
            style={{ justifyContent: "center" }}
            backgroundColor="transparent"
          />
        )}
      </View>
      <View
        style={{
          ...styles.controlContainer,
          bottom: insets.bottom,
          paddingBottom: 12,
          paddingLeft: 12,
        }}
      >
        <Text style={styles.dishTitle}>{dishTitle}</Text>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
      </View>
      <View
        style={{
          ...styles.controlContainer,
          justifyContent: "center",
          alignContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Pressable
          onPress={toggleVideoPlay}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View
        style={{
          ...styles.controlContainer,
        }}
      >
        <FontAwesome.Button
          name="arrow-left"
          size={30}
          onPress={() => {
            navigation.navigate("index");
            video.current?.pauseAsync();
          }}
          backgroundColor="transparent"
          color="grey"
          style={{ padding: 20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlContainer: {
    position: "absolute",
    pointerEvents: "box-none",
  },
  dishTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  restaurantName: {
    color: "#fff",
  },
});
