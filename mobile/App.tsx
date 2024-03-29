
import { NativeBaseProvider,StatusBar } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Loading } from "./src/components/Loading";
import { SignIn } from "./src/Screens/Signin";

import { THEME } from "./src/styles/themes";
import { AuthContextProvider } from "./src/Contexts/AuthContext";
import { New } from "./src/Screens/New";
import { Find } from "./src/Screens/Find";
import { Pools } from "./src/Screens/Pools";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
      <StatusBar 
        barStyle="light-content"
        backgroundColor={"transparent"}
        translucent
      />


      {/* {fontsLoaded ? <Pools /> : <Loading />} */}
      {/* {fontsLoaded ? <Find  /> : <Loading />} */}
      {fontsLoaded ? <Routes/>: <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
