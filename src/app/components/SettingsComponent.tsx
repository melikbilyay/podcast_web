'use client'; // İstemci bileşeni olduğu için

import { useState } from 'react';
import { auth } from '../lib/firebase'; // Ensure this is the correct path to your Firebase config
import {updateEmail, sendEmailVerification, updatePassword} from 'firebase/auth';

const SettingsComponent = () => {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleEmailUpdate = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (user) {
            try {
                // Send a verification email first
                await sendEmailVerification(user);
                // Now update the email
                await updateEmail(user, newEmail);
                setSuccessMessage('Email güncellemesi için doğrulama e-postası gönderildi! Lütfen e-postanızı kontrol edin.');
                setError('');
            } catch (err) {
                setError('Email güncellenirken hata oluştu: ' + err.message);
                setSuccessMessage('');
            }
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (user) {
            try {
                await updatePassword(user, newPassword);
                setSuccessMessage('Şifre güncellendi!');
                setError('');
            } catch (err) {
                setError('Şifre güncellenirken hata oluştu: ' + err.message);
                setSuccessMessage('');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-5 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Ayarlar</h1>
            <p>Buradan hesap ayarlarınızı güncelleyebilirsiniz.</p>

            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}

            <form onSubmit={handleEmailUpdate} className="mt-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Email Güncelle</h2>
                <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Yeni Email"
                    className="border p-2 mb-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Emaili Güncelle
                </button>
            </form>

            <form onSubmit={handlePasswordUpdate} className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Şifre Güncelle</h2>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Yeni Şifre"
                    className="border p-2 mb-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Şifreyi Güncelle
                </button>
            </form>
        </div>
    );
};

export default SettingsComponent;
