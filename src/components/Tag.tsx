import { getContrastColor } from '@/constants/colours';

interface TagProps {
    name: string;
    backgroundColor: string;
}

export default function Tag({ name, backgroundColor }: TagProps) {
    const textColor: string = getContrastColor(backgroundColor);

    return (
        <div
            className="h-fit w-fit rounded-xl border-2 border-black px-3 py-1.5"
            style={{ backgroundColor, color: textColor }}
        >
            <span>{name}</span>
        </div>
    );
}
