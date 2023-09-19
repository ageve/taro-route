import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";
import { goPage, useRoute } from "../../router";
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
      onClick={() => goPage("my", { query: { uid: "" } })}
    >
      <Text>Index</Text>
    </View>
  );
}
