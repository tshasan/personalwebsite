// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
import type { Site, SocialMediaObjects } from "./types";

export const SITE: Site = {
    siteUrl: "https:/tshasan.com/", // Always put "/" at the end of the URL
    author: "tshasan",
    desc: "This is Taimur Hasan personal portfolio",
    title: "Hello!",
    ogImage: "images/astro-lane.png",
    keywords:
        "Personal portfolio, landing page, page template, developer portfoliom designer portfolio, Taimur, Taimur Hasan, Hasan",
    postPerPage: 3
};

// The site uses iconify - you can find icons on https://iconify.design/.

export const SOCIALS: SocialMediaObjects = [
    {
        name: "Github",
        href: "https://github.com/tshasan",
        icon: "ph:github-logo-duotone",
        title: `Follow ${SITE.author} on Github`,
        active: true
    },
];
