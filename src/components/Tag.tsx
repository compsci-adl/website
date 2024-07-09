interface TagProps {
    name: string;
    backgroundColor: string;
}

export default function Tag({ name, backgroundColor }: TagProps) {
    return (
        <div
            className={`h-fit w-fit rounded-xl border border-slate-500 px-3 py-1.5 text-white`}
            style={{ backgroundColor }}
        >
            <span>{name}</span>
        </div>
    );
}
