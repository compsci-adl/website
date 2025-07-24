export interface Photo {
    url: string;
    orientation: 'portrait' | 'landscape';
    folder: string;
    eventDate: { year: number; month: number; day: number };
    eventName: string;
}
