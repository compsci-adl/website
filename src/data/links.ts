import {
    FaDiscord,
    FaEnvelope,
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaTiktok,
    FaYoutube,
} from 'react-icons/fa';

export const LINKS = [
    { name: 'Email', link: 'mailto:contact@csclub.org.au', icon: FaEnvelope },
    { name: 'GitHub', link: 'https://github.com/compsci-adl', icon: FaGithub },
    { name: 'Instagram', link: 'https://www.instagram.com/csclub.adl/', icon: FaInstagram },
    { name: 'TikTok', link: 'https://www.tiktok.com/@csclub.adl', icon: FaTiktok },
    { name: 'Facebook', link: 'https://www.facebook.com/compsci.adl/', icon: FaFacebook },
    { name: 'Discord', link: 'https://discord.gg/UjvVxHA', icon: FaDiscord },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/company/compsci-adl/', icon: FaLinkedin },
    { name: 'YouTube', link: 'https://www.youtube.com/@csclub-adl', icon: FaYoutube },
] as const;
