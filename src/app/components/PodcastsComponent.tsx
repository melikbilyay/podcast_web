import { useState } from 'react';
import { storage, firestore } from '../lib/firebase'; // Adjust the import path as needed
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const PodcastsComponent = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>(''); // New state for success message

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage(''); // Reset success message on new submission

        if (!audioFile || !coverImage) {
            setError('Lütfen hem ses dosyasını hem de kapak fotoğrafını yükleyin.');
            setLoading(false);
            return;
        }

        try {
            // Upload audio file to Firebase Storage
            const audioRef = ref(storage, `podcasts/audio/${audioFile.name}`);
            await uploadBytes(audioRef, audioFile);

            // Upload cover image to Firebase Storage
            const coverRef = ref(storage, `podcasts/covers/${coverImage.name}`);
            await uploadBytes(coverRef, coverImage);

            // Get download URLs
            const audioURL = await getDownloadURL(audioRef);
            const coverURL = await getDownloadURL(coverRef);

            // Add podcast metadata to Firestore
            const podcastDoc = {
                title,
                description,
                audioURL, // Use the download URL
                coverURL, // Use the download URL
                createdAt: new Date(),
            };

            await addDoc(collection(firestore, 'podcasts'), podcastDoc);

            // Reset form fields
            setTitle('');
            setDescription('');
            setAudioFile(null);
            setCoverImage(null);

            // Set success message
            setSuccessMessage('Podcast başarıyla yüklendi!'); // Success message
        } catch (err) {
            setError('Yükleme sırasında bir hata oluştu: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Podcastler</h1>
            <p className="mb-4 text-gray-800">Podcast yüklemek için aşağıdaki formu kullanın</p>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Success message display */}
            <form className="mt-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Podcast Başlığı"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 mb-2 w-full"
                    required
                />
                <textarea
                    placeholder="Açıklama"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 mb-2 w-full"
                    required
                />
                <label className="block mb-2 text-gray-700">
                    Podcast MP3/MP4 Yükleyin
                </label>
                <input
                    type="file"
                    accept="audio/mp3, audio/mp4"
                    onChange={(e) => {
                        const files = e.target.files;
                        setAudioFile(files && files.length > 0 ? files[0] : null);
                    }}
                    className="mb-2"
                    required
                />
                <label className="block mb-2 text-gray-700">
                    Kapak Fotoğrafı Yükleyin
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const files = e.target.files;
                        setCoverImage(files && files.length > 0 ? files[0] : null);
                    }}
                    className="mb-2"
                    required
                />
                <button
                    type="submit"
                    className={`bg-blue-500 text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Yükleniyor...' : 'Podcast Yükle'}
                </button>
            </form>
        </div>
    );
};

export default PodcastsComponent;
