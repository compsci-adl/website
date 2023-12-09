'use client';

import {
    FaEnvelope,
    FaGithub,
    FaInstagram,
    FaFacebook,
    FaDiscord,
    FaLinkedin,
    FaLink,
} from 'react-icons/fa';
import FancyRectangle from '../components/fancyRectangle';

export default function Footer() {
    return (
        <footer className="relative z-20 py-4 bottom-4 border-t-2 border-white flex flex-col md:flex-row md:justify-between md:items-center transition-all duration-500 mx-16 md:mx-24 md:pb-8 mt-96 lg:mt-72">
            <div className="order-2 md:order-1 text-center md:text-left mb-4 md:mb-0 text-white">
                <p>&copy; 2024 Computer Science Club.</p>
            </div>
            {/* Social Media Links */}
            <div className="order-1 md:order-2 flex justify-center md:justify-end space-x-4 mb-4 md:mb-0 text-black">
                <FancyRectangle colour="yellow" offset="4" filled={true}>
                    <a
                        href="mailto:general@csclub.org.au"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 p-1.5 bg-white border-2 border-black"
                        aria-label="Email"
                    >
                        <FaEnvelope className="text-2xl" />
                    </a>
                </FancyRectangle>

                <FancyRectangle colour="yellow" offset="4" filled={true}>
                    <a
                        href="https://github.com/compsci-adl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 p-1.5 bg-white border-2 border-black"
                        aria-label="Github"
                    >
                        <FaGithub className="text-2xl" />
                    </a>
                </FancyRectangle>
                <FancyRectangle colour="yellow" offset="4" filled={true}>
                    <a
                        href="https://instagram.com/compsci.adl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 p-1.5 bg-white border-2 border-black"
                        aria-label="Instagram"
                    >
                        <FaInstagram className="text-2xl" />
                    </a>
                </FancyRectangle>

                <FancyRectangle colour="yellow" offset="4" filled={true}>
                    <a
                        href="https://www.facebook.com/compsci.adl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 p-1.5 bg-white border-2 border-black"
                        aria-label="Facebook"
                    >
                        <FaFacebook className="text-2xl" />
                    </a>
                </FancyRectangle>

                <FancyRectangle colour="yellow" offset="4" filled={true}>
                    <a
                        href="https://discord.com/invite/UjvVxHA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 p-1.5 bg-white border-2 border-black"
                        aria-label="Discord"
                    >
                        <FaDiscord className="text-2xl" />
                    </a>
                </FancyRectangle>

                <FancyRectangle colour="yellow" offset="4" filled={true}>
                    <a
                        href="https://www.linkedin.com/company/compsci-adl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 p-1.5 bg-white border-2 border-black"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin className="text-2xl" />
                    </a>
                </FancyRectangle>
            </div>
        </footer>
    );
}
