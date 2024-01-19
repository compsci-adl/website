export default function Paragraph({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-lg md:text-xl text-white border-2 rounded-xl md:p-6 p-3 bg-grey">
            {children}
        </div>
    );
}
