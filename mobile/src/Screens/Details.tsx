import { useState, useEffect } from "react";
import {Share} from 'react-native'
import { useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base";

import { api } from "../services/api";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolHeader } from "../components/PoolHeader";
import { PoolCardPros } from "../components/PoolCard";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import {Guesses} from "../components/Guesses";

// import { api } from '../services/api';
interface RouteParams {
  id: string;
}

export function Details() {
    const route = useRoute();
    const toast = useToast();
    
    const { id } = route.params as RouteParams;

    const [isLoading, setIsLoading] = useState(true);
    const [poolDetails, setPoolDetails] = useState<PoolCardPros>({} as PoolCardPros);
    const [optionsSelected,setOptionsSelected] =useState<'guesses'|'ranking'>({} as 'guesses')
  async function fetchPoolDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pool);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel carregar os bolões!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
        message:poolDetails.code
    })
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title={poolDetails.title} onShare={handleCodeShare} showBackButton showShareButton />
      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />
          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option 
                title="Seus palpites" 
                isSelected={optionsSelected==='guesses'} 
                onPress={()=>setOptionsSelected("guesses")}
            />
            <Option 
                title="Ranking do grupo" 
                isSelected={optionsSelected==='ranking'} 
                onPress={()=>setOptionsSelected("ranking")}
            />
          </HStack>
   
          <Guesses poolId={poolDetails.id} code={poolDetails.code}/>
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
}
