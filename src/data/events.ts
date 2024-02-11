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
type Time = `${number}:${number}${'am' | 'pm'}`;
export type Event = {
    title: string;
    date: { month: Month; day: number };
    time: `${Time} - ${Time}`;
    location: string;
    details: string;
    image: string;
};

export const EVENTS: Event[] = [
    {
        title: 'Game Night',
        date: { month: 'SEP', day: 5 },
        time: '7:00pm - 10:00pm',
        location: 'Student Lounge',
        details: 'Join us for a fun-filled evening of board games and video games!',
        image: 'aaa.jpg',
    },
    {
        title: 'Workshop: Introduction to Machine Learning',
        date: { month: 'OCT', day: 15 },
        time: '3:00pm - 5:00pm',
        location: 'Computer Science Lab',
        details: 'Learn the basics of machine learning and build your own model!',
        image: 'bbb.jpg',
    },
    {
        title: 'Career Fair',
        date: { month: 'NOV', day: 10 },
        time: '10:00am - 2:00pm',
        location: 'Campus Center',
        details: 'Connect with top companies and explore job opportunities in the tech industry!',
        image: 'ccc.jpg',
    },
    {
        title: 'Guest Speaker: Cybersecurity Trends',
        date: { month: 'DEC', day: 3 },
        time: '6:00pm - 8:00pm',
        location: 'Lecture Hall',
        details:
            'Learn about the latest trends and challenges in cybersecurity from our guest speaker.',
        image: 'aaa.jpg',
    },
    {
        title: 'Holiday Party',
        date: { month: 'DEC', day: 18 },
        time: '7:30pm - 10:30pm',
        location: 'Student Lounge',
        details: 'Celebrate the holiday season with food, music, and games!',
        image: 'bbb.jpg',
    },
];

export const CAROUSEL_IMAGES: Image[] = [
    {
        src: '/images/home/duck-ctf.jpg',
        alt: 'DuckCTF',
    },
    {
        src: '/images/home/pizza.jpg',
        alt: 'Pizza',
    },
    {
        src: '/images/home/cyber-panel.jpg',
        alt: 'Cyber Panel',
    },
];
