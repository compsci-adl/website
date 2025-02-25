import { Img, Container } from '@react-email/components';
import * as React from 'react';

export interface BodyProps {
    firstName: string;
}

export default function EmailBody({ firstName }: BodyProps) {
    return (
        <Container>
            <picture>
                <source
                    srcSet="https://csclub.org.au/images/email/light/welcome.png"
                    media="(prefers-color-scheme: dark)"
                />
                <Img
                    className="light w-full sm:w-screen sm:max-w-[30rem] md:max-w-[40rem] lg:max-w-[50rem] xl:max-w-[50rem]"
                    src="https://csclub.org.au/images/email/dark/welcome.png"
                    alt="Welcome to the CS Club!"
                />
                <Img
                    className="dark w-full sm:w-screen sm:max-w-[30rem] md:max-w-[40rem] lg:max-w-[50rem] xl:max-w-[50rem]"
                    src="https://csclub.org.au/images/email/light/welcome.png"
                    alt="Welcome to the CS Club!"
                />
            </picture>
            <table className="w-full pr-4 text-grey md:pr-8 dark:text-white">
                <tr>
                    <td className="w-1">
                        <h2>{'>'}</h2>
                    </td>
                    <td>
                        <h2>{`Welcome, ${firstName}!`}</h2>
                        <div className="border-t-0.5 dynamicBorder h-0.5 w-full border-x-0 border-b-0 border-solid"></div>
                    </td>
                </tr>
            </table>
            <div className="ml-[1.3rem] mr-5 text-grey dark:text-white">
                <p>
                    We host events all year round where you can connect with other like-minded
                    students, develop your skills and network with industry professionals. As a
                    member you’ll enjoy <strong>free or discounted entry</strong> to most of our
                    events. Some larger events, such as Industry Night, may have additional costs.
                    Bring a friend along, but keep in mind the $5 entry for non-members for most
                    events!
                </p>
                <p>
                    The best way to keep up to date on what’s happening in our club is through our
                    Discord server, social media accounts, and our&nbsp;
                    <a href="https://csclub.org.au" className="font-bold text-orange underline">
                        website
                    </a>
                    ! If you haven’t seen a&nbsp;
                    <a
                        href="https://csclub.org.au/about#committee"
                        className="font-bold text-purple underline"
                    >
                        committee member
                    </a>
                    &nbsp;about your sign-up yet, please pop in to the Duck Lounge (Engineering and
                    Maths EM110) to get your cool ducky sticker for your uni ID card & verify your
                    membership payment!.
                </p>
                <p>And of course, we hope to see you at our events and meet you very soon!</p>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <table className="w-full border-spacing-0 pr-4 text-grey md:pr-8 dark:text-white">
                        <tr>
                            <td className="w-1">
                                <h2>{'>'}</h2>
                            </td>
                            <td className="md:pr-8">
                                <h2 className="ml-[0.2rem] text-grey dark:text-white">
                                    Where is the Duck Lounge?
                                </h2>
                                <div className="border-t-0.5 dynamicBorder ml-[0.2rem] h-0.5 border-x-0 border-b-0 border-solid"></div>
                            </td>
                        </tr>
                        <tr>
                            <td className="pl-5 text-grey md:pr-6 dark:text-white" colSpan={2}>
                                <p>
                                    What is the Duck Lounge? Where is the Duck Lounge? Who is the
                                    Duck Lounge? More truer questions have never been asked. Our CS
                                    Club has it’s very own
                                    <strong>student lounge</strong> in the Engineering and Maths
                                    Building in room 110 (EM110).
                                </p>
                                <p>
                                    There’s socialising, gaming, and of course if you have any
                                    questions with CS-related subjects, you’re bound to find someone
                                    who can help you!&nbsp;
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
                        <tr className="w-full md:hidden">
                            <td className="my-auto mr-3 w-full pl-5" colSpan={2}>
                                <table className="w-full border-spacing-0">
                                    <tr>
                                        <td
                                            className="border-t-0.5 dynamicBorder w-full border-[3px] border-solid p-0"
                                            rowSpan={2}
                                            colSpan={2}
                                        >
                                            <Img
                                                className="w-full"
                                                src="https://csclub.org.au/images/email/dl.png"
                                                alt="Duck Lounge"
                                            />
                                        </td>
                                        <td className="h-2"></td>
                                    </tr>
                                    <tr>
                                        <td className="bg-purple pl-0 pr-[8px]"></td>
                                        <td></td>
                                    </tr>
                                </table>
                                <table className="w-full border-spacing-0">
                                    <tr>
                                        <td className="h-[8px] w-2 p-0"></td>
                                        <td className="mr-1 bg-purple" colSpan={2}></td>
                                        <td className="w-[0.01rem]"></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className="my-auto ml-5 mr-4 hidden md:ml-0 md:inline md:w-1/2">
                    <table className="w-full border-spacing-0">
                        <tr>
                            <td
                                className="border-t-0.5 dynamicBorder w-full border-[3px] border-solid p-0"
                                rowSpan={2}
                                colSpan={2}
                            >
                                <Img
                                    className="w-full"
                                    src="https://csclub.org.au/images/email/dl.png"
                                    alt="Duck Lounge"
                                />
                            </td>
                            <td className="h-2"></td>
                        </tr>
                        <tr>
                            <td className="bg-purple pl-0 pr-[8px]"></td>
                            <td></td>
                        </tr>
                    </table>
                    <table className="w-full border-spacing-0">
                        <tr>
                            <td className="h-[8px] w-2 p-0"></td>
                            <td className="mr-1 bg-purple" colSpan={2}></td>
                            <td className="w-[0.01rem]"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className="border-t-0.5 dynamicBorder mx-auto my-8 h-0.5 w-1/4 border-x-0 border-b-0 border-solid"></div>
            <table className="w-full text-grey dark:text-white" style={{ borderSpacing: '1rem' }}>
                <tr>
                    <td className="border-t-0.5 dynamicBorder w-1/2 border-[3px] border-solid">
                        <table className="box-border-4 w-full">
                            <tr>
                                <h2 className="text-center">{'+  Upcoming Events  +'}</h2>
                            </tr>
                            <tr>
                                <p className="mx-6 pb-2">
                                    We hold <strong>Weekly Games Nights</strong> every&nbsp;
                                    <strong>Friday</strong> in the Duck lounge! Our other events are
                                    always posted on our social media and in our Discord server, so
                                    be sure to be on a lookout for those announcements!
                                </p>
                            </tr>
                        </table>
                    </td>
                    <td className="border-t-0.5 dynamicBorder hidden w-1/2 border-[3px] border-solid md:table-cell">
                        <table className="box-border-4 w-full">
                            <tr>
                                <h2 className="text-center">{'+  Club OneDrive  +'}</h2>
                            </tr>
                            <tr>
                                <p className="mx-6 pb-2">
                                    Our Club OneDrive consists of past exams, notes and other
                                    materials with Computer Science related subjects to help you fly
                                    through exams! Log into our&nbsp;
                                    <a
                                        href="https://csclub.org.au"
                                        className="font-bold text-orange underline"
                                    >
                                        website
                                    </a>
                                    &nbsp;to access or&nbsp;
                                    <a
                                        href={process.env.NEXT_PUBLIC_DRIVE_LINK}
                                        className="font-bold text-purple underline"
                                    >
                                        click this link!
                                    </a>
                                </p>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr className="md:hidden">
                    <td className="border-t-0.5 dynamicBorder w-1/2 border-[3px] border-solid">
                        <table className="box-border-4 w-full">
                            <tr>
                                <h2 className="text-center">{'+  Club OneDrive  +'}</h2>
                            </tr>
                            <tr>
                                <p className="mx-6 pb-2">
                                    Our Club OneDrive consists of past exams, notes and other
                                    materials with Computer Science related subjects to help you fly
                                    through exams! Log into our&nbsp;
                                    <a
                                        href="https://csclub.org.au"
                                        className="font-bold text-orange underline"
                                    >
                                        website
                                    </a>
                                    &nbsp;to access or&nbsp;
                                    <a
                                        href="https://csclub.org.au"
                                        className="font-bold text-purple underline"
                                    >
                                        click this link!
                                    </a>
                                </p>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>

            <div className="mb-4 text-center text-grey dark:text-white">
                <h2>Contacts</h2>
                <div className="border-t-0.5 dynamicBorder mx-auto mb-6 h-0.5 w-1/3 border-x-0 border-b-0 border-solid"></div>
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
                <a href="mailto:contact@csclub.org.au">
                    <button className="border-t-0.5 dynamicBorder mt-2 rounded-2xl border-[3px] border-solid bg-yellow px-10 py-2 text-base font-bold text-grey">
                        Send an email!
                    </button>
                </a>
            </div>
        </Container>
    );
}
