import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { CartProvider } from "@/components/cart/CartProvider";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const garamond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Skin Evidance — Evidence-Led Skincare",
  description:
    "Dermatologist-tested skincare and beauty-tech devices from Skin Evidance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${garamond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <CartProvider>
          <AnnouncementBar />
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
