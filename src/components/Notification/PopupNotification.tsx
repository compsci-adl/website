import Image from 'next/image';
import FancyRectangle from '../FancyRectangle';
import NotificationContent from './NotificationContent';
import type { NotificationData } from './types';

export default function PopupNotification({
    data,
    onClose,
}: {
    data: NotificationData;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-40">
            <FancyRectangle colour="black" offset="8" filled>
                <div className="relative flex w-[75vw] max-w-4xl flex-col items-center justify-center gap-4 border-4 border-black bg-yellow p-6 text-black shadow-lg md:w-[90vw]">
                    <button
                        onClick={onClose}
                        aria-label="Close popup"
                        className="absolute right-3 top-3 text-4xl font-bold hover:text-red-600"
                    >
                        &times;
                    </button>

                    {(data.leftImage || data.rightImage) && (
                        <div className="mt-8 flex flex-col items-center justify-center gap-8 md:flex-row">
                            {data.leftImage && data.rightImage ? (
                                <>
                                    <Image
                                        src={data.leftImage.url}
                                        alt={data.leftImage.alt || 'Left image'}
                                        width={500}
                                        height={300}
                                        className="w-2/3 object-contain md:w-1/2"
                                    />
                                    <Image
                                        src={data.rightImage.url}
                                        alt={data.rightImage.alt || 'Right image'}
                                        width={500}
                                        height={300}
                                        className="w-2/3 object-contain md:w-1/2"
                                    />
                                </>
                            ) : (
                                <Image
                                    src={data.leftImage ? data.leftImage.url : data.rightImage!.url}
                                    alt={
                                        data.leftImage
                                            ? data.leftImage.alt || 'Left image'
                                            : data.rightImage!.alt || 'Right image'
                                    }
                                    width={500}
                                    height={300}
                                    className="w-2/3 object-contain md:w-1/4 lg:w-2/3"
                                />
                            )}
                        </div>
                    )}

                    <NotificationContent data={data} />
                </div>
            </FancyRectangle>
        </div>
    );
}
