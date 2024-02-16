'use client';

import FancyRectangle from '@/components/FancyRectangle';
import Title from '@/components/Title';
import { useMount } from '@/hooks/use-mount';
import Link from 'next/link';
import { useState } from 'react';
import Settings from './Settings';
import Sidebar from './Sidebar';

export default function SettingsPage() {
    const [selectedTab, setSelectedTab] = useState('membership');
    const [userFound, setUserFound] = useState('');

    useMount(() => {
        const checkUserExists = async () => {
            try {
                const response = await fetch('/api/check-user-exists');
                if (response.ok) {
                    const data = await response.json();
                    const userExists = data.exists;
                    setUserFound('true');
                    console.log('User exists:', userExists);
                } else {
                    setUserFound('false');
                    console.error('Failed to fetch user existence status:', response.status);
                }
            } catch (error) {
                console.error('Error checking user existence:', error);
            }
        };

        checkUserExists();
    });

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
                    <div className="z-0 flex w-fit gap-8 border-4 border-black bg-white px-8 py-8 text-black md:w-[48rem] md:px-12 md:py-12">
                        {userFound == 'true' && (
                            <>
                                <Sidebar
                                    selectedTab={selectedTab}
                                    handleTabClick={handleTabClick}
                                />
                                <Settings
                                    selectedTab={selectedTab}
                                    setSelectedTab={setSelectedTab}
                                />
                            </>
                        )}
                        {userFound == 'false' && (
                            <h2 className="text-2xl">
                                Please finishing{' '}
                                <Link
                                    href={'http://localhost:3000/join'}
                                    className="font-bold text-purple"
                                >
                                    signing up
                                </Link>{' '}
                                first.
                            </h2>
                        )}
                    </div>
                </FancyRectangle>
            </section>
        </div>
    );
}
