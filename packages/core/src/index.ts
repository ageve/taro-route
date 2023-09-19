import Taro from "@tarojs/taro";
import { CallbackResult } from "./types.js";

export type { RouteList, QueryMap, RouteMeta } from "./types.js";
export { default as createRoute } from "./core.js";

/** @param delta (number) 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 */
export function goBack(delta?: number) {
  return new Promise<CallbackResult>((resolve, reject) => {
    Taro.navigateBack({
      delta,
      success: resolve,
      fail: reject,
    });
  });
}
