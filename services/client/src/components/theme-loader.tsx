import Script from "next/script";
import React from "react";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
  AUTO = "auto",
}

export interface ThemeLoaderProps
  extends React.ComponentPropsWithoutRef<"script"> {
  forceTheme?: Theme;
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
    : `try {
      console.log("trying to get theme from local storage");
    var _colorScheme = window.localStorage.getItem("${localStorageKey}");
    console.log("got theme from local storage:", _colorScheme);
    var colorScheme = _colorScheme === "light" || _colorScheme === "dark" || _colorScheme === "auto" ? _colorScheme : "${defaultTheme}";
    var computedColorScheme = colorScheme !== "auto" ? colorScheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    console.log("computed color scheme:", computedColorScheme);
    document.documentElement.setAttribute("data-theme", computedColorScheme);
  } catch (e) {
    console.log("ERROR IN SCRIPT:", e);
  }
`;
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
