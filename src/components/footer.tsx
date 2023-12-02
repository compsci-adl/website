import {
    faGithub,
    faInstagram,
    faFacebook,
    faDiscord,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
    return (
        <footer className="bg-background text-white py-4 left-24 right-24 bottom-4 fixed border-t-2 border-white flex justify-between items-center">
            <div className="text-left">
                <p>&copy; 2024 Computer Science Club.</p>
            </div>
            <div className="flex space-x-4">
                <a
                    href="mailto:general@csclub.org.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 p-1.5 bg-orange border-2 border-black text-white"
                >
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
                <a
                    href="https://github.com/compsci-adl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 p-1.5 bg-orange border-2 border-black text-white"
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                    href="https://instagram.com/compsci.adl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 p-1.5 bg-orange border-2 border-black text-white"
                >
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                    href="https://www.facebook.com/compsci.adl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 p-1.5 bg-orange border-2 border-black text-white"
                >
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                    href="https://discord.com/invite/UjvVxHA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 p-1.5 bg-orange border-2 border-black text-white"
                >
                    <FontAwesomeIcon icon={faDiscord} />
                </a>
                <a
                    href="https://www.linkedin.com/company/compsci-adl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 p-1.5 bg-orange border-2 border-black text-white"
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </div>
        </footer>
    );
}
