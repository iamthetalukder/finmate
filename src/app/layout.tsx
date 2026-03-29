import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinMate - AI Financial Advisor",
  description: "Your personal AI-powered financial tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
