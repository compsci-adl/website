import NotificationContent from './NotificationContent';
import type { NotificationData } from './types';

export default function BannerNotification({
    data,
    onClose,
}: {
    data: NotificationData;
    onClose: () => void;
}) {
    return (
        <>
            <div className="bg-yellow fixed top-0 left-0 z-9999 w-full p-4 shadow-md">
                <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 text-black">
                    <div className="flex flex-1 justify-center">
                        <NotificationContent data={data} />
                    </div>
                </div>
                <button
                    onClick={onClose}
                    aria-label="Close banner"
                    className="absolute top-1/2 right-6 ml-4 -translate-y-1/2 text-2xl font-bold text-black hover:text-red-600"
                >
                    &times;
                </button>
            </div>
            <div className="h-15" />
        </>
    );
}
