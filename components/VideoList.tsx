import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FlatList,
  useWindowDimensions,
  ViewabilityConfigCallbackPairs,
  Image,
} from "react-native";
import { useAtomValue } from "jotai";
import { FC, useRef, useState } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { videoItemListAtom } from "../atom";

interface VideoListProps {
  initialVideoId: string;
}

export const VideoList: FC<VideoListProps> = ({ initialVideoId }) => {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const videoHeight = height - insets.top - insets.bottom;
  const videoItemList = useAtomValue(videoItemListAtom);
  const [activeVideoIndex, setActiveVideoIndex] = useState(-1);
  const viewabilityConfigCallbackPairs: ViewabilityConfigCallbackPairs = [
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 90,
      },
      onViewableItemsChanged: ({ viewableItems }) => {
        if (viewableItems.length) {
          setActiveVideoIndex(viewableItems[0].index as number);
        }
      },
    },
  ];

  const viewabilityConfigCallbackPairsRef = useRef(
    viewabilityConfigCallbackPairs
  );

  return (
    <FlatList
      style={{ width: "100%" }}
      contentContainerStyle={{ width: "100%" }}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairsRef.current}
      initialScrollIndex={videoItemList.findIndex(
        (item) => item._id === initialVideoId
      )}
      getItemLayout={(_, index) => ({
        length: videoHeight,
        offset: videoHeight * index,
        index,
      })}
      snapToInterval={videoHeight}
      decelerationRate="fast"
      data={videoItemList}
      renderItem={({ item, index }) => {
        return Math.abs(activeVideoIndex - index) <= 1 ? (
          <VideoPlayer
            key={item._id}
            videoUrl={item.videoUrl}
            dishTitle={item.postTitle}
            restaurantName={item.restaurantName}
            videoHeight={videoHeight}
            activeVideoIndex={activeVideoIndex}
            videoIndex={index}
            posterUrl={item.coverImageUrl}
          />
        ) : (
          // return (
          <Image
            source={{ uri: item.coverImageUrl }}
            style={{ height: videoHeight, width: "100%" }}
            resizeMode="stretch"
          />
        );
      }}
    />
  );
};
