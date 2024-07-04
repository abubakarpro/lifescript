"use client";
import { Inter } from "next/font/google";
import Head from "next/head";

// import WProofreaderSDK from "@webspellchecker/wproofreader-sdk-js";
import Script from "next/script";
import HomePage from './home';

const inter = Inter({ subsets: ["latin"] });
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: 'Easily Create or Gift a Personal Autobiography Book - LifeScript',
    default: 'LifeScript',
  },
  description: 'Turn your stories into a beautiful hardcover book to preserve memories and connect with family or gift this unparalleled experience to your mom, dad, or grandparent.',
  metadataBase: new URL('https://thelifescript.com/'),
};


export default function Home() {
  return (
    <>
      {/* Google Analytics Code */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-RGM8D41H5K"
      />

      <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-RGM8D41H5K');
          `}
      </Script>

      {/* <FeaturesPage /> */}
      <HomePage />

      {/* <AuthPage /> */}
      {/* <BlogPage /> */}
      {/* <BlogDetailPage /> */}
      {/* <GiftingPage /> */}
    </>
  );
}
