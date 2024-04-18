"use client";
import { Inter } from "next/font/google";
import Head from "next/head";

// import WProofreaderSDK from "@webspellchecker/wproofreader-sdk-js";
import Script from "next/script";
import HomePage from './home';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      {/* Google Analytics */}
      <Script
        async src="https://www.googletagmanager.com/gtag/js?id=G-RGM8D41H5K"
      />

      <Script id="google-analytics">
        {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
             
               gtag('config', 'G-RGM8D41H5K');
          `}
      </Script>
      {/* Google Ads */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-11454589354"></Script>
      <Script id="google-ads">
        {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-11454589354');`}
      </Script>

      {/* Clarity Analytics */}
      <Script
        id="clarity"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/lpnt5cc9c6";
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "lpnt5cc9c6");
          `,
        }}
      />
      <Head>
        <title>LifeScript</title>
        <meta
          name="facebook-domain-verification"
          content="4juom1wbc7mn3on53shgvpk9p7oyua"
        />
        <meta property="og:title" content="The Lifescript" />
        <meta property="og:site_name" content="The Lifescript" />
        <meta property="og:url" content="https://www.thelifescript.com/" />
        <meta property="og:description" content="Turn your stories into a beautiful hardcover book to preserve memories and connect with family or gift this unparalleled experience to your mom, dad or grandparent" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://github.com/Tayyab-103/JavaScript-103/assets/109760448/26d04d82-e102-4c24-961b-9954303bd1b5" />
      </Head>
      {/* <FeaturesPage /> */}
      <HomePage />
      {/* <AuthPage /> */}
      {/* <BlogPage /> */}
      {/* <BlogDetailPage /> */}
      {/* <GiftingPage /> */}
    </>
  );
}
