export const SkeletonLoader = () => {
    return (
        <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-4 text-black lg:flex-row">
            <div className="aspect-[2/1] w-full rounded-lg border-[3px] border-gray-400 bg-gray-300 md:w-[450px]"></div>

            <div className="flex grow flex-col space-y-2 md:space-y-4">
                <div className="flex gap-6 font-bold">
                    <div className="grow space-y-2">
                        <div className="h-8 w-3/4 rounded-md bg-gray-300"></div>
                        <div className="flex gap-2">
                            <div className="h-6 w-6 rounded-md bg-gray-300"></div>
                            <div className="h-4 w-1/2 rounded-md bg-gray-300"></div>
                        </div>
                        <div className="flex gap-2">
                            <div className="h-6 w-6 rounded-md bg-gray-300"></div>
                            <div className="h-4 w-1/2 rounded-md bg-gray-300"></div>
                        </div>
                    </div>

                    <div className="flex h-[80px] w-[80px] flex-col items-center justify-center self-start rounded-md border-[3px] border-gray-400 bg-gray-300 px-4 py-2">
                        <div className="mb-1 h-4 w-10 rounded-md bg-gray-400"></div>
                        <div className="justify-left mb-1 h-4 w-10">
                            <div className="mb-1 h-4 w-5 rounded-md bg-gray-400"></div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 rounded-md bg-gray-300"></div>
            </div>
        </div>
    );
};
