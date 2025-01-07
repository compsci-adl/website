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
                <tr className="h-[0.3255rem] w-[0.2rem]">
                    <td className="dynamicBorder border-0 border-l-[3px] border-t-[3px] border-solid bg-white dark:bg-grey"></td>
                    <td className="dynamicBorder border-0 border-r-[3px] border-t-[3px] border-solid bg-white dark:bg-grey"></td>
                    <td className="h-[0.3rem] w-[0.2rem]"></td>
                </tr>
                <tr>
                    <td className="dynamicBorder h-[0.3rem] w-[0.1125rem] border-0 border-b-[3px] border-l-[3px] border-solid bg-white dark:bg-grey"></td>
                    <td className="dynamicBorder border-0 border-b-[3px] border-r-[3px] border-solid bg-white p-0 dark:bg-grey">
                        <div className="mx-0 my-auto h-[2.25rem] w-[2.25rem]">
                            <a
                                href={href}
                                aria-label={ariaLabel}
                                className="ml-[0.09rem] box-border inline-block h-[2.25rem] w-[2.25rem] p-1"
                            >
                                <Img
                                    className="light mr-[0.4rem] mt-[0.05rem] h-[1.35rem] w-[1.35rem] object-contain"
                                    src={darkSrc}
                                    alt={alt}
                                />
                                <Img
                                    className="dark mr-[0.4rem] mt-[0.05rem] h-[1.35rem] w-[1.35rem] object-contain"
                                    src={lightSrc}
                                    alt={alt}
                                />
                            </a>
                        </div>
                    </td>
                    <td className="bg-bg h-[0.3rem] w-[0.2rem]"></td>
                </tr>
                <tr className="h-[0.3255rem] w-[0.1125rem]">
                    <td></td>
                    <td className="bg-bg"></td>
                    <td className="bg-bg"></td>
                </tr>
            </table>
        </td>
    );
}

export default SocialIcon;
