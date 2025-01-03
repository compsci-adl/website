import {
    Head,
    Html,
    Img,
    Body,
    Container,
    Tailwind,
    Section,
    Row,
    Column,
} from '@react-email/components';
import * as React from 'react';
import EmailBody from './body';
import { socialLinks } from './links';
import SocialIcon from './socialIcon';

export interface EmailProps {
    firstName: string;
}

export default function Email({ firstName }: EmailProps) {
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
            <Html>
                <Head>
                    <style>
                        {`
  /* Standard root color scheme declaration */
  :root {
    color-scheme: light dark;
  }

  /* Media query for dark mode */
  .light {
      display: inline !important; /* Ensure it's hidden in dark mode */
    }
    .dark {
      display: none !important; /* Ensure dark logo is shown in dark mode */
    }
      .dynamicBorder{
      border-color: #252020;
      }

  @media (prefers-color-scheme: dark) {
    .light {
      display: none !important; /* Ensure it's hidden in dark mode */
    }
    .dark {
      display: inline !important; /* Ensure dark logo is shown in dark mode */
    }
      .dynamicBorder{
      border-color: #F3F3EB;
      }
  }
    `}
                    </style>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="color-scheme" content="light dark" />
                    <meta name="supported-color-schemes" content="light dark" />
                    <title>CS Club</title>
                </Head>
                <Body className="m-0 mt-8 bg-white p-0 font-sans text-black dark:bg-grey">
                    <Container className="bg-white dark:bg-grey">
                        {/* Header */}
                        <Container className="bg-white p-2.5 text-center dark:bg-grey">
                            <Section className="w-full border-collapse">
                                <Row>
                                    <Column className="text-center">
                                        <Img
                                            className="light max-h-[60px]"
                                            src="https://csclub.org.au/images/email/light/logo.png"
                                            alt="CS Club"
                                        />
                                        <Img
                                            className="dark max-h-[60px]"
                                            src="https://csclub.org.au/images/email/dark/logo.png"
                                            alt="CS Club"
                                        />
                                    </Column>
                                </Row>
                            </Section>
                        </Container>

                        {/* Email Content */}
                        <div className="mx-6 mb-8 mt-4 md:mx-10">
                            <table className="w-full border-spacing-0">
                                <tr className="h-[8px] w-[8px] p-0">
                                    <td className="dynamicBorder border-0 border-l-[3px] border-t-[3px] border-solid bg-white dark:bg-grey"></td>
                                    <td className="dynamicBorder border-0 border-r-[3px] border-t-[3px] border-solid bg-white dark:bg-grey"></td>
                                    <td className="block w-[8px] p-0"></td>
                                </tr>
                                <tr>
                                    <td className="dynamicBorder border-0 border-b-[3px] border-l-[3px] border-solid bg-white dark:bg-grey"></td>
                                    <td className="dynamicBorder border-0 border-b-[3px] border-r-[3px] border-solid bg-white p-5 pr-[1.3rem] dark:bg-grey">
                                        <EmailBody firstName={firstName} />
                                    </td>
                                    <td className="bg-purple p-0"></td>
                                </tr>
                                <tr className="h-[8px]">
                                    <td></td>
                                    <td className="bg-purple p-0"></td>
                                    <td className="bg-purple p-0"></td>
                                </tr>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="mb-12 bg-white px-5 text-center dark:bg-grey">
                            <div>
                                <table className="mx-auto hidden border-collapse border-spacing-0 md:table">
                                    <tr>
                                        {socialLinks.map((link, index) => (
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
                                <table className="mx-auto table border-collapse border-spacing-0 md:hidden">
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
            </Html>
        </Tailwind>
    );
}
