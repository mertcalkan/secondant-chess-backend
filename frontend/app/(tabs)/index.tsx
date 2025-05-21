import { icons } from "@/constants/icons";
import { fetchGames } from "@/services/api";
import useFetch from "@/services/usefetch";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
// import SearchBar from "@/components/SearchBar";
export default function Index() {
  const router = useRouter();
  const { data: games } = useFetch(() => fetchGames());

  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.secondantLogo} className="w-48 h-24 mt-20 mb-5 mx-auto" />

        <View className="flex-1">
          {/* <SearchBar placeholder="Enter a player or keyword to search" /> */}
          <Text className="text-lg text-white font-semibold mt-5 mb-3">Latest Games</Text>

          {games?.length > 0 ? (
            <View className="mt-2 pb-32  ">
              {games.map((game) => (
                <View key={game.id} className="mb-4 p-4 bg-dark-200 rounded-lg">
                  <Text className="flex-1 ml-2 text-light-200">Date:  {new Date(game.gameDate).toLocaleDateString("en-GB")}</Text>
                  <Text className="flex-1 ml-2 text-light-200">Players: {game.white} vs {game.black}</Text>
                  <Text className="flex-1 ml-2 text-light-200">Result: {game.result}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text className="text-white text-center mt-5">No games available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}