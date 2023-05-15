import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://unpkg.com/web-streams-polyfill/dist/polyfill.es2018.js"
          defer
        ></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
