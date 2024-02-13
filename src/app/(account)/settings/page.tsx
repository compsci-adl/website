'use client';

import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { useState } from 'react';
import Settings from './Settings';
import Sidebar from './Sidebar';

export default function SettingsPage() {
    const [selectedTab, setSelectedTab] = useState('account');

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-center">
                <Title colour="purple">Settings</Title>
            </div>
            <section className="mt-12 flex justify-center">
                <FancyRectangle colour="purple" offset="8" filled={true}>
                    <div className="z-0 flex w-[28rem] border-4 border-black bg-white px-8 py-8 text-black md:w-[48rem] md:px-12 md:py-12">
                        <Sidebar selectedTab={selectedTab} handleTabClick={handleTabClick} />
                        <div className="ml-8 flex">
                            <Settings selectedTab={selectedTab} />
                        </div>
                    </div>
                </FancyRectangle>
            </section>
        </div>
    );
}
