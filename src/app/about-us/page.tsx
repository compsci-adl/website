import Title from '@/components/Title';
import FancyRectangle from '@/components/FancyRectangle';
import Image from 'next/image';

export default function AboutUs() {
    return (
        <div className="relative">
            <main className="mx-4 md:mx-10">
                <div className="h-full bg-[url('/images/rectangleGrid.svg')] bg-repeat-y md:bg-[length:90%_90%] md:bg-center md:bg-no-repeat">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
                        <div className="grid-flow-dense justify-self-center lg:col-span-3">
                            <Title colour="orange">About Us</Title>
                        </div>
                        <div className="flex justify-center lg:col-span-1 lg:justify-end">
                            <FancyRectangle colour={'purple'} offset={'8'} filled={true}>
                                <Image
                                    src={'/images/meet-and-greet.jpg'}
                                    alt={'Meet and Greet'}
                                    width={378.125}
                                    height={250}
                                ></Image>
                            </FancyRectangle>
                        </div>
                        <div className="mb-10 flex flex-col lg:col-span-2 lg:justify-center">
                            <div className="flex justify-end">
                                <Image
                                    src="/images/white-star.svg"
                                    alt="White Star"
                                    className="float-end"
                                    width={30}
                                    height={30}
                                />
                                <Image
                                    src="/images/white-star.svg"
                                    alt="White Star"
                                    className="float-end"
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className="flex h-fit flex-row self-center border-b-2 border-t-2 border-white bg-grey px-4">
                                <Image
                                    src="/images/yellow-triangle.svg"
                                    alt="Yellow Triangle"
                                    className="mb-12 mr-4"
                                    width={30}
                                    height={30}
                                />
                                <p className="my-4 text-lg">
                                    The University of Adelaide Computer Science Club is a
                                    student-run club for those with an interest in computer science
                                    or computing in general. Although we&apos;re a university club,
                                    we welcome anyone interested in computer science and/or
                                    socializing to join!
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col text-2xl font-black md:mt-12 md:flex-row lg:col-span-2 lg:mt-24 lg:text-3xl">
                            <h3>Members will have </h3>
                            <div className="flex">
                                <div className="mt-2 w-fit bg-yellow px-2 md:ml-2 md:mr-2 md:mt-0">
                                    <h3 className="text-grey">access</h3>
                                </div>
                                <h3 className="ml-2 mt-2 md:ml-0 md:mt-0">to</h3>
                            </div>
                        </div>
                        <FancyRectangle colour={'purple'} offset={'8'} filled={true}>
                            <div className="relative z-10 mt-4 border-2 border-white bg-grey px-4 py-4 md:px-6 md:py-6">
                                <p className="text-lg md:text-xl"></p>
                            </div>
                        </FancyRectangle>
                        <div className="md:col-span-1">
                            <Image
                                src="/images/crosses.svg"
                                alt="Crosses"
                                height={80}
                                width={237}
                                className="w-full md:w-auto"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
