
export const SkeletonLoader = () => {
    return (
        <div className="w-full flex flex-col gap-6 rounded-xl bg-white p-4 text-black lg:flex-row">
            <div className="w-full md:w-[450px] aspect-[2/1] bg-gray-300 rounded-lg border-[3px] border-gray-400"></div>

            <div className="grow flex flex-col space-y-2 md:space-y-4">
                <div className="flex gap-6 font-bold">
                    <div className="grow space-y-2">
                        <div className="h-8 w-3/4 bg-gray-300 rounded-md"></div> 
                        <div className="flex gap-2">
                            <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
                            <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-6 h-6 bg-gray-300 rounded-md"></div>
                            <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
                        </div>
                    </div>

                
                    <div className="w-[80px] h-[80px] rounded-md border-[3px] border-gray-400 bg-gray-300 flex flex-col justify-center items-center px-4 py-2 self-start ">
                        <div className="h-4 w-10 bg-gray-400 rounded-md mb-1"></div> 
                        <div className="h-4 w-10 mb-1 justify-left">
                            <div className="h-4 w-5 bg-gray-400 rounded-md mb-1"></div>
                        </div> 
                    </div>
                </div>

                
                <div className="flex-1 bg-gray-300 rounded-md"></div>
            </div>
        </div>
    )
}