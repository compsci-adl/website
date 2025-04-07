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

// Times are in Australian Central Standard Time (ACST)
export const EVENTS: Event[] = [
    {
        title: 'Meet and Greet',
        date: { year: 2024, month: 'MAR', day: 1, endTime: '21:00' },
        time: '5:00pm - 9:00pm',
        location: 'Engineering and Maths EM105',
        details:
            "Come hang out and meet the Computer Science Club's committee and members in your first week of the new academic year!\nWe have board games in collaboration with the GAMES Club and our club owned Nintendo Switch.\nFood and drinks will also be provided.",
        image: '2024/meet-and-greet.jpg',
    },
    {
        title: 'Insight Into Industry',
        date: { year: 2024, month: 'MAR', day: 6, endTime: '21:00' },
        time: '6:00pm - 9:00pm',
        location: 'Ingkarni Wardli 715',
        details:
            'Unsure of what jobs are available in the tech industry? Or looking to find out more about where your expertise could take you? If so, come along and gain insights into what a career in the industry might look like.',
        image: '2024/insight-into-industry.jpg',
    },
    {
        title: 'Quiz Night',
        date: { year: 2024, month: 'MAR', day: 8, endTime: '21:00' },
        time: '6:00pm - 9:00pm',
        location: 'Ingkarni Wardli 218',
        details: 'Join us for a night of quizzical encounters! Free food and prizes to come!',
        image: '2024/quiz-night.jpg',
    },
    {
        title: 'Industry Night',
        date: { year: 2024, month: 'APR', day: 2, endTime: '21:00' },
        time: '6:00pm - 9:00pm',
        location: 'The National Wine Centre, Hickinbotham Hall',
        details: 'Connect with top companies and explore job opportunities in the tech industry!',
        image: '2024/industry-night.jpg',
    },
    {
        title: 'LaTeX Workshop',
        date: { year: 2024, month: 'APR', day: 24, endTime: '19:00' },
        time: '5:00pm - 7:00pm',
        location: 'Ingkarni Wardli 218',
        details:
            'Do you want to create pretty documents? Is Word destroying your assignments when you move images around? Look no further than LaTeX, the academic typesetting tool created by the great Donald Knuth, and the solution to all your maths assignments.',
        image: '2024/latex-workshop.jpg',
    },
    {
        title: 'Duck Duck Booze: Pub Crawl',
        date: { year: 2024, month: 'MAY', day: 10, endTime: '23:00' },
        time: '5:30pm - 11:00pm',
        location: 'UniBar Adelaide and various bars in Adelaide',
        details:
            'Join us for a night of hopping from one watering hole to the next, spreading good vibes and great drinks all around.',
        image: '2024/pub-crawl.png',
    },
    {
        title: 'Meet and Greet',
        date: { year: 2024, month: 'JUL', day: 26, endTime: '21:00' },
        time: '5:00pm - 9:00pm',
        location: 'Engineering and Maths EM110 & EM105',
        details:
            "Ready to launch into the semester with a blast? Join us at our Meet & Greet! Whether you're new or missed us at O'Week, this event is for you! Get ready for Friday Night Games, free food and drinks, and you'll get to meet our committee and fellow members! Don't miss out!",
        image: '2024/meet-and-greet-s2.png',
    },
    {
        title: 'Intro to Git and GitHub Workshop',
        date: { year: 2024, month: 'JUL', day: 31, endTime: '20:00' },
        time: '6:00pm - 8:00pm',
        location: 'Ingkarni Wardli 218 CAT Suite',
        details:
            'Learn the basics of version control, deal with annoying merge conflicts, and integrate these tools with Visual Studio Code. Learn more about our Open Source Team and see how they collaborate using these tools on their projects. Perfect for beginners and those looking to enhance their development skills or join the Open Source Team!',
        image: '2024/git-and-github-workshop.png',
    },
    {
        title: 'Inter-University Beginner Competition',
        date: { year: 2024, month: 'AUG', day: 2, endTime: '20:00' },
        time: '5:00pm - 8:00pm',
        location: 'Ingkarni Wardli B17',
        details:
            "We've got some special surprise guests flying over from Melbourne as well as $150 worth of prizes!! The competition is aimed at beginners, so it’s a perfect chance to get a taste of competitive programming. It’s a 1.5 hour comp with 6 beginner-level programming problems ICPC-style where teams of 1-3 earn more points by solving a problem faster and with fewer submissions. The competition will take place on Codeforces where you can use all popular languages: C++, C, Python, Java, Rust, Haskell, Javascript, etc. There will also be free food!!",
        image: '2024/beginner-competition.png',
    },
    {
        title: 'Clubsland',
        date: { year: 2024, month: 'AUG', day: 7, endTime: '15:00' },
        time: '11:00am - 3:00pm',
        location: 'Hub Central',
        details:
            "Missed us at O'Week? Well you're in luck, because we are back again for Clubsland! This is yet another chance to meet the committee and ask any questions you have about the club! So come along and have a chat. Find out why you should sign up to the CS Club and potentially make new friends!  See you there!",
        image: '2024/clubsland.png',
    },
    {
        title: 'Pandas Workshop',
        date: { year: 2024, month: 'AUG', day: 13, endTime: '20:00' },
        time: '5:00pm - 8:00pm',
        location: 'Ingkarni Wardli B16',
        details:
            'Ready to dive into data analysis? Join us for the introductory Pandas Workshop! Learn the basics of data science and data analysis in this workshop, and discover how you can use these skills in machine learning. Perfect for beginners, this workshop will introduce you to the roadmap for your journey into artificial intelligence and data science.',
        image: '2024/pandas-workshop.png',
    },
    {
        title: 'Intro to CTF Workshop',
        date: { year: 2024, month: 'AUG', day: 20, endTime: '19:30' },
        time: '5:30pm - 7:30pm',
        location: 'Ingkarni Wardli B16',
        details:
            "Whether you're a novice or a seasoned coder, this workshop is designed to equip you with the skills you need to excel in Capture The Flag competitions. We'll cover the essentials, from understanding challenges to decoding the toughest puzzles, so you can be ready for our upcoming DuckCTF!",
        image: '2024/ctf-workshop.png',
    },
    {
        title: 'DuckCTF',
        date: { year: 2024, month: 'AUG', day: 29, endTime: '20:00' },
        time: '5:30pm - 8:00pm',
        location: 'Australian Cyber Collaboration Centre (ACCC)',
        details:
            'Join us for DuckCTF, our premier Capture The Flag competition designed to challenge and sharpen your cybersecurity skills. Form your team of 3 and be ready to solve complex problems while learning valuable new techniques. On-site spaces are limited, but contestants can also join remotely.',
        image: '2024/duck-ctf.png',
    },
    {
        title: 'Grad Mixer',
        date: { year: 2024, month: 'SEP', day: 6, endTime: '21:00' },
        time: '6:00pm - 9:00pm',
        location: 'The Gallery, Level 2, 30 Waymouth St',
        details:
            'Join us for an evening of networking with students, alumni, and industry professionals in fields like software development, AI, and cybersecurity. Expand your network, share experiences, and explore new opportunities while enjoying light refreshments in a relaxed atmosphere.',
        image: '2024/grad-mixer.png',
    },
    {
        title: 'Data Driven Future',
        date: { year: 2024, month: 'SEP', day: 11, endTime: '20:30' },
        time: '6:30pm - 8:30pm',
        location: 'Ingkarni Wardli 715',
        details:
            'Join us for "Data Driven Future" - An AI and Data Science Panel! Discover insights from top minds in AI and data science as they explore the future of technology, machine learning, and innovation. Whether you\'re curious about AI\'s impact on industries, new research, or real-world applications, this panel is for you!',
        image: '2024/ai-panel.png',
    },
    {
        title: 'Cybersecurity Panel: Hacking the Industry',
        date: { year: 2024, month: 'OCT', day: 8, endTime: '20:30' },
        time: '6:30pm - 8:30pm',
        location: 'Ingkarni Wardli 715',
        details:
            'Join us for an exclusive panel featuring industry experts from cybersecurity, digital forensics, and reverse engineering! Dive deep into the world of cyber defense, learn about the latest trends, and gain insights from seasoned professionals.',
        image: '2024/cyber-panel.png',
    },
    {
        title: 'Annual General Meeting',
        date: { year: 2024, month: 'OCT', day: 15, endTime: '21:00' },
        time: '5:30pm - 9:00pm',
        location: 'Scott Theatre',
        details:
            "The CS Club's Annual General Meeting is approaching! This is your chance to elect our new committee for 2025.",
        image: '2024/agm.png',
    },
    {
        title: 'TECH.TONIC',
        date: { year: 2024, month: 'NOV', day: 22, endTime: '23:00' },
        time: '6:30pm - 11:00pm',
        location: 'The Astor Hotel, 437 Pulteney St',
        details:
            'Join us for a retro-inspired cocktail night! This collaboration between the CS Club and AMESS offers food, drinks, and good vibes. Celebrate the end of the semester, relax, or enjoy a fun night out with friends!',
        image: '2024/techtonic.png',
    },
    {
        title: 'Meet and Greet',
        date: { year: 2025, month: 'MAR', day: 7, endTime: '21:00' },
        time: '6:00pm - 9:00pm',
        location: 'Engineering and Maths EM205',
        details:
            'Missed us at O’Week? No worries—now’s your chance! Whether you’re a first-year or a graduate, come hang out, meet the committee, and connect with fellow CS students. Join us for a chill night of fun, networking, and good vibes.',
        image: '2025/meet-and-greet.png',
    },
    {
        title: 'CSC x CPC x SQUAD Industry Night',
        date: { year: 2025, month: 'MAR', day: 11, endTime: '21:00' },
        time: '6:00pm - 9:00pm',
        location: 'National Wine Centre of Australia',
        details:
            "Network with industry professionals and explore careers in software engineering, cybersecurity, AI, trading, and banking. Whether you're looking for internships, graduate roles, or just keen to learn more about career paths in tech, this is an event you don’t want to miss!",
        image: '2025/industry-night.png',
    },
    {
        title: 'Special General Meeting',
        date: { year: 2025, month: 'MAR', day: 19, endTime: '19:00' },
        time: '5:30pm - 7:00pm',
        location: 'IW715 Conference Room',
        details:
            'Our Special General Meeting is your chance to vote for key club roles! We’re electing a First-Year Representative and an Events Officer. Any club member can run—just prepare a 1-minute speech on why you’re the best fit!',
        image: '2025/sgm.png',
    },
    {
        title: 'Intro to Web Dev Workshop',
        date: { year: 2025, month: 'MAR', day: 27, endTime: '20:30' },
        time: '6:30pm - 8:30pm',
        location: 'Engineering and Maths EM108',
        details:
            'Want to learn web development fundamentals? Our first workshop in our Web Dev Workshop Series, Intro to Web Dev, covers HTML, CSS, and JavaScript, with hands-on webpage building and expert guidance. Lab computers will be available, or you can use your own laptop.',
        image: '2025/intro-web-dev.png',
    },
    {
        title: 'Quiz Night',
        date: { year: 2025, month: 'APR', day: 4, endTime: '21:00' },
        time: '6:30pm - 8:30pm',
        location: 'Union House, Function Room 1',
        details:
            'Time to flex those brain muscles, outsmart the competition with random facts, and claim ultimate trivia glory! Form a team up to six members, or get assigned one on the day, battle it out for epic prizes, and enjoy free food & drinks! Arrive by 5:45 PM for a 6 PM start!',
        image: '2025/quiz-night.jpeg',
    },
    {
        title: 'Intro to React Workshop',
        date: { year: 2025, month: 'APR', day: 8, endTime: '20:30' },
        time: '6:30pm - 8:30pm',
        location: 'Ingkarni Wardli 218',
        details:
            'In the second workshop of our Web Dev Workshop Series, Intro to React, we will explore the key concepts and fundamentals of React and learn to build interactive, component-based web apps. Lab computers will be available, or you can use your own laptop.',
        image: '2025/intro-react.jpg',
    },
    {
        title: 'LaTeX Workshop',
        date: { year: 2025, month: 'APR', day: 10, endTime: '21:00' },
        time: '6:00pm - 9:00pm',
        location: 'Ingkarni Wardli B17',
        details:
            "Tired of boring, plain resumes? Say farewell to them forever and level up your document game with LaTeX! Lab computers will be available, but feel free to bring your laptop to follow along. Whether you're writing reports, assignments, or the perfect resume—LaTeX has your back.",
        image: '2025/latex.jpg',
    },
    {
        title: 'CS Club x eSports Club Super Smash Bros. Ultimate Tournament',
        date: { year: 2025, month: 'APR', day: 13, endTime: '16:00' },
        time: '12:00pm - 4:00pm',
        location: 'Inkarni Wardli B18',
        details:
            'This will be a 1v1 double-elimination tournament and you will be competing for a prize! Members of either club will have free entry, entry fee for non-members will be $10. May the best smasher win.',
        url: {
            href: new URL('https://forms.gle/XG266qLDLpoQQsFAA'),
            text: 'Sign up now—spots are limited!',
        },
        image: '2025/smash-tournament.jpg',
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
