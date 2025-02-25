import { Img } from '@react-email/components';

type SocialIconProps = {
    href: string;
    alt: string;
    lightSrc?: string;
    darkSrc: string;
    ariaLabel: string;
};

function SocialIcon({ href, alt, lightSrc, darkSrc, ariaLabel }: SocialIconProps) {
    return (
        <>
            {lightSrc && (
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
            )}
            {!lightSrc && (
                <td style={{ padding: '8px' }}>
                    <table
                        cellPadding="0"
                        cellSpacing="0"
                        style={{ borderCollapse: 'collapse', borderSpacing: '0' }}
                    >
                        <tr>
                            <td
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderTop: '3px solid #252020',
                                    borderLeft: '3px solid #252020',
                                }}
                            ></td>
                            <td
                                style={{
                                    height: '8px',
                                    borderTop: '3px solid #252020',
                                }}
                            ></td>
                            <td
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderTop: '3px solid #252020',
                                    borderRight: '3px solid #252020',
                                }}
                            ></td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    width: '10px',
                                    borderLeft: '3px solid #252020',
                                }}
                            ></td>
                            <td className="h-[24px] w-[24px] text-center">
                                <a href={href} aria-label={ariaLabel} className="inline-block">
                                    <Img src={darkSrc} alt={alt} height="20" />
                                </a>
                            </td>

                            <td
                                style={{
                                    width: '10px',
                                    borderRight: '3px solid #252020',
                                }}
                            ></td>
                        </tr>
                        <tr>
                            <td
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderBottom: '3px solid #252020',
                                    borderLeft: '3px solid #252020',
                                }}
                            ></td>
                            <td
                                style={{
                                    height: '8px',
                                    borderBottom: '3px solid #252020',
                                }}
                            ></td>
                            <td
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderBottom: '3px solid #252020',
                                    borderRight: '3px solid #252020',
                                }}
                            ></td>
                        </tr>
                    </table>
                </td>
            )}
        </>
    );
}

export default SocialIcon;
