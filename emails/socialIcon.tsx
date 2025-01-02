import { Img } from '@react-email/components';

type SocialIconProps = {
    href: string;
    alt: string;
    lightSrc: string;
    darkSrc: string;
    ariaLabel: string;
};

function SocialIcon({ href, alt, lightSrc, darkSrc, ariaLabel }: SocialIconProps) {
    return (
        <td className="p-2">
            <table className="border-spacing-0">
                <tr className="h-[0.3935rem] w-[0.3rem]">
                    <td className="border-trueWhite border-0 border-l-[3px] border-t-[3px] border-solid bg-grey dark:border-black dark:bg-white"></td>
                    <td className="border-trueWhite border-0 border-r-[3px] border-t-[3px] border-solid bg-grey dark:border-black dark:bg-white"></td>
                    <td className="h-[0.3rem] w-[0.3rem]"></td>
                </tr>
                <tr>
                    <td className="border-trueWhite h-[0.3rem] w-[0.3rem] border-0 border-b-[3px] border-l-[3px] border-solid bg-grey dark:border-black dark:bg-white"></td>
                    <td className="border-trueWhite border-0 border-b-[3px] border-r-[3px] border-solid bg-grey p-0 dark:border-black dark:bg-white">
                        <div className="mx-0 my-auto h-[2.25rem] w-[2.25rem]">
                            <a
                                href={href}
                                aria-label={ariaLabel}
                                className="box-border inline-block h-[2.25rem] w-[2.25rem] p-1"
                            >
                                <picture>
                                    <source
                                        srcSet={lightSrc}
                                        media="(prefers-color-scheme: light) "
                                    />
                                    <Img
                                        className="mr-[0.3rem] mt-[0.05rem] h-[1.35rem] w-[1.35rem] object-contain"
                                        src={darkSrc}
                                        alt={alt}
                                    />
                                </picture>
                            </a>
                        </div>
                    </td>
                    <td className="bg-bg h-[0.3rem] w-[0.3rem]"></td>
                </tr>
                <tr className="h-[0.3935rem] w-[0.3rem]">
                    <td></td>
                    <td className="bg-bg"></td>
                    <td className="bg-bg"></td>
                </tr>
            </table>
        </td>
    );
}

export default SocialIcon;
