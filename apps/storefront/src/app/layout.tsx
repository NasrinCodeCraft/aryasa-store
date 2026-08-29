import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "@fontsource-variable/vazirmatn"
import "styles/globals.css"
import { Vazirmatn } from "next/font/google";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" data-mode="light">
    <body
      className={`${vazirmatn.variable} min-h-full bg-background font-sans text-foreground antialiased`}
    >
    <main className="relative">
      {props.children}
    </main>
    </body>
    </html>
  )
}