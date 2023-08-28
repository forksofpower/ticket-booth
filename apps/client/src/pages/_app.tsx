import "@/styles/globals.css";

import { NextPage } from "next";

// import ThemeToggle from "@/components/theme-toggle";

import type { AppProps } from "next/app";

export type NextPageWithLayout<Props = {}, InitialProps = Props> = NextPage<
  Props,
  InitialProps
> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // useEffect(() => {
  //   document.querySelector("html")?.setAttribute("data-theme", "cyberpunk");
  // }, []);
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}
