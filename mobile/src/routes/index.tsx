import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "../Screens/Signin";
import { AppRoutes } from "./app.routes";
import { useAuth } from "../hooks/useAuth";
import { Box } from "native-base";

export function Routes() {
  const { user } = useAuth();
  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  );
}
