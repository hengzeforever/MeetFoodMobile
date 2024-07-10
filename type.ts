import { NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  index: undefined;
  createContent: undefined;
  useProfile: undefined;
  "video/[id]": { id: string };
};

export interface VideoPostItem {
  _id: string;
  postTitle: string;
  coverImageUrl: string;
  restaurantName: string;
  videoUrl: string;
}

export type ScreenNavigationProps = NavigationProp<RootStackParamList>;

export enum CreateScreenStep {
  Record,
  Review,
  Publish,
  Success,
}
