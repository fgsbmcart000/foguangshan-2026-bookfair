import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false, noimageindex: true },
  title: "佛光山2026年書展暨蔬食博覽會｜吉祥動物派對",
  description: "2026年11月7日至13日，佛光山佛陀紀念館。書展、蔬食、藝術、親子體驗與環境教育，免費開放參觀。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
