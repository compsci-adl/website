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
            <Body style={styles.body}>
                <Container style={styles.emailContainer}>
                    <div style={styles.header}>
                        <table style={styles.tableFullWidth}>
                            <tr>
                                <td style={styles.centerAlign}>
                                    <Img
                                        style={styles.logo}
                                        src="images/light/cs-club.png"
                                        alt="CS Club"
                                        className="light"
                                    />
                                    <Img
                                        style={styles.logo}
                                        src="images/dark/cs-club.png"
                                        alt="CS Club"
                                        className="dark"
                                    />
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div style={styles.emailContentContainer}>
                        <table style={styles.contentBg}>
                            <tr>
                                <td style={styles.lightCell}></td>
                                <td style={styles.lightCell}></td>
                                <td style={styles.edge}></td>
                            </tr>
                            <tr>
                                <td style={styles.lightCell}></td>
                                <td style={styles.emailContent}>
                                    <p style={styles.paragraph}>Test</p>
                                </td>
                                <td style={styles.darkCell}></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style={styles.darkCell}></td>
                                <td style={styles.darkCell}></td>
                            </tr>
                        </table>
                    </div>

                    <div style={styles.footer}>
                        <div style={styles.socialIcons}>
                            <table style={styles.iconsTable}>
                                <tr>
                                    <td>
                                        <a
                                            href="https://csclub.org.au"
                                            aria-label="Website"
                                            style={styles.socialLink}
                                        >
                                            <Img
                                                style={styles.icons}
                                                src="images/light/website.png"
                                                alt="Website"
                                            />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href="https://github.com/compsci-adl"
                                            aria-label="GitHub"
                                            style={styles.socialLink}
                                        >
                                            <Img
                                                style={styles.icons}
                                                src="images/light/github.png"
                                                alt="GitHub"
                                            />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href="https://www.instagram.com/csclub.adl"
                                            aria-label="Instagram"
                                            style={styles.socialLink}
                                        >
                                            <Img
                                                style={styles.icons}
                                                src="images/light/instagram.png"
                                                alt="Instagram"
                                            />
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href="https://www.tiktok.com/@csclub.adl"
                                            aria-label="TikTok"
                                            style={styles.socialLink}
                                        >
                                            <Img
                                                style={styles.icons}
                                                src="images/light/tiktok.png"
                                                alt="TikTok"
                                            />
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <p style={styles.footerText}>
                            © 2025 The University of Adelaide Computer Science Club.
                        </p>
                    </div>
                </Container>
            </Body>
        </Html>
    );
}

const styles = {
    body: {
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f3f3eb',
        color: '#000000',
    },
    emailContainer: {
        backgroundColor: '#f3f3eb',
    },
    header: {
        backgroundColor: '#f3f3eb',
        padding: '10px 20px',
        textAlign: 'center',
    },
    emailContentContainer: {
        margin: '10px 10%',
    },
    emailContent: {
        backgroundColor: '#252020',
        padding: '20px',
    },
    footer: {
        backgroundColor: '#f3f3eb',
        padding: '20px 0',
        textAlign: 'center',
    },
    footerText: {
        fontSize: '14px',
        color: '#000000',
    },
    socialIcons: {
        textAlign: 'center',
    },
    iconsTable: {
        margin: '0 auto',
        tableLayout: 'fixed',
    },
    icons: {
        width: '24px',
        height: '24px',
    },
    socialLink: {
        textDecoration: 'none',
        display: 'inline-block',
        padding: '10px',
    },
    paragraph: {
        color: '#FFFFFF',
    },
    lightCell: {
        backgroundColor: '#f3f3eb',
    },
    darkCell: {
        backgroundColor: '#252020',
    },
    edge: {
        backgroundColor: '#7e7fe7',
    },
    logo: {
        maxHeight: '60px',
    },
    tableFullWidth: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    centerAlign: {
        textAlign: 'center',
    },
};
