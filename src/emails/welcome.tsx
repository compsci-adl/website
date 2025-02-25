import { LINKS } from '@/data/links';
import {
    Img,
    Section,
    Row,
    Column,
    Head,
    Html,
    Body,
    Container,
    Tailwind,
} from '@react-email/components';
import * as React from 'react';
import EmailBody from './Body';
import { HtmlConditionalComment } from './HtmlConditionalComment';
import OutlookEmailBody from './OutlookBody';
import SocialIcon from './SocialIcon';

export interface EmailProps {
    firstName: string;
}

export default function Email({ firstName }: EmailProps) {
    const currentYear = new Date().getFullYear();

    interface IconSrcParams {
        type: 'light' | 'dark';
        name: string;
    }

    const getIconSrc = ({ type, name }: IconSrcParams): string => {
        const lowerCaseName = name.toLowerCase();
        if (type === 'light') {
            return `https://csclub.org.au/images/email/light/${lowerCaseName}.png`;
        } else {
            return `https://csclub.org.au/images/email/dark/${lowerCaseName}.png`;
        }
    };

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
                        <Container className="bg-white dark:bg-grey">
                            {/* Header */}
                            <Container className="bg-white p-2.5 text-center dark:bg-grey">
                                <Section className="w-full border-collapse">
                                    <Row>
                                        <Column className="text-center">
                                            {/* Modern Email Clients */}
                                            <HtmlConditionalComment comment="!mso">
                                                <Img
                                                    className="light max-h-[60px]"
                                                    src={getIconSrc({
                                                        type: 'light',
                                                        name: 'logo',
                                                    })}
                                                    alt="CS Club"
                                                />
                                                <Img
                                                    className="dark max-h-[60px]"
                                                    src={getIconSrc({ type: 'dark', name: 'logo' })}
                                                    alt="CS Club"
                                                />
                                            </HtmlConditionalComment>
                                            {/* Outlook (classic) */}
                                            <HtmlConditionalComment comment="mso" msoOnly>
                                                <Img
                                                    src="https://csclub.org.au/images/email/light/logo.png"
                                                    width="200"
                                                    alt="CS Club"
                                                    className="mx-auto block max-h-[60px]"
                                                />
                                                <p>&nbsp;</p>
                                            </HtmlConditionalComment>
                                        </Column>
                                    </Row>
                                </Section>
                            </Container>

                            {/* Email Content */}
                            <div className="mx-6 mb-8 mt-4 md:mx-10">
                                {/* Modern Email Clients */}
                                <HtmlConditionalComment comment="!mso">
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
                                </HtmlConditionalComment>
                                {/* Outlook (classic) */}
                                <HtmlConditionalComment comment="mso" msoOnly>
                                    <table
                                        cellPadding="10"
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
                                            <td>
                                                <OutlookEmailBody firstName={firstName} />
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
                                </HtmlConditionalComment>
                            </div>

                            {/* Footer */}
                            <div className="mb-12 bg-white px-5 text-center dark:bg-grey">
                                <div>
                                    <table className="mx-auto hidden border-collapse border-spacing-0 md:table">
                                        <tr>
                                            {/* Modern Email Clients */}
                                            <HtmlConditionalComment comment="!mso">
                                                {LINKS.map((link, index) => (
                                                    <SocialIcon
                                                        key={index}
                                                        href={link.link}
                                                        alt={link.name}
                                                        lightSrc={getIconSrc({
                                                            type: 'light',
                                                            name: link.name,
                                                        })}
                                                        darkSrc={getIconSrc({
                                                            type: 'dark',
                                                            name: link.name,
                                                        })}
                                                        ariaLabel={link.name}
                                                    />
                                                ))}
                                            </HtmlConditionalComment>
                                            {/* Outlook (classic) */}
                                            <HtmlConditionalComment comment="mso" msoOnly>
                                                {LINKS.map((link, index) => (
                                                    <SocialIcon
                                                        key={index}
                                                        href={link.link}
                                                        alt={link.name}
                                                        darkSrc={getIconSrc({
                                                            type: 'dark',
                                                            name: link.name,
                                                        })}
                                                        ariaLabel={link.name}
                                                    />
                                                ))}
                                            </HtmlConditionalComment>
                                        </tr>
                                    </table>
                                </div>
                                <p className="text-center text-sm text-black dark:text-white">
                                    © {currentYear} The University of Adelaide Computer Science
                                    Club.
                                </p>
                            </div>
                        </Container>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    );
}
