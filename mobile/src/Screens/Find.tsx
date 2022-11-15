import { useState } from "react";
import { Heading, Text, VStack, useToast } from "native-base";

import Logo from "../assets/logo.svg";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Option } from "../components/Option";
import { Button } from "../components/Button";
import { isLoaded } from "expo-font";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";
export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const {navigate} = useNavigation()
  const toast = useToast();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Informe o código!",
          placement: "top",
          bgColor: "red.500",
        })
      };
      api.post('/pools/join',{code})
      navigate('pools')




    } catch (error) {
      console.log(error);
      setIsLoading(false);
      if (error.response?.data?.messsage === "Pool not found!") {
        return toast.show({
          title: "Bolão não encontrado!",
          placement: "top",
          bgColor: "red.500",
        });
      }
      if (error.response?.data?.messsage === "You already joined this pool!") {
        return toast.show({
          title: "você já esta neste Bolão!",
          placement: "top",
          bgColor: "red.500",
        });
      }
    } 
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" showBackButton />

      <VStack mb={8} mx={5} alignItems="center">
        <Heading
          fontFamily={"heading"}
          color="white"
          fontSize={"xl"}
          my={8}
          textAlign="center"
        >
          Encontre um bolão através de{"\n"}seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o código do bolão??"
          autoCapitalize="characters"
          onChangeText={setCode}
        />
        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
