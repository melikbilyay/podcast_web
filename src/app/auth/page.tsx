'use client'; // Bu sayfa istemci bileşeni olduğu için bu satırı ekleyin

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Yönlendirme için useRouter'ı ekleyin
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Yükleme durumu
    const router = useRouter(); // useRouter hook'unu kullanın

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true); // Yüklemeyi başlat
        setError(''); // Önceki hataları sıfırla
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail(''); // Başarılı girişten sonra email alanını temizle
            setPassword(''); // Başarılı girişten sonra şifre alanını temizle
            router.push('/'); // Yönlendirmek istediğiniz sayfa
        } catch (error) {
            setError(error.message); // Hata mesajını ayarla
        } finally {
            setLoading(false); // Yüklemeyi durdur
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Giriş Yap</h1>
                <form onSubmit={handleSignIn}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Şifre</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Şifre"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white font-bold py-2 px-4 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                        disabled={loading} // Butonu yükleme sırasında devre dışı bırak
                    >
                        {loading ? 'Yükleniyor...' : 'Giriş Yap'}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}
            </div>
        </div>
    );
};

export default AuthPage;
