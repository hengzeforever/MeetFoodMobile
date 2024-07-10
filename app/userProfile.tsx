import { Text, View, Button } from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { AuthGuard } from "../components/AuthGuard";

const UserProfileScreen = () => {
  const { signOut } = useAuthenticator();
  console.log("AfterAuth");
  return (
    <View>
      <Text>Now you see me after login</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default function App() {
  return (
    <AuthGuard>
      <UserProfileScreen />
    </AuthGuard>
  );
}
