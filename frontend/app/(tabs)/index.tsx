import {
  Image,
  ScrollView,
  View
} from "react-native";

import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
  <View className="flex-1 bg-primary">
    
        <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >

        <Image source={icons.secondantLogo} className="w-48 h-24 mt-20 mb-5 mx-auto" />
        
         <View className="flex-1 mt-5">
         <SearchBar
              // onPress={() => {
              //   router.push("/search");
              // }}
              placeholder="Enter a player or keyword to search"
            />
      </View>
      </ScrollView>
     
    </View>
  );
}
