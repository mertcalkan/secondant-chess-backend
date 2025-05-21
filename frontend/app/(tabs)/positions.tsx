import Board from "@/components/board/Board";
import { icons } from "@/constants/icons";
import { fetchPositions } from "@/services/api";
import useFetch from "@/services/usefetch";
import { useRouter } from "expo-router";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Positions() {
  const router = useRouter();
  const { data: positions, loading, error } = useFetch(() => fetchPositions());
  if (loading)
    return (
      <Text style={{ color: "white", textAlign: "center", marginTop: 220 }}>
        Loading positions...
      </Text>
    );
  if (error)
    return (
      <Text style={{ color: "red", textAlign: "center", marginTop: 220 }}>
        Failed to load positions
      </Text>
    );
  return (
    <GestureHandlerRootView className="flex-1 bg-primary" style={{ flex: 1 }} >
      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={icons.secondantLogo}
          style={{
            width: 192,
            height: 96,
            marginTop: 80,
            marginBottom: 20,
            alignSelf: "center",
          }}
        />

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 18,
              color: "white",
              fontWeight: "600",
              marginTop: 20,
              marginBottom: 12,
            }}
          >
            Latest positions
          </Text>

          <FlatList
  data={positions}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={{ marginBottom: 8, padding: 4 }}>
      <Board fen={item.fen} size={340} shouldSelectPiece={() => false} />
    </View>
  )}
  contentContainerStyle={{ paddingBottom: 128 }}
/>
          : (
            <Text
              style={{ color: "white", textAlign: "center", marginTop: 20 }}
            >
              No positions available
            </Text>
          )
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
