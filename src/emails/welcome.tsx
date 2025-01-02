import { Html, Head, Img, Body, Container } from '@react-email/components';
import * as React from 'react';

export default function Email() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="color-scheme" content="light dark" />
                <meta name="supported-color-schemes" content="light dark" />
                <title>CS Club</title>
                <link
                    href="http://fonts.googleapis.com/css?family=Archivo"
                    rel="stylesheet"
                    type="text/css"
                />
            </Head>
            <Body className="m-0 bg-[#f3f3eb] p-0 font-sans text-black">
                <Container className="bg-[#f3f3eb]">
                    {/* Header Section */}
                    <div className="bg-[#f3f3eb] p-2.5 text-center">
                        <table className="w-full border-collapse">
                            <tr>
                                <td className="text-center">
                                    <Img
                                        className="inline-block max-h-[60px]"
                                        src="images/light/cs-club.png"
                                        alt="CS Club"
                                    />
                                    <Img
                                        className="inline-block max-h-[60px]"
                                        src="images/dark/cs-club.png"
                                        alt="CS Club"
                                    />
                                </td>
                            </tr>
                        </table>
                    </div>

                    {/* Email Content Section */}
                    <div className="mx-10 my-2">
                        <table className="w-full">
                            <tr>
                                <td className="bg-[#f3f3eb]"></td>
                                <td className="bg-[#f3f3eb]"></td>
                                <td className="bg-[#7e7fe7]"></td>
                            </tr>
                            <tr>
                                <td className="bg-[#f3f3eb]"></td>
                                <td className="bg-[#252020] p-5">
                                    <p className="text-white">Test</p>
                                </td>
                                <td className="bg-[#252020]"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="bg-[#252020]"></td>
                                <td className="bg-[#252020]"></td>
                            </tr>
                        </table>
                    </div>

                    {/* Footer Section */}
                    <div className="bg-[#f3f3eb] p-5 text-center">
                        <div className="text-center">
                            <table className="mx-auto table-fixed">
                                <tr>
                                    <td>
                                        <a
                                            href="https://csclub.org.au"
                                            aria-label="Website"
                                            className="inline-block p-2"
                                        >
                                            <Img
                                                className="h-6 w-6"
                                                src="images/light/website.png"
                                                alt="Website"
                                            />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href="https://github.com/compsci-adl"
                                            aria-label="GitHub"
                                            className="inline-block p-2"
                                        >
                                            <Img
                                                className="h-6 w-6"
                                                src="images/light/github.png"
                                                alt="GitHub"
                                            />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href="https://www.instagram.com/csclub.adl"
                                            aria-label="Instagram"
                                            className="inline-block p-2"
                                        >
                                            <Img
                                                className="h-6 w-6"
                                                src="images/light/instagram.png"
                                                alt="Instagram"
                                            />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href="https://www.tiktok.com/@csclub.adl"
                                            aria-label="TikTok"
                                            className="inline-block p-2"
                                        >
                                            <Img
                                                className="h-6 w-6"
                                                src="images/light/tiktok.png"
                                                alt="TikTok"
                                            />
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <p className="text-sm text-black">
                            © 2025 The University of Adelaide Computer Science Club.
                        </p>
                    </div>
                </Container>
            </Body>
        </Html>
    );
}
