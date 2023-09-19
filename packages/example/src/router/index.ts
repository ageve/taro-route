import { useMemo } from "react";
import { createRoute, RouteList, RouteMeta } from "taro-route";

type Name = "index" | "my";
type QueryMap = {
  my: { uid: string };
  index?: { action?: string };
};

const routeList: RouteList<Name> = [
  {
    name: "index",
    path: "/pages/index/index",
    isTab: false,
  },
  {
    name: "my",
    path: "/pages/my/index",
    isTab: false,
  },
];

export const { goPage, getRoute } = createRoute<Name, QueryMap>(routeList);

// route hook
export function useRoute<U extends Name>() {
  const routeState = useMemo(() => {
    // from : 从哪个页面访问; name, query, data
    return getRoute<U>();
  }, []);
  return routeState;
}

// 获取路由原始数据
export function getRouteMeta(name: Name) {
  return routeList.find((it) => it.name === name) as RouteMeta<Name>;
}

// 常用于分享转发等路由拼接场景
export function pathWithQuery(name: Name, queryMap: Record<string, string>) {
  const route = getRouteMeta(name);
  const query = new URLSearchParams();
  for (let key in queryMap) {
    query.append(key, queryMap[key]);
  }
  const queryString = query.toString();
  const url = `${route.path}?${queryString}`;
  return url;
}
