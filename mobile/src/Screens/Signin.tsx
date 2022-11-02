import { Center, StatusBar, Text } from "native-base";
import { Loading } from "../components/Loading";

export function SignIn() {
  return (
    <Center flex={1} bgColor="gray.900">
      <Text color="white" fontSize={24} fontFamily="heading">
        SignIn
      </Text>
    </Center>
  );
}
