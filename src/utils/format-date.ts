// Function to format the date to DD/MM/YYYY format.
// Accepts a `Date`, an ISO `string`, a timestamp `number`, or `null`/`undefined`.
export const formatDate = (date?: Date | string | number | null): string => {
    if (date === undefined || date === null || date === '') return '';

    let d: Date;
    if (date instanceof Date) {
        d = date;
    } else if (typeof date === 'number') {
        d = new Date(date);
    } else {
        // Handle strings (e.g. ISO date strings) and other values
        d = new Date(String(date));
    }

    if (isNaN(d.getTime())) {
        // If we can't parse the date, return the original value as string
        return String(date);
    }

    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString();
    return `${day}/${month}/${year}`;
};
