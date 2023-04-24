import FeaturesZigZag from "@/components/Landing_Page_partials/FeaturesZigZag";
import HeroHome from "@/components/Landing_Page_partials/HeroHome";
import LandingPageDevelopers from "@/utils/landing_page_developers";
import React from "react";

const [feature1, feature2, feature3, dev1, dev2, dev3] = LandingPageDevelopers;

function LandingPage() {


    return (
        <div className="overflow-x-hidden">
            <div className="flex flex-col min-h-screen overflow-x-hidden ">

                <main className="grow">
                    <HeroHome />
                    <FeaturesZigZag  />
                </main>
            </div>
        </div>
    );
}

export default LandingPage;
