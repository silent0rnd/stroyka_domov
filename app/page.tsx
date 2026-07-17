import { BeforeAfter } from "@/components/sections/before-after";
import { Benefits } from "@/components/sections/benefits";
import { Calculator } from "@/components/sections/calculator";
import { Contact } from "@/components/sections/contact";
import { ConstructionRoute } from "@/components/sections/construction-route";
import { Faq } from "@/components/sections/faq";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { MaterialStory } from "@/components/sections/material-story";
import { Projects } from "@/components/sections/projects";
import { Scenarios } from "@/components/sections/scenarios";
import { Transparency } from "@/components/sections/transparency";
import { PageMotion } from "@/components/page-motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <PageMotion>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <Benefits />
        <MaterialStory />
        <Projects />
        <Gallery />
        <ConstructionRoute />
        <Calculator />
        <Scenarios />
        <Transparency />
        <BeforeAfter />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </PageMotion>
  );
}
