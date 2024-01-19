import FancyRectangle from '@/components/FancyRectangle';

export default function Title({ className }: { className?: string }) {
    return (
        <div className={className}>
            <FancyRectangle colour="yellow" offset="8" filled={false}>
                <div className="bg-yellow w-fit px-2">
                    <h1 className="text-5xl md:text-7xl text-grey font-bold">Contact</h1>
                </div>
            </FancyRectangle>
        </div>
    );
}
