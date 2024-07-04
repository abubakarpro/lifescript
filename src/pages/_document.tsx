import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>LifeScript</title>

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                                (function(c,l,a,r,i,t,y){
                                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                                })(window, document, "clarity", "script", "lpnt5cc9c6");
                            `,
          }}
        />

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


        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-11454589354"
        ></Script>
        <Script id="google-ads">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-11454589354');`}
        </Script>

        {/* Open Graph Protocol Meta Tags */}
        <meta property="og:title" content="The Lifescript" />
        <meta property="og:site_name" content="The Lifescript" />
        <meta property="og:url" content="https://www.thelifescript.com/" />
        <meta
          property="og:description"
          content="Turn your stories into a beautiful hardcover book to preserve memories and connect with family or gift this unparalleled experience to your mom, dad or grandparent"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://github.com/Tayyab-103/JavaScript-103/assets/109760448/9b9d0b25-965c-4e98-b719-b9fcdcf67311"
        />

        {/* Google Search Console */}
        <meta name="google-site-verification" content="wt1qy_zKsDB3gvsPGfgbQoo0d3yvcUK4tOd9wkwSnJE" />


        <script
          dangerouslySetInnerHTML={{
            __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '389875753839602');
      fbq('track', 'PageView');
    `,
          }}
        />

        {/* tiktok */}

        <script
          dangerouslySetInnerHTML={{
            __html: `
      !function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

  ttq.load('COH1I7RC77U0VOQQGVF0');
  ttq.page();
}(window, document, 'ttq');
    `,
          }}
        />


        {/* Rewardful Script */}
        <Script
          id="Rewardful"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');
            `,
          }}
        />
        <Script async src="https://r.wdfl.co/rw.js" data-rewardful="797851" />
        {/* Schema ORG */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LifeScript",
              "url": "https://www.thelifescript.com",
              "logo": "https://www.thelifescript.com/lifescript-life-story-book-logo.svg",
              "alternateName": "the lifescript",
              "sameAs": [
                "https://www.instagram.com/the.lifescript?igsh=ZWcyY3I1c2pmMzIw&utm_source=qr",
                "https://www.facebook.com/profile.php?id=61554559332668",
                "https://twitter.com/thelifescript",
                "https://www.tiktok.com/@the.lifescript?_t=8lYbtVKetST&_r=1"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "",
                  "contactType": "customer service",
                  "email": "info@thelifescript.com",
                  "availableLanguage": "en"
                }
              ]
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "LifeScript",
              "image": "https://www.thelifescript.com/lifescript-life-story-book-logo.svg",
              "description": "Turn your stories into a beautiful hardcover book to preserve memories and connect with family or gift this unparalleled experience to your mom, dad, or grandparent.",
              "brand": "LifeScript",
              "offers": {
                "@type": "AggregateOffer",
                "url": "https://www.thelifescript.com/pricing",
                "priceCurrency": "USD",
                "lowPrice": "139",
                "highPrice": "239"
              }
            })
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet" />

        {/* Plerdy Script */}
        <script
          type="text/javascript"
          defer
          data-plerdy_code='1'
          dangerouslySetInnerHTML={{
            __html: `
                var _protocol = "https:" == document.location.protocol ? "https://" : "http://";
                _site_hash_code = "ec5ed5a2ee310ca961dd1dff624c8bee", _suid = 50160, plerdyScript = document.createElement("script");
                plerdyScript.setAttribute("defer", ""), plerdyScript.dataset.plerdymainscript = "plerdymainscript",
                plerdyScript.src = "https://a.plerdy.com/public/js/click/main.js?v=" + Math.random();
                var plerdymainscript = document.querySelector("[data-plerdymainscript='plerdymainscript']");
                plerdymainscript && plerdymainscript.parentNode.removeChild(plerdymainscript);
                try { document.head.appendChild(plerdyScript) } catch (t) { console.log(t, "unable add script tag") }
              `,
          }}
        />
        {/* End Plerdy Script */}

      </Head>
      <body style={{ margin: 0 }}>
        <Main />
        <NextScript />

        {/* BEGIN PLERDY A/B TESTING CODE */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: 'var _suid=50160;',
          }}
        />
        <script
          async
          type="text/javascript"
          src="https://a.plerdy.com/public/js/click/plerdy_ab-min.js?v=ff6570f"
        />
        {/* END PLERDY A/B TESTING CODE */}
      </body>
    </Html>
  );
}
