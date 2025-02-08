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
        const lowerCaseName = name.toLowerCase();
        return `https://csclub.org.au/images/email/${type}/${lowerCaseName}.png`;
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
    display: inline !important; /* Show light mode by default */
  }
  .dark {
    display: none !important; /* Hide dark mode by default */
  }
  .dynamicBorder {
    border-color: #252020;
  }

  @media (prefers-color-scheme: dark) {
    .light {
      display: none !important; /* Hide light mode */
    }
    .dark {
      display: inline !important; /* Show dark mode */
    }
    .dynamicBorder {
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
                                        {/* Default Light Mode Logo */}
                                        <Img
                                            className="light max-h-[60px]"
                                            src={getIconSrc({ type: 'light', name: 'logo' })}
                                            alt="CS Club"
                                        />
                                        {/* Dark Mode Logo */}
                                        <Img
                                            className="dark max-h-[60px]"
                                            src={getIconSrc({ type: 'dark', name: 'logo' })}
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
                                    <td className="dynamicBorder border-0 border-b-[3px] border-r-[3px] border-solid bg-white p-5 pr-[1.3rem] text-grey dark:bg-grey dark:text-white">
                                        <h1 className="text-xl md:text-2xl">
                                            Contact Us Form Submission
                                        </h1>
                                        <div className="border-t-0.5 dynamicBorder h-0.5 w-full border-x-0 border-b-0 border-solid"></div>
                                        <span>
                                            <p className="text-md md:text-xl">
                                                <strong>Name</strong>
                                            </p>
                                            <p>{fullname}</p>
                                        </span>
                                        <span>
                                            <p className="text-md md:text-xl">
                                                <strong>Email</strong>
                                            </p>
                                            <p>{email}</p>
                                        </span>
                                        <span>
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
