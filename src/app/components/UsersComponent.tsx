const UsersComponent = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Kullanıcılar</h1>
            <p>Şu anda sistemdeki kullanıcılar:</p>
            {/* Kullanıcı listesi ve yönetim araçları buraya eklenebilir */}
            <ul className="mt-4">
                <li className="border-b py-2">Kullanıcı 1</li>
                <li className="border-b py-2">Kullanıcı 2</li>
                <li className="border-b py-2">Kullanıcı 3</li>
            </ul>
        </div>
    );
};

export default UsersComponent;
