import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import Preloader from "./components/Preloader";
import PageHeader from "./components/PageHeader";
import Footer from "./components/Footer";
import Head from "next/head";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "Setorix",
  description: "",
};

const benzin = localFont({
  src: [
    {
      path: "./fonts/benzin-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/benzin-semibold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T7XTQP62');
            `,
          }}
        />
      </Head>
      <body className={manrope.className}>
      
      <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T7XTQP62"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        <GoogleAnalytics gaId="G-THQCGLWPS3" />
        <Preloader />
        <PageHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
