import { LINKS } from '@/data/links';
import Link from './Link';

export default function Footer() {
    return (
        <footer className="relative z-20 pt-8 md:pt-12">
            <div className="relative bottom-4 border-t-2 border-white flex flex-col md:flex-row md:justify-between md:items-center transition-all duration-500 mx-8 md:mx-20 lg:mx-32 py-4 md:pb-8 w-responsive">
                <div className="order-2 md:order-1 text-center md:text-left mb-4 md:mb-0 text-white">
                    <p>&copy; 2024 The University of Adelaide Computer Science Club.</p>
                </div>
                {/* Social Media Links */}
                <div className="order-1 md:order-2 flex justify-center md:justify-end space-x-4 mb-4 md:mb-0 text-black">
                    {LINKS.map((link, i) => (
                        <Link {...link} colour="yellow" iconClassName="text-2xl" key={i} />
                    ))}
                </div>
            </div>
        </footer>
    );
}
