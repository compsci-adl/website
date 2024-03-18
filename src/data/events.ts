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
    date: { year: number; month: Month; day: number };
    endTime: string;
    time: string;
    location: string;
    details: string;
    image: string;
};

export const EVENTS: Event[] = [
    {
        title: 'Meet and Greet',
        date: { year: 2024, month: 'MAR', day: 1 },
        endTime: '21:00',
        time: '5:00pm - 9:00pm',
        location: 'Engineering and Maths EM105',
        details:
            "Come hang out and meet the Computer Science Club's committee and members in your first week of the new academic year!\nWe have board games in collaboration with the GAMES Club and our club owned Nintendo Switch.\nFood and drinks will also be provided.",
        image: 'meet-and-greet.jpg',
    },
    {
        title: 'Insight Into Industry',
        date: { year: 2024, month: 'MAR', day: 6 },
        endTime: '21:00',
        time: '6:00pm - 9:00pm',
        location: 'Ingkarni Wardli 715',
        details:
            'Unsure of what jobs are available in the tech industry? Or looking to find out more about where your expertise could take you? If so, come along and gain insights into what a career in the industry might look like.',
        image: 'insight-into-industry.jpg',
    },
    {
        title: 'Quiz Night',
        date: { year: 2024, month: 'MAR', day: 18 },
        endTime: '12:00',
        time: '6:00pm - 9:00pm',
        location: 'Ingkarni Wardli 218',
        details: 'Join us for a night of quizzical encounters! Free food and prizes to come!',
        image: 'quiz-night.jpg',
    },
    {
        title: 'Industry Night',
        date: { year: 2024, month: 'APR', day: 2 },
        endTime: '21:00',
        time: '6:00pm - 9:00pm',
        location: 'The National Wine Centre, Hickinbotham Hall',
        details: 'Connect with top companies and explore job opportunities in the tech industry!',
        image: 'industry-night.jpg',
    },
    {
        title: 'LaTeX Workshop',
        date: { year: 2024, month: 'APR', day: 4 },
        endTime: '19:00',
        time: '5:00pm - 7:00pm',
        location: 'Ingkarni Wardli 218',
        details:
            'Do you want to create pretty documents? Is Word destroying your assignments when you move images around? Look no further than LaTeX, the academic typesetting tool created by the great Donald Knuth, and the solution to all your maths assignments.',
        image: 'latex-workshop.jpg',
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
