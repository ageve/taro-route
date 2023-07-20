import Taro from "@tarojs/taro";
import { Method, RouteList, RouteMeta } from "./types.js";
export type { RouteList, QueryMap } from "./types.js";

export function createRoute<
  Name extends string,
  QueryList extends { [K in Name]?: Record<string, string> }
>(routes: RouteList<Name>) {
  const routeList = routes;
  const routeInstance = Taro.getCurrentInstance();
  function getRoute<U extends Name>(): RouteMeta<Name> & {
    query: QueryList[U];
    from?: string;
  } {
    const currentPages = Taro.getCurrentPages();
    const currentPage = currentPages[currentPages.length - 1];
    const { route } = currentPage;

    const { router } = routeInstance;
    console.log("currentPages", route, currentPages, router, routeInstance);

    if (!router)
      throw new Error("It is forbidden to use on non-routing pages.");

    const from =
      currentPages.length > 1
        ? currentPages[currentPages.length - 2].route
        : undefined;
    const routeMeta = routeList.find((item) => {
      // NOTE: 修复 router?.path 错误，当 热更新时，这里 router?.path 会带上 queryString
      let path = router.path;
      if (/\?/.test(path)) {
        path = path.split("?")[0];
      }
      return item.path === path;
    });
    if (routeMeta) {
      return {
        ...routeMeta,
        query: router?.params as QueryList[U],
        from,
      };
    } else {
      throw new Error("路由设置出错，无法获得路由原始数据");
    }
  }

  function goRoute<U extends Name>(
    name: U,
    data?: {
      query?: QueryList[U];
      data?: unknown;
      reveal?: boolean;
      method?: Method;
    }
  ) {
    // 否则，根据选项参数中的 method 字段确定使用的路由跳转方法
    const method = data?.method || "navigate";
    const routeMeta = routeList.find((item) => {
      return item.name === name;
    });
    if (routeMeta) {
      let { path } = routeMeta;
      let url = path;
      if (data?.query) {
        const { query: queryMap } = data;
        const query = new URLSearchParams();
        for (let key in queryMap) {
          query.append(key, queryMap[key]);
        }
        const queryString = query.toString();
        url = `${path}?${queryString}`;
        console.log("queryString", queryString);
      }
      if (data?.reveal) {
        // TODO: 实现透传 query 和 data 的组合数据
      }
      if (routeMeta.isTabPage) {
        Taro.switchTab({ url });
      } else {
        switch (method) {
          case "navigate":
            Taro.navigateTo({ url });
            break;
          case "redirect":
            Taro.redirectTo({ url });
            break;
          case "relaunch":
            Taro.reLaunch({ url });
            break;
          default:
            Taro.navigateTo({ url });
            break;
        }
      }
    } else {
      throw new Error("");
    }
  }

  return { goRoute, getRoute };
}
