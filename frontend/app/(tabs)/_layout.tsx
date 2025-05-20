import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIcon = ({focused , icon , title} : any) => {
  if(focused) {
      return (
  <ImageBackground
      source={images.highlight}
      className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
    >
      <Image source={icon} tintColor="#151312" className="size-7" />
      <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
    </ImageBackground>

  )
  }
   return (
    <View className="size-full justify-center items-center mt-2 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-6" />
    </View>
  );

};
const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Games",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon focused = {focused} icon = {icons.chessking} title = "Games"/>,
        }}
      />
      <Tabs.Screen
        name="puzzles"
        options={{ title: "Positions", headerShown: false ,
          tabBarIcon: ({ focused }) => <TabIcon focused = {focused} icon = {icons.chessboard} title = "Positions"/>
        }}
      />
      <Tabs.Screen
        name="positions"
        options={{ title: "Puzzles", headerShown: false ,
           tabBarIcon: ({ focused }) => <TabIcon focused = {focused} icon = {icons.puzzle} title = "Puzzles"/>
         }}
      />
    </Tabs>
  );
};

export default _layout;
