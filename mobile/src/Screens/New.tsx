import { useState } from "react";
import { Heading, Text, VStack, useToast, Toast } from "native-base";
import { Header } from "../components/Header";
import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Option } from "../components/Option";
import { Button } from "../components/Button";
import { Alert } from "react-native";
import { api } from "../services/api";
export function New() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function handlePoolCreate() {
    if (!title.trim()) {
      // Alert.alert('Novo bolão', 'informe o nome para seu bolão')
      return Toast.show({
        title: "Informe um nome para seu bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true);
      await api.post('/pools',{title})
      Toast.show({
        title: "Bolão Criado com sucesso!",
        placement: "top",
        bgColor: "green.500",

      });

   

    } catch (error) {
      console.log(error);

      Toast.show({
        title: "Não foi possivel criar bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally{
      setIsLoading(false);
      setTitle('')
    }


  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily={"heading"}
          color="white"
          fontSize={"xl"}
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>
        <Input
          mb={2}
          placeholder="Qual nome do seu bolão?"
          onChangeText={setTitle}
          value={title}
        />
        <Button
          title="CRIAR MEU BOLÂO"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />
        <Text color="gray.200" fontSize="sm" alignItems="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>

        {/* <Option isSelected={true} title={"seila"} /> */}
      </VStack>
    </VStack>
  );
}
