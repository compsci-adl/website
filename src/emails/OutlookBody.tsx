import { Img, Container } from '@react-email/components';
import * as React from 'react';

export interface BodyProps {
    firstName: string;
}

export default function OutlookEmailBody({ firstName }: BodyProps) {
    return (
        <Container>
            <Img
                src="https://csclub.org.au/images/email/dark/welcome.png"
                alt="Welcome to the CS Club!"
                width="600"
            />
            <table className="w-full border-collapse border-spacing-0">
                <tr>
                    <td className="w-1">
                        <h2>{'>'}</h2>
                    </td>
                    <td>
                        <h2>{`Welcome, ${firstName}!`}</h2>
                    </td>
                </tr>
                <tr className="h-1">
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="w-1"></td>
                    <td className="dynamicBorder h-[1px] bg-grey"></td>
                </tr>
                <tr className="h-1">
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="w-1"></td>
                    <td>
                        <p>
                            We host events all year round where you can connect with other
                            like-minded students, develop your skills and network with industry
                            professionals. As a member you’ll enjoy&nbsp;
                            <strong>free or discounted entry</strong> to most of our events. Some
                            larger events, such as Industry Night, may have additional costs. Bring
                            a friend along, but keep in mind the $5 entry for non-members for most
                            events!
                        </p>
                        <p>
                            The best way to keep up to date on what’s happening in our club is
                            through our Discord server, social media accounts, and our&nbsp;
                            <a
                                href="https://csclub.org.au"
                                className="font-bold text-orange underline"
                            >
                                website
                            </a>
                            ! If you haven’t seen a&nbsp;
                            <a
                                href="https://csclub.org.au/about#committee"
                                className="font-bold text-purple underline"
                            >
                                committee member
                            </a>
                            &nbsp;about your sign-up yet, please pop in to the Duck Lounge
                            (Engineering and Maths EM110) to get your cool ducky sticker for your
                            uni ID card & verify your membership payment!.
                        </p>
                        <p>
                            And of course, we hope to see you at our events and meet you very soon!
                        </p>
                    </td>
                </tr>
                <tr className="h-4">
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="w-1">
                        <h2>{'>'}</h2>
                    </td>
                    <td className="md:pr-8">
                        <h2>Where is the Duck Lounge?</h2>
                    </td>
                </tr>
                <tr className="h-1">
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="w-1"></td>
                    <td className="dynamicBorder h-[1px] bg-grey"></td>
                </tr>
                <tr className="h-1">
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="w-1"></td>
                    <td colSpan={2}>
                        <p>
                            What is the Duck Lounge? Where is the Duck Lounge? Who is the Duck
                            Lounge? More truer questions have never been asked. Our CS Club has its
                            very own&nbsp;<strong>student lounge</strong> in the Engineering
                            Building in room 110 (EM110).
                        </p>
                        <p>
                            There’s socialising, gaming, and of course if you have any questions
                            with CS-related subjects, you’re bound to find someone who can help
                            you!&nbsp;
                        </p>
                        <p>
                            If you’re having trouble finding the room,&nbsp;
                            <a
                                href="https://studentvip.com.au/adelaide-uni/north-terrace/maps/127019"
                                className="font-bold text-orange underline"
                            >
                                here&apos;s a map!
                            </a>
                        </p>
                    </td>
                </tr>
                <tr className="h-1">
                    <td>&nbsp;</td>
                </tr>
            </table>
            <table className="w-full" cellPadding="0">
                <tr>
                    <td className="w-1"></td>
                    <td className="border-[3px] border-solid border-grey">
                        <Img
                            className="w-full"
                            src="https://csclub.org.au/images/email/dl.png"
                            alt="Duck Lounge"
                            width="600"
                        />
                    </td>
                    <td className="w-1"></td>
                </tr>
            </table>
            <table className="w-full border-collapse border-spacing-0">
                <tr className="h-1">
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="w-1/3"></td>
                    <td className="dynamicBorder h-[1px] w-1/3 bg-grey"></td>
                    <td className="w-1/3"></td>
                </tr>
                <tr className="h-1">
                    <td>&nbsp;</td>
                </tr>
            </table>
            <table className="w-full">
                <tr>
                    <td className="border-t-0.5 dynamicBorder w-1/2 border-[3px] border-solid">
                        <table className="box-border-4 w-full">
                            <tr className="h-[0.05rem]">
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td className="w-8">&nbsp;</td>
                                <h2 className="text-center">{'+  Upcoming Events  +'}</h2>
                                <td className="w-8">&nbsp;</td>
                            </tr>
                            <tr>
                                <td className="w-8">&nbsp;</td>
                                <td className="w-11/12">
                                    <p>
                                        We hold <strong>Weekly Games Nights</strong> every&nbsp;
                                        <strong>Friday</strong> in the Duck lounge! Our other events
                                        are always posted on our social media and in our Discord
                                        server, so be sure to be on a lookout for those
                                        announcements!
                                    </p>
                                </td>
                                <td className="w-8">&nbsp;</td>
                            </tr>
                            <tr className="h-[0.05rem]">
                                <td>&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr className="h-0.5">
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td className="border-t-0.5 dynamicBorder w-1/2 border-[3px] border-solid">
                        <table className="box-border-4 w-full">
                            <tr className="h-[0.05rem]">
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td className="w-8">&nbsp;</td>
                                <h2 className="text-center">{'+  Club OneDrive  +'}</h2>
                                <td className="w-8">&nbsp;</td>
                            </tr>
                            <tr>
                                <td className="w-8">&nbsp;</td>
                                <td className="w-11/12">
                                    <p>
                                        Our Club OneDrive consists of past exams, notes and other
                                        materials with Computer Science related subjects to help you
                                        fly through exams! Log into our&nbsp;
                                        <a
                                            href="https://csclub.org.au"
                                            className="font-bold text-orange underline"
                                        >
                                            website
                                        </a>
                                        &nbsp; to access or&nbsp;
                                        <a
                                            href={process.env.NEXT_PUBLIC_DRIVE_LINK}
                                            className="font-bold text-purple underline"
                                        >
                                            click this link!
                                        </a>
                                    </p>
                                </td>
                                <td className="w-8">&nbsp;</td>
                            </tr>
                            <tr className="h-[0.05rem]">
                                <td>&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

            <div className="mb-4 text-center">
                <h2>Contacts</h2>
                <table className="w-full border-collapse border-spacing-0">
                    <tr>
                        <td className="w-1/3"></td>
                        <td className="dynamicBorder h-[1px] w-1/3 bg-grey"></td>
                        <td className="w-1/3"></td>
                    </tr>
                </table>
                <p>
                    If you need any help, hop on Discord and DM any of the&nbsp;
                    <a
                        href="https://csclub.org.au/about#committee"
                        className="font-bold text-purple underline"
                    >
                        committee
                    </a>
                    &nbsp;members, or...
                </p>
                <a href="mailto:contact@csclub.org.au">Send an email!</a>
            </div>
        </Container>
    );
}
