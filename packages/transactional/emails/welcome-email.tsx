import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface WelcomeEmailProps {
    userFirstname: string;
    onedriveLink: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '';

export const WelcomeEmail = ({ userFirstname, onedriveLink }: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>Welcome to CS Club!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`${baseUrl}/static/images/logo.png`}
                    width="170"
                    height="50"
                    alt="CS Club Logo"
                    style={logo}
                />
                <Heading>Welcome to CS Club!</Heading>
                <Text style={paragraph}>Hi {userFirstname},</Text>
                <Text style={paragraph}>
                    Welcome to The University of Adelaide Computer Science Club! We are excited to
                    have you here.
                </Text>
                <Heading as="h3">Just Some Housekeeping</Heading>
                <Text style={paragraph}>
                    We host events all year round where you can connect with other like-minded
                    students, develop your skills and network with industry professionals. As a
                    member, you'll enjoy free entry to all our events. Bring a friend along, but
                    keep in mind the $5 entry for non-members!
                </Text>
                <Text style={paragraph}>
                    The best way to keep up to date with what's happening around the club is by
                    checking our Discord server and social media accounts.
                </Text>
                <Text style={paragraph}>
                    If you haven't seen a committee member about your sign-up yet, please pop in to
                    the Duck Lounge (Engineering and Maths, EM110) to get your cool ducky ID sticker
                    & verify your membership payment.
                </Text>
                <Heading as="h3">The Fun Stuff</Heading>
                <Text style={paragraph}>
                    Always posted on Discord and Facebook! Weekly Games Night, every Friday in the
                    Duck Lounge! Last Friday of each month is a BIG one with food and drinks!
                </Text>
                <Heading as="h4" style={duck_lounge}>
                    Where is the Duck Lounge you say?
                </Heading>
                <Text style={paragraph}>
                    Our student lounge is in the Engineering and Maths building, room 110 (EM110).
                    There's casual tutoring and socialising happening here all the time, so swing
                    past and say hi!
                </Text>
                <Text style={paragraph}>If you get lost, here's what it looks like</Text>
                <Img src={`${baseUrl}/static/door.png`} alt="door" width="500" height="500" />

                <Hr style={hr} />

                <Heading as="h3">
                    Get Started by Accessing Our OneDrive Folder with Important Resources and Course
                    Materials
                </Heading>
                <Text style={paragraph}>
                    We have a OneDrive folder that contains important resources and course materials
                    that you may find useful. Click the button below to access the folder.
                </Text>

                <Section style={btnContainer}>
                    <Button style={button} href={onedriveLink}>
                        OneDrive
                    </Button>
                </Section>
                <Heading as="h3">Contact Us</Heading>
                <Text style={paragraph}>
                    If you have any questions, feel free to reach out to us at{' '}
                    <a href="mailto:">our email</a>
                </Text>
                <Text style={paragraph}>
                    Best,
                    <br />
                    The CS Club team
                </Text>
            </Container>

            <Section
                align="center"
                style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
                <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Column style={{ paddingRight: '20px', fontSize: '32px' }}>
                        <a href="https://discord.gg/UjvVxHA">
                            <FaDiscord />
                        </a>
                    </Column>
                    <Column style={{ paddingRight: '20px', fontSize: '32px' }}>
                        <a href="https://www.facebook.com/compsci.adl/">
                            <FaFacebook />
                        </a>
                    </Column>
                    <Column style={{ paddingRight: '20px', fontSize: '32px' }}>
                        <a href="https://github.com/compsci-adl">
                            <FaGithub />
                        </a>
                    </Column>
                    <Column style={{ paddingRight: '20px', fontSize: '32px' }}>
                        <a href="https://www.instagram.com/csclub.adl/">
                            <FaInstagram />
                        </a>
                    </Column>
                    <Column style={{ paddingRight: '20px', fontSize: '32px' }}>
                        <a href="https://www.linkedin.com/company/compsci-adl/">
                            <FaLinkedin />
                        </a>
                    </Column>
                </Row>
            </Section>
        </Body>
    </Html>
);

WelcomeEmail.PreviewProps = {
    userFirstname: 'Alan',
    onedriveLink: 'https://1drv.ms/u/s!AgmeLCmZiQzNiibukKYzQPz-Aiw8?e=mL5whP',
} as WelcomeEmailProps;

export default WelcomeEmail;

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
};

const logo = {
    margin: '0 auto',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
};

const btnContainer = {
    textAlign: 'center' as const,
};

const button = {
    backgroundColor: '#FCC018',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px',
};

const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
};

const duck_lounge = {
    fontStyle: 'italic',
};
