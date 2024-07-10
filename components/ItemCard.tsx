import { Image, Text, StyleSheet, View, Pressable } from "react-native";
import { FC } from "react";
import { useNavigation } from "expo-router";
import { ScreenNavigationProps } from "../type";

export interface ItemCardProps {
  imageSource: string;
  dishTitle: string;
  restaurantName: string;
  id: string;
}

export const ItemCard: FC<ItemCardProps> = ({
  imageSource,
  dishTitle,
  restaurantName,
  id,
}) => {
  const navigation = useNavigation<ScreenNavigationProps>();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate("video/[id]", { id });
        }}
      >
        <Image
          source={{
            uri: imageSource,
          }}
          height={200}
          style={styles.image}
        />
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.dishTitile}>{dishTitle}</Text>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: "46%",
    marginHorizontal: "2%",
    marginBottom: 10,
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textContainer: {
    // flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 15,
    paddingHorizontal: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  dishTitile: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 30,
    marginBottom: 5,
  },
  restaurantName: {
    fontWeight: "500",
  },
});
