import React from "react";
import "@/styles/base.scss";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import WhySection from "./components/WhySection";
import ContactUs from "./components/ContactUs";

const CACHE_TAG_HOME = "home_data";

export async function generateMetadata() {
  let homeDataMeta;
  const response = await fetch(
    "https://cms.setorix.com/api/globals/home?depth=1&draft=false&locale=undefined",
    {
      cache: "force-cache", // Enable caching
      next: {
        tags: [CACHE_TAG_HOME], // Use the cache tag for revalidation
      },
    }
  );

  homeDataMeta = await response.json();

  console.log(homeDataMeta);

  return {
    title: homeDataMeta.seo.seo_title ? homeDataMeta.seo.seo_title : "Setorix",
    description: homeDataMeta.seo.seo_description
      ? homeDataMeta.seo.seo_description
      : "",
    openGraph: {
      title: homeDataMeta.seo.seo_title
        ? homeDataMeta.seo.seo_title
        : "Setorix",
      description: homeDataMeta.seo.seo_description
        ? homeDataMeta.seo.seo_description
        : "",
      images: homeDataMeta.seo.seo_image
        ? `https://cms.setorix.com/${homeDataMeta.seo.seo_image.url}`
        : "",
    },
  };
}

const LandingPage = async () => {
  let homeData;

  try {
    // Fetch data from the API endpoint
    //const response = await fetch('https://setorix.vercel.app/api/globals/home?depth=1&draft=false&locale=undefined')

    const response = await fetch(
      "https://cms.setorix.com/api/globals/home?depth=1&draft=false&locale=undefined",
      {
        cache: "force-cache", // Enable caching
        next: {
          tags: [CACHE_TAG_HOME], // Use the cache tag for revalidation
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    homeData = await response.json();
    //console.log(homeData);
  } catch (error) {
    console.error("Failed to fetch home data:", error);
    homeData = {
      hero: {
        title: "Error",
        subtitle: "",
        content: "Unable to load content.",
        image: null,
        advantages: [],
      },
      services: {
        title: "",
        subtitle: "",
        ourServices: [],
      },
      why: {
        why_title: "",
        why_subtitle: "",
        why_content: "",
        why_reasones: [],
      },
      contact: {
        contact_title: "",
        contact_subtitle: "",
        contact_link: "",
      },
    };
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection data={homeData.hero} />

      {/* Services Section */}
      <ServicesSection data={homeData.services} />

      {/* Why Us Section */}
      <WhySection data={homeData.why} />

      <ContactUs data={homeData.contact} />
    </div>
  );
};

//export const dynamic = 'force-dynamic' // Disable caching in the App Router

export default LandingPage;
