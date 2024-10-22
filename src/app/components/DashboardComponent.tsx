const DashboardComponent = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-700 mb-6">Gösterge Tablosu</h1>
            <p className="text-gray-700 mb-4">
                Burada genel istatistikleri görebilirsiniz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-blue-100 p-4 text-gray-700 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Toplam Podcast</h2>
                    <p className="text-2xl font-bold">150</p>
                </div>

                {/* Card 2 */}
                <div className="bg-green-100 p-4 text-gray-700 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Dinleyici Sayısı</h2>
                    <p className="text-2xl font-bold">1,200</p>
                </div>

                {/* Card 3 */}
                <div className="bg-yellow-100 p-4 text-gray-700 rounded-lg shadow">
                    <h2 className="text-xl text-gray-700 font-semibold mb-2">Yeni Kullanıcılar</h2>
                    <p className="text-2xl text-gray-700 font-bold">50</p>
                </div>
            </div>

            {/* Example Chart Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Dinleyici İstatistikleri</h2>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-700">Grafik burada olacak...</p>
                    {/* Here you can integrate a chart library like Chart.js or Recharts */}
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Son Etkinlikler</h2>
                <ul className="bg-gray-50 rounded-lg shadow-md">
                    <li className="border-b text-gray-700 px-4 py-2">Admin yeni bir podcast yükledi.</li>
                    <li className="border-b text-gray-700 px-4 py-2">Kullanıcı 2 podcast dinlemeye başladı.</li>
                    <li className="border-b text-gray-700 px-4 py-2">Kullanıcı 3 profilini güncelledi.</li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardComponent;
