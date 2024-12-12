import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Admin : Loja Admin ",
  description: "área administrativa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
