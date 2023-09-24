import "./globals.css";

import { headers } from "next/headers";

import NavBar from "@/components/navbar";
import { CurrentUserProvider } from "@/contexts/current-user";
import { User } from "@/types/user";
import buildClient from "@/utils/build-client";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersObj = Object.fromEntries(headers().entries());

  const client = buildClient(headersObj);

  const {
    data: { currentUser },
  } = await client.get<{ currentUser: User }>(`/api/users/currentuser`);

  return (
    <html lang="en">
      <body>
        <CurrentUserProvider currentUser={currentUser}>
          <header>
            <NavBar />
          </header>
          <main>{children}</main>
        </CurrentUserProvider>
      </body>
    </html>
  );
}
