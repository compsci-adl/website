import {
    FaDiscord,
    FaEnvelope,
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";

export const LINKS = [
    { name: "Email", link: "mailto:contact@csclub.org.au", icon: FaEnvelope },
    { name: "GitHub", link: "https://github.com/compsci-adl", icon: FaGithub },
    {
        name: "Instagram",
        link: "https://www.instagram.com/csclub.adl/",
        icon: FaInstagram,
    },
    {
        name: "Facebook",
        link: "https://www.facebook.com/compsci.adl/",
        icon: FaFacebook,
    },
    { name: "Discord", link: "https://discord.gg/UjvVxHA", icon: FaDiscord },
    {
        name: "LinkedIn",
        link: "https://www.linkedin.com/company/compsci-adl/",
        icon: FaLinkedin,
    },
] as const;
