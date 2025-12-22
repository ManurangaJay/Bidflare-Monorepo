import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import StoreProvider from "@/redux/StoreProvider";
import NotificationListener from "@/components/NotificationListener";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bidflare",
  description: "Bidflare - Online Bidding Platform",
  icons: {
    icon: "/Small_Logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider>
            <NotificationListener />
            {children}
            <Toaster richColors position="bottom-right" />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
