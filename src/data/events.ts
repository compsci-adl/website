import type { Image } from '@/components/ImageCarousel';

type Month =
    | 'JAN'
    | 'FEB'
    | 'MAR'
    | 'APR'
    | 'MAY'
    | 'JUN'
    | 'JUL'
    | 'AUG'
    | 'SEP'
    | 'OCT'
    | 'NOV'
    | 'DEC';
export type Event = {
    title: string;
    date: { year: number; month: Month; day: number; endTime: string };
    time: string;
    location: string;
    details: string;
    url?: { href: URL; text?: string };
    image: string;
};

export const EVENTS: Event[] = [
    {
        title: 'Meet and Greet',
        date: { year: 2024, month: 'MAR', day: 1, endTime: '21:00' },
        time: '5:00pm - 9:00pm',
        location: 'Engineering and Maths EM105',
        details:
            "Come hang out and meet the Computer Science Club's committee and members in your first week of the new academic year!\nWe have board games in collaboration with the GAMES Club and our club owned Nintendo Switch.\nFood and drinks will also be provided.",
        image: 'meet-and-greet.jpg',
    },
    {
        title: 'Insight Into Industry',
        date: { year: 2024, month: 'MAR', day: 6, endTime: '21:00' },
        time: '6:00pm - 9:00pm',
        location: 'Ingkarni Wardli 715',
        details:
            'Unsure of what jobs are available in the tech industry? Or looking to find out more about where your expertise could take you? If so, come along and gain insights into what a career in the industry might look like.',
        image: 'insight-into-industry.jpg',
    },
    {
        title: 'Quiz Night',
        date: { year: 2024, month: 'MAR', day: 8, endTime: '21:00' },
        time: '6:00pm - 9:00pm',
        location: 'Ingkarni Wardli 218',
        details: 'Join us for a night of quizzical encounters! Free food and prizes to come!',
        image: 'quiz-night.jpg',
    },
    {
        title: 'Industry Night',
        date: { year: 2024, month: 'APR', day: 2, endTime: '21:00' },
        time: '6:00pm - 9:00pm',
        location: 'The National Wine Centre, Hickinbotham Hall',
        details: 'Connect with top companies and explore job opportunities in the tech industry!',
        url: {
            href: new URL('https://events.humanitix.com/computer-science-club-industry-night'),
            text: 'Sign up here!',
        },
        image: 'industry-night.jpg',
    },
    {
        title: 'LaTeX Workshop',
        date: { year: 2024, month: 'APR', day: 24, endTime: '19:00' },
        time: '5:00pm - 7:00pm',
        location: 'Ingkarni Wardli 218',
        details:
            'Do you want to create pretty documents? Is Word destroying your assignments when you move images around? Look no further than LaTeX, the academic typesetting tool created by the great Donald Knuth, and the solution to all your maths assignments.',
        image: 'latex-workshop.jpg',
    },
    {
        title: 'Duck Duck Booze: Pub Crawl',
        date: { year: 2024, month: 'MAY', day: 10, endTime: '23:00' },
        time: '5:30pm - 11:00pm',
        location: 'UniBar Adelaide and various bars in Adelaide',
        details:
            'Join us for a night of hopping from one watering hole to the next, spreading good vibes and great drinks all around.',
        image: 'pub-crawl.png',
    },
    {
        title: 'Meet and Greet',
        date: { year: 2024, month: 'JUL', day: 26, endTime: '21:00' },
        time: '5:00pm - 9:00pm',
        location: 'Engineering and Maths EM110 & EM105',
        details:
            "Ready to launch into the semester with a blast? Join us at our Meet & Greet! Whether you're new or missed us at O'Week, this event is for you! Get ready for Friday Night Games, free food and drinks, and you'll get to meet our committee and fellow members! Don't miss out!",
        image: 'meet-and-greet-s2.png',
    },
    {
        title: 'Intro to Git and GitHub Workshop',
        date: { year: 2024, month: 'JUL', day: 31, endTime: '20:00' },
        time: '6:00pm - 8:00pm',
        location: 'Ingkarni Wardli 218 CAT Suite',
        details:
            'Learn the basics of version control, deal with annoying merge conflicts, and integrate these tools with Visual Studio Code. Learn more about our Open Source Team and see how they collaborate using these tools on their projects. Perfect for beginners and those looking to enhance their development skills or join the Open Source Team!',
        image: 'git-and-github-workshop.png',
    },
];

export const CAROUSEL_IMAGES: Image[] = [
    {
        src: '/images/home/duck-ctf.jpg',
        alt: 'DuckCTF 2023',
    },
    {
        src: '/images/home/pizza.jpg',
        alt: 'Pizza at the 2023 Meet and Greet',
    },
    {
        src: '/images/home/cyber-panel.jpg',
        alt: 'Cyber Panel 2023',
    },
];
