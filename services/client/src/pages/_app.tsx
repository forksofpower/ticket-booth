import "@/styles/globals.css";

import { Axios, AxiosInstance } from "axios";
import { NextPage, NextPageContext } from "next";
import { BaseContext } from "next/dist/shared/lib/utils";
import { ComponentType } from "react";

import { CurrentUserProvider } from "@/contexts/current-user";
import { User } from "@/types/user";
import buildClient from "@/utils/build-client";

// import ThemeToggle from "@/components/theme-toggle";
// declare global {
//   type NextComponentType<
//     Context extends BaseContext = NextPageContext,
//     InitialProps = {},
//     Props = {}
//   > = ComponentType<Props> & {
//     /**
//      * Used for initial page load data population. Data returned from `getInitialProps` is serialized when server rendered.
//      * Make sure to return plain `Object` without using `Date`, `Map`, `Set`.
//      * @param context Context of `page`
//      */
//     getInitialProps?(
//       context: Context,
//       client: AxiosInstance,
//       currentUser: User
//     ): InitialProps | Promise<InitialProps>;
//   };
// }

import type { AppContext, AppProps } from "next/app";
export type NextPageWithLayout<Props = {}, InitialProps = Props> = NextPage<
  Props,
  InitialProps
> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
  // getInitialProps?(
  //   context: Context,
  //   client: AxiosInstance,
  //   currentUser: User
  // ): InitialProps | Promise<InitialProps>;
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
