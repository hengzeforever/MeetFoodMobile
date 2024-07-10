import { AuthGuard } from "../components/AuthGuard";
import { CreateContentScreen } from "../components/CreateContentScreen";

export default function App() {
  return (
    //<AuthGuard>
    <CreateContentScreen />
    //</AuthGuard>
  );
}
