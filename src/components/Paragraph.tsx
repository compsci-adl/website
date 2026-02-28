/** Paragraph with round corner border */
export default function Paragraph({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`${className}rounded-xl bg-grey border-2 p-3 text-lg md:p-6 md:text-xl`}>
            {children}
        </div>
    );
}
