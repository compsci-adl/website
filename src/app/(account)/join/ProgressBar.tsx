import Duck from "@/components/Duck";

function Progress({ filled, index }: { filled?: boolean; index: number }) {
    return (
        <div className="flex items-center justify-center">
            <Duck
                colour={filled ? "yellow" : "grey"}
                outline={!filled}
                className="h-10 md:h-12"
            />
            <div className="absolute mt-20 font-bold text-black">{index}</div>
        </div>
    );
}

export default function ProgressBar({ step }: { step: number }) {
    return (
        <div className="mb-12 mt-4 flex justify-center gap-6">
            {new Array(step).fill(null).map((_, i) => (
                <Progress filled index={i + 1} key={i} />
            ))}
            {new Array(4 - step).fill(null).map((_, i) => (
                <Progress index={step + i + 1} key={i} />
            ))}
        </div>
    );
}
