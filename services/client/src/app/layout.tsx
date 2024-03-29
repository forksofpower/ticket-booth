import "./globals.css";

import { headers } from "next/headers";

import NavBar from "@/components/nav/navbar";
import ThemeLoader from "@/components/theme/theme-loader";
import { CurrentUserProvider } from "@/contexts/current-user";
import { ThemeProvider } from "@/contexts/theme";
import { Theme } from "@/types/theme";
import { User } from "@/types/user";
import buildClient from "@/utils/build-client";

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  const client = buildClient(Object.fromEntries(headers().entries()));
  const {
    data: { currentUser },
  } = await client.get<{ currentUser: User }>(`/api/users/currentuser`);

  return (
    <html lang="en" suppressHydrationWarning={true} className="overflow-auto">
      <head>
        <ThemeLoader defaultTheme={Theme.LIGHT} />
      </head>
      <body>
        <CurrentUserProvider currentUser={currentUser}>
          <ThemeProvider>
            <NavBar />
            {children}
            {modal}
          </ThemeProvider>
        </CurrentUserProvider>
      </body>
    </html>
  );
}
