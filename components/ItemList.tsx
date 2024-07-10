import { FlatList, RefreshControl } from "react-native";
import { ItemCard } from "./ItemCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { VideoPostItem } from "../type";
import { videoItemListAtom } from "../atom";

export const ItemList = () => {
  const [itemData, setItemData] = useAtom<VideoPostItem[]>(videoItemListAtom);
  const [loading, setloading] = useState(false);

  const fetchVideoPosts = () => {
    setloading(true);
    axios
      .get<VideoPostItem[]>("http://10.0.2.2:3000/api/v1/video/videos?size=50")
      .then((res) => {
        setItemData(res.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    fetchVideoPosts();
  }, []);

  if (loading) {
    <FontAwesome name="spinner" size={60} color="black" />;
  }

  return (
    <FlatList
      data={itemData}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchVideoPosts} />
      }
      renderItem={({ item, index }) => (
        <ItemCard
          key={index}
          imageSource={item.coverImageUrl}
          dishTitle={item.postTitle}
          restaurantName={item.restaurantName}
          id={item._id}
        />
      )}
      numColumns={2}
    />
  );
};
