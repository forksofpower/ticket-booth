import React from "react";

import { Theme } from "@/types/theme";

export interface ThemeLoaderProps
  extends React.ComponentPropsWithoutRef<"script"> {
  forceTheme?: boolean;
  defaultTheme?: Theme;
  localStorageKey?: string;
}

export const getScript = ({
  forceTheme,
  defaultTheme,
  localStorageKey = "theme",
}: Pick<
  ThemeLoaderProps,
  "defaultTheme" | "forceTheme" | "localStorageKey"
>) => {
  return forceTheme
    ? `document.documentElement.setAttribute("data-theme", '${defaultTheme}');`
    : `try{var a=window.localStorage.getItem("${localStorageKey}");var e=a==="light"||a==="dark"||a==="auto"?a:"${defaultTheme}";var r=e!=="auto"?e:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",r)}catch(t){}`;
};

const ThemeLoader: React.FC<ThemeLoaderProps> = ({
  forceTheme,
  defaultTheme,
  localStorageKey,
}) => {
  const _defaultTheme = ["light", "dark", "auto"].includes(
    defaultTheme as string
  )
    ? defaultTheme
    : Theme.LIGHT;
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: getScript({
          forceTheme,
          defaultTheme: _defaultTheme,
          localStorageKey,
        }),
      }}
    />
  );
};

export default ThemeLoader;
