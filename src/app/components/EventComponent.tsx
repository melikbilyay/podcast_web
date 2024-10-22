import { useState } from 'react';
import { db, storage } from '../lib/firebase'; // Adjust import based on your project structure
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const EventComponent = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setCoverImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Upload the image to Firebase Storage
            if (coverImage) {
                const imageRef = ref(storage, `events/${coverImage.name}`);
                await uploadBytes(imageRef, coverImage);
                const coverURL = await getDownloadURL(imageRef); // Corrected from coverRef to imageRef

                // Add event details to Firestore
                const eventDoc = {
                    title,
                    description,
                    date, // Keep date as is
                    coverURL, // Use the download URL
                    createdAt: new Date(),
                };

                await addDoc(collection(db, 'events'), eventDoc); // Changed from 'podcasts' to 'events'

                // Reset the form
                setTitle('');
                setDate('');
                setDescription('');
                setCoverImage(null);
                setMessage('Etkinlik başarıyla eklendi!'); // Success message
            }
        } catch (error) {
            console.error("Error adding event:", error);
            setMessage('Bir hata oluştu. Lütfen tekrar deneyin.'); // Error message
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-center mb-4">Etkinlik Ekle</h2>
            {message && (
                <div className={`p-2 mb-4 text-center ${message.includes('başarıyla') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Etkinlik Başlığı:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tarih:</label>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Açıklama:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Kapak Fotoğrafı:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading} // Disable the button while loading
                    className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white font-semibold rounded-lg hover:${loading ? 'bg-gray-400' : 'bg-blue-700'} transition duration-300`}
                >
                    {loading ? 'Yükleniyor...' : 'Etkinlik Ekle'}
                </button>
            </form>
        </div>
    );
};

export default EventComponent;
