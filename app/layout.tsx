import "@styles/globals.css";
import type { Metadata } from "next";
import { Akshar } from "next/font/google";
import { Session } from "next-auth";

import { Nav } from "@components/nav";
import { Provider } from "@components/Provider";

const akshar = Akshar({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "something",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <body
        className={`${akshar.className} bg-black-90 w-full h-full text-off-white`}
      >
        <Provider session={session}>
          <main className="container mx-auto px-8 py-16">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
