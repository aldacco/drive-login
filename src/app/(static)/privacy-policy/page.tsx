export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="mb-4">
                    The add-on stores only your account name, account id, and the access data in your Kodi device.
                    This is used to display your account as an option menu in Kodi and to access your drive files.
                </p>
                <p className="mb-4">
                    The add-on access your files information only from your Kodi device directly to the cloud drive provider.
                    The add-on uses your files information for the purpose of displaying it in Kodi so you can play your video, music or you can view your pictures.
                </p>
                <p className="mb-4">
                    The add-on transmits or shares information only to the developer of this add-on if you explicitly agreed to it and only if an error happened,
                    for the sole purpose of helping to resolve the issues quickly.
                </p>
                <p className="mb-4">
                    This information includes the file id, filename, ip address and never includes sensitive information like access codes, emails or user names.
                    You can always disable this option in the configuration menu.
                </p>
                <h2 className="text-2xl font-bold mb-4">Each scope requested by the add-on has a specific use and need:</h2>
                <h3 className="text-xl font-semibold mb-2">Google Drive:</h3>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-200">Scope</th>
                            <th className="py-2 px-4 bg-gray-200">Use/Need</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">https://www.googleapis.com/auth/drive.readonly</td>
                            <td className="border px-4 py-2">Access your file information in Read Only mode to be able to navigate your files and play them in Kodi.</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">https://www.googleapis.com/auth/drive.photos.readonly</td>
                            <td className="border px-4 py-2">Access your photos in Read Only mode to be able to navigate your photos and display them in Kodi.</td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">profile</td>
                            <td className="border px-4 py-2">Access your profile information to display your account as an option menu in Kodi.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
