export type ImageData = {
    url: string;
    alt?: string;
};

export type NotificationData = {
    enabled: boolean;
    type: 'banner' | 'popup';
    text: string;
    url?: string;
    urlText?: string;
    leftImage?: ImageData;
    rightImage?: ImageData;
};
