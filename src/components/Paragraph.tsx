/** Paragraph with rounded corner & grey background & white text */
export default function Paragraph({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-xl border-2 bg-grey p-3 text-lg text-white md:p-6 md:text-xl">
            {children}
        </div>
    );
}
