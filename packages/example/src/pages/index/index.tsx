import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { goRoute, useRoute } from "../../router";
import { useEffect } from "react";

export default function Index() {
  const routeState = useRoute();

  useEffect(() => {
    console.log("routeState", routeState);
  }, []);

  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View
      className="index"
      onClick={() => goRoute("my", { query: { uid: "12312" } })}
    >
      <Text>Index</Text>
    </View>
  );
}
