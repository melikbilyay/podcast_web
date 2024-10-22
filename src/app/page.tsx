'use client'; // İstemci bileşeni olduğu için

import { useEffect, useState } from 'react';
import { auth } from './lib/firebase';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth'; // Import the signOut function
import DashboardComponent from './components/DashboardComponent';
import PodcastsComponent from './components/PodcastsComponent';
import UsersComponent from './components/UsersComponent';
import SettingsComponent from './components/SettingsComponent';
import EventComponent from './components/EventComponent';
const DashboardPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Yükleme durumu için state
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('dashboard'); // Aktif sekmeyi takip et

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                router.push('/auth');
            }
        });
        return () => unsubscribe();
    }, [router]);

    // Yükleme durumu
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <p>Yükleniyor...</p>
            </div>
        );
    }

    // Sekme içerikleri
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardComponent />;
            case 'podcasts':
                return <PodcastsComponent />;
            case 'events':
                return <EventComponent />;
            case 'users':
                return <UsersComponent />;
            case 'settings':
                return <SettingsComponent />;
            default:
                return null;
        }
    };

    // Sign out function
    const handleSignOut = async () => {
        await signOut(auth);
        router.push('/auth'); // Redirect to the auth page after sign out
    };

    return (
        <div className="flex">
            {/* Sol Menü */}
            <div className="w-64 h-screen bg-gray-800 text-white p-5">
                <h2 className="text-lg font-bold mb-4">Admin Paneli</h2>
                <ul>
                    <li className="mb-2">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`w-full text-left p-2 ${activeTab === 'dashboard' ? 'bg-gray-700' : ''}`}
                        >
                            Gösterge Tablosu
                        </button>
                    </li>
                    <li className="mb-2">
                        <button
                            onClick={() => setActiveTab('podcasts')}
                            className={`w-full text-left p-2 ${activeTab === 'podcasts' ? 'bg-gray-700' : ''}`}
                        >
                            Podcastler
                        </button>
                    </li>
                    <li className="mb-2">
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`w-full text-left p-2 ${activeTab === 'users' ? 'bg-gray-700' : ''}`}
                        >
                            Kullanıcılar
                        </button>
                    </li>
                    <li className="mb-2">
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`w-full text-left p-2 ${activeTab === 'events' ? 'bg-gray-700' : ''}`}
                        >
                            Etkinlikler
                        </button>
                    </li>
                    <li className="mb-2">
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full text-left p-2 ${activeTab === 'settings' ? 'bg-gray-700' : ''}`}
                        >
                            Ayarlar
                        </button>
                    </li>
                    <li className="mb-2">
                        <button onClick={handleSignOut} className="w-full text-left p-2 hover:text-gray-300">
                            Çıkış Yap
                        </button>
                    </li>
                </ul>
            </div>
            {/* İçerik Alanı */}
            <div className="flex-1 p-10 bg-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Hoş geldiniz, {user?.email}!</h1>
                {renderContent()}
            </div>
        </div>
    );
};

export default DashboardPage;
