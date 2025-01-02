import { Head, Img, Body, Container, Tailwind } from '@react-email/components';
import * as React from 'react';
import { socialLinks } from './links';
import SocialIcon from './socialIcon';

export default function Email() {
    const currentYear = new Date().getFullYear();

    return (
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            grey: '#252020',
                            white: '#F3F3EB',
                            trueWhite: '#FFFFFF',
                            orange: '#E1652B',
                            yellow: '#FCC018',
                            purple: '#7E7FE7',
                        },
                        backgroundImage: {
                            bg: "url('https://csclub.org.au/images/email/bg.png')",
                        },
                        fontFamily: {
                            sans: ['Arial', 'sans-serif'],
                        },
                    },
                },
            }}
        >
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="color-scheme" content="light dark" />
                <meta name="supported-color-schemes" content="light dark" />
                <title>CS Club</title>
            </Head>
            <Body className="m-0 mt-8 bg-white p-0 font-sans text-black dark:bg-grey">
                <Container className="bg-white dark:bg-grey">
                    {/* Header */}
                    <div className="bg-white p-2.5 text-center dark:bg-grey">
                        <table className="w-full border-collapse">
                            <tr>
                                <td className="text-center">
                                    <picture>
                                        <source
                                            srcSet="https://csclub.org.au/images/email/dark/logo.png"
                                            media="(prefers-color-scheme: dark)"
                                        />
                                        <Img
                                            className="inline-block max-h-[60px]"
                                            src="https://csclub.org.au/images/email/light/logo.png"
                                            alt="CS Club"
                                        />
                                    </picture>
                                </td>
                            </tr>
                        </table>
                    </div>

                    {/* Email Content */}
                    <div className="mx-10 my-2">
                        <table className="w-full border-spacing-0">
                            <tr className="h-[0.3935rem] w-2">
                                <td className="border-trueWhite border-0 border-l-[3px] border-t-[3px] border-solid bg-grey dark:border-black dark:bg-white"></td>
                                <td className="border-trueWhite border-0 border-r-[3px] border-t-[3px] border-solid bg-grey dark:border-black dark:bg-white"></td>
                                <td className="h-[0.3rem] w-[0.3rem]"></td>
                            </tr>
                            <tr>
                                <td className="border-trueWhite h-[0.3rem] w-[0.3rem] border-0 border-b-[3px] border-l-[3px] border-solid bg-grey dark:border-black dark:bg-white"></td>
                                <td className="border-trueWhite border-0 border-b-[3px] border-r-[3px] border-solid bg-grey p-5 dark:border-black dark:bg-white">
                                    <p className="text-white dark:text-black">Test</p>
                                </td>
                                <td className="h-[0.3rem] w-[0.3rem] bg-purple"></td>
                            </tr>
                            <tr className="h-[0.3935rem] w-2">
                                <td></td>
                                <td className="bg-purple"></td>
                                <td className="bg-purple"></td>
                            </tr>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="bg-white px-5 text-center dark:bg-grey">
                        <div>
                            <table className="mx-auto border-collapse border-spacing-0">
                                <tr>
                                    {socialLinks.slice(0, 4).map((link, index) => (
                                        <SocialIcon
                                            key={index}
                                            href={link.href}
                                            alt={link.alt}
                                            lightSrc={link.lightSrc}
                                            darkSrc={link.darkSrc}
                                            ariaLabel={link.ariaLabel}
                                        />
                                    ))}
                                </tr>

                                <tr className="h-4"></tr>

                                <tr>
                                    {socialLinks.slice(4).map((link, index) => (
                                        <SocialIcon
                                            key={index}
                                            href={link.href}
                                            alt={link.alt}
                                            lightSrc={link.lightSrc}
                                            darkSrc={link.darkSrc}
                                            ariaLabel={link.ariaLabel}
                                        />
                                    ))}
                                </tr>
                            </table>
                        </div>
                        <p className="text-center text-sm text-black dark:text-white">
                            © {currentYear} The University of Adelaide Computer Science Club.
                        </p>
                    </div>
                </Container>
            </Body>
        </Tailwind>
    );
}
