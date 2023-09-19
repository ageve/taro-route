export interface RouteMeta<Name extends string> {
  name: Name;
  path: string;
  isTabPage: boolean;
}

export type RouteList<Name extends string> = RouteMeta<Name>[];

export type QueryMap<Name extends string> = {
  [K in Name]?: Record<string, string>;
};

export type Method = "navigate" | "redirect" | "relaunch";

export interface Options {
  method?: Method;
  reveal?: boolean;
}

export interface CallbackResult {
  /** 错误信息 */
  errMsg: string;
}
