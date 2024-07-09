/** Paragraph with round corner border */
export default function Paragraph({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`${className}rounded-xl border-2 bg-grey p-3 text-lg md:p-6 md:text-xl`}>
            {children}
        </div>
    );
}
