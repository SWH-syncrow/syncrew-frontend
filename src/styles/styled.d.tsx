import "styled-components";
import * as Scheme from "./schemes";

export type T_COLOR_SCHEME = keyof typeof Scheme.ColorScheme;
export interface SyncrowTheme {
  colors: {
    [type: T_COLOR_SCHEME | string]:
      | {
          [type: number | string]: { [type: number | string]: string } | string;
        }
      | string;
  };
}
