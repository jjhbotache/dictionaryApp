import "./globals.css"
import type { Metadata } from "next"
import { ReduxProvider } from "@/store/provider"

export const metadata: Metadata = {
  title: "Dictionary App",
  description: "A responsive dictionary app with dark mode and font selection",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/freeDictionary.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
