import { useState, useEffect } from "react";
import { Box, FlatList, useToast } from "native-base";
import { api } from "../services/api";

import { Game, GameProps } from "../components/Game";
import { Loading } from "./Loading";
import { EmptyMyPoolList } from "./EmptyMyPoolList";
interface Props {
  poolId: string;
  code:string

}

export function Guesses({ poolId,code }: Props) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeampoint, setFirstTeampoint] = useState("");
  const [secondTeamPoint, setSecondTeamPoint] = useState("");

  async function fetchGames() {
    try {
      setIsLoading(true);
      const response = await api.get(`/pools/${poolId}/games`);
      setGames(response.data.games);
      console.log(response.data.games)
      console.log(response.data.games)

    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel carregar os jogos!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }
  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeampoint.trim() || !secondTeamPoint.trim()) {
        return toast.show({
          title: "Informe o placar palpite!",
          placement: "top",
          bgColor: "red.500",
        });
      }
      console.log(`/pools/${poolId}/games/${gameId}/guesses`);
      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoint: Number(firstTeampoint),
        secondTeamPoint: Number(secondTeamPoint),
      });
      toast.show({
        title: "Palpite enviado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
      fetchGames();
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possivel enviar o palpite!",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }
  useEffect(() => {
    fetchGames();
  }, [poolId]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Game
            data={item}
            
            setFirstTeamPoints={setFirstTeampoint}
            setSecondTeamPoints={setSecondTeamPoint}
            onGuessConfirm={() => handleGuessConfirm(item.id)}

            
            />
            )}
        _contentContainerStyle={{pb:10}}
        ListEmptyComponent={()=><EmptyMyPoolList code={code}/>}
      />
    </Box>
  );
}
