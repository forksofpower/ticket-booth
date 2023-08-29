import "@/styles/globals.css";

import { NextPage } from "next";

import { CurrentUserProvider } from "@/contexts/current-user";
import { User } from "@/types/user";
import buildClient from "@/utils/build-client";

// import ThemeToggle from "@/components/theme-toggle";

import type { AppContext, AppProps } from "next/app";
export type NextPageWithLayout<Props = {}, InitialProps = Props> = NextPage<
  Props,
  InitialProps
> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  currentUser: User | null;
};

function App({ Component, pageProps, currentUser }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <CurrentUserProvider currentUser={currentUser}>
      {getLayout(<Component {...pageProps} />)}
    </CurrentUserProvider>
  );
}

App.getInitialProps = async (context: AppContext) => {
  const client = buildClient(context.ctx);

  const {
    data: { currentUser },
  } = await client.get<{ currentUser: User }>(`/api/users/currentuser`);

  const pageProps =
    (await context.Component.getInitialProps?.(context.ctx)) || {};

  return {
    pageProps,
    currentUser,
  };
};

export default App;
