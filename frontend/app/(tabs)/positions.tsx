import Board from "@/components/board/Board";
import { icons } from "@/constants/icons";
import { fetchPositions } from "@/services/api";
import useFetch from "@/services/usefetch";
import React, { memo, useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ChessBoardItem = memo(({ fen }: { fen: string }) => (
  <View style={{ marginBottom: 8, padding: 4 }}>
    <Board fen={fen} size={340} shouldSelectPiece={() => false} />
  </View>
));


ChessBoardItem.displayName = "ChessBoardItem";

export default function Positions() {
  const { data: positions, loading, error } = useFetch(fetchPositions);

  
  const memoizedPositions = useMemo(() => positions ?? [], [positions]);

  const keyExtractor = useCallback((item: { id: string }) => item.id.toString(), []);
  const getItemLayout = useCallback(
    (_data: unknown, index: number) => ({
      length: 350,
      offset: 350 * index,
      index,
    }),
    []
  );

  const renderItem = useCallback(({ item }: { item: { fen: string } }) => <ChessBoardItem fen={item.fen} />, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={{ color: "white", marginTop: 8 }}>Loading positions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <Text style={{ color: "red", textAlign: "center", marginTop: 56 }}>
        Failed to load positions
      </Text>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        data={memoizedPositions}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={5}
        maxToRenderPerBatch={3} // Reducing batch rendering for smoother navigation
        windowSize={10} // Expanding window size for better scrolling performance
        removeClippedSubviews // Improves memory usage for hidden items
        contentContainerStyle={{ paddingBottom: 128 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ alignItems: "center", marginTop: 20, marginBottom: 10 }}>
            <Image source={icons.secondantLogo} style={{ width: 192, height: 96 }} resizeMode="contain" />
            <Text style={{ color: "white", fontWeight: "600", fontSize: 18, marginTop: 12, marginBottom: 6 }}>
              Latest positions
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
            No positions available
          </Text>
        }
      />
    </GestureHandlerRootView>
  );
}