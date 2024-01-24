import { LINKS } from '@/data/links';
import Link from './Link';

export default function Footer() {
    return (
        <footer className="relative z-20 pt-8 md:pt-12">
            <div className="relative bottom-4 mx-8 flex flex-col border-t-2 border-white py-4 transition-all duration-500 md:mx-20 md:flex-row md:items-center md:justify-between md:pb-8 lg:mx-32">
                <div className="order-2 mb-4 text-center md:order-1 md:mb-0 md:text-left">
                    <p>&copy; 2024 The University of Adelaide Computer Science Club.</p>
                </div>
                {/* Social Media Links */}
                <div className="order-1 mb-4 flex justify-center space-x-4 text-2xl text-black md:order-2 md:mb-0 md:justify-end">
                    {LINKS.map((link, i) => (
                        <Link {...link} borderColour="yellow" key={i} />
                    ))}
                </div>
            </div>
        </footer>
    );
}
