import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { useRoute } from "../../router";
import { useEffect } from "react";
// import { goRoute } from "../../router";

export default function Index() {
  const routeState = useRoute<"my">();

  useEffect(() => {
    console.log("routeState", routeState.query);
  }, []);

  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="index">
      <Text>我的</Text>
    </View>
  );
}
