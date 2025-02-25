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
import { HtmlConditionalComment } from './HtmlConditionalComment';

export interface EmailProps {
    fullname: string;
    email: string;
    message: string;
}

export default function Email({ fullname, email, message }: EmailProps) {
    const currentYear = new Date().getFullYear();

    interface IconSrcParams {
        type: 'light' | 'dark';
        name: string;
    }

    const getIconSrc = ({ type, name }: IconSrcParams): string => {
        return `https://csclub.org.au/images/email/${type}/${name.toLowerCase()}.png`;
    };

    return (
        <Tailwind
            config={{
                theme: {
                    extend: {
                        colors: {
                            grey: '#252020',
                            white: '#F3F3EB',
                            purple: '#7E7FE7',
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
                                        {/* Modern Email Clients */}
                                        <HtmlConditionalComment comment="!mso">
                                            <Img
                                                className="light max-h-[60px]"
                                                src={getIconSrc({ type: 'light', name: 'logo' })}
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
                                            <div className="h-[12px]"></div>
                                            <span>
                                                <h1 className="inline text-xl text-grey md:text-2xl dark:text-white">
                                                    Contact Us Form Submission
                                                </h1>
                                                {/* Apostrophe is required for the copyright symbol to be displayed properly due to issue with React Email */}
                                                <p className="inline text-white dark:text-grey">
                                                    ’
                                                </p>
                                            </span>
                                            <div className="border-t-0.5 dynamicBorder mt-4 h-0.5 w-full border-x-0 border-b-0 border-solid"></div>
                                            <span className="text-grey dark:text-white">
                                                <p className="text-md md:text-xl">
                                                    <strong>Name</strong>
                                                </p>
                                                <p>{fullname}</p>
                                            </span>
                                            <span className="text-grey dark:text-white">
                                                <p className="text-md md:text-xl">
                                                    <strong>Email</strong>
                                                </p>
                                                <p>{email}</p>
                                            </span>
                                            <span className="text-grey dark:text-white">
                                                <p className="text-md md:text-xl">
                                                    <strong>Message</strong>
                                                </p>
                                                <p>{message}</p>
                                            </span>
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
                                    className="w-full"
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
                                            <table className="w-full border-collapse border-spacing-0">
                                                <tr>
                                                    <td className="h-[15px]"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span>
                                                            <h1 className="md:text-2x inline text-xl text-grey">
                                                                Contact Us Form Submission
                                                            </h1>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="h-[20px]"></td>
                                                </tr>
                                                <tr>
                                                    <td className="dynamicBorder h-[1px] bg-grey"></td>
                                                </tr>
                                                <tr>
                                                    <td className="h-[20px]"></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="text-gre">
                                                            <p className="text-md md:text-xl">
                                                                <strong>Name</strong>
                                                            </p>
                                                            <p>{fullname}</p>
                                                        </span>
                                                        <span className="text-gre">
                                                            <p className="text-md md:text-xl">
                                                                <strong>Email</strong>
                                                            </p>
                                                            <p>{email}</p>
                                                        </span>
                                                        <span className="text-gre">
                                                            <p className="text-md md:text-xl">
                                                                <strong>Message</strong>
                                                            </p>
                                                            <p>{message}</p>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </table>
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
