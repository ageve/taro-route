import { useMemo } from "react";
import { createRoute, RouteList } from "taro-route";

type Name = "index" | "my";
type QueryMap = {
  my: { uid: string };
};

const routeList: RouteList<Name> = [
  {
    name: "index",
    path: "/pages/index/index",
    isTabPage: false,
  },
  {
    name: "my",
    path: "/pages/my/index",
    isTabPage: false,
  },
];

const { goRoute: go, getRoute } = createRoute<Name, QueryMap>(routeList);

export const goRoute = go;

export function useRoute<U extends Name>() {
  const routeState = useMemo(() => {
    return getRoute<U>();
  }, []);
  return routeState;
}
