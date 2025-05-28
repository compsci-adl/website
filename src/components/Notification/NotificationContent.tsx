import type { NotificationData } from './types';

export default function NotificationContent({ data }: { data: NotificationData }) {
    return (
        <div className="text-md flex flex-wrap items-center justify-center gap-2 whitespace-nowrap">
            <span>{data.text}</span>
            {data.url && (
                <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline hover:text-blue-800"
                >
                    {data.urlText || 'Learn more'}
                </a>
            )}
        </div>
    );
}
