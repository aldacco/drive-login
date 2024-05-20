# Google Drive to Kodi Connection

This guide will help you set up the connection between Google Drive and Kodi using our Next.js application.

## Prerequisites

1. **Kodi Installed**: Ensure you have Kodi installed on your device.
2. **Google Drive Add-on**: The Google Drive add-on must be installed from the Kodi add-on repository.

## Warning

**Important**: This application is not verified by Google, which means there will be additional steps during the authentication process. See the "Deploy Your Own Instance" section for more details on configuring environment variables and deploying your service.

## Steps to Configure the Connection

### Basic Method: Using Generated PIN

1. **Install Google Drive Add-on**:
    - Open Kodi.
    - Go to `Add-ons` > `Download` > `Video add-ons`.
    - Search for and install the `Google Drive` add-on.

2. **Modify Add-on Settings**:
    - Open Kodi and go to `Add-ons` > `My add-ons` > `Video add-ons` > `Google Drive`.
    - Click on `Configure`.
    - In the `Advanced` tab, find the `Source` property.
    - Change the `Source` URL to: `https://kodi-drive-login.vercel.app`.
    - Save the changes.

3. **Add Your Google Account**:
    - In the Google Drive add-on, select `Add account`.
    - A PIN will be generated. Note this PIN.

4. **Authenticate via Our Application**:
    - Open a web browser and go to `https://kodi-drive-login.vercel.app`.
    - Enter the generated PIN.
    - Follow the Google authentication steps to grant access to your Google Drive.

    **Note**: As the application is not verified by Google, you may encounter warnings. Proceed with the authentication by acknowledging the warnings.

5. **Complete the Setup**:
    - Once authenticated, return to Kodi.
    - Your Google Drive should now be accessible via the add-on.

### Advanced Method: Using Your Own Credentials

1. **Install Google Drive Add-on**:
    - Open Kodi.
    - Go to `Add-ons` > `Download` > `Video add-ons`.
    - Search for and install the `Google Drive` add-on.

2. **Modify Add-on Settings**:
    - Open Kodi and go to `Add-ons` > `My add-ons` > `Video add-ons` > `Google Drive`.
    - Click on `Configure`.
    - In the `Advanced` tab, find the `Source` property.
    - Change the `Source` URL to: `https://kodi-drive-login.vercel.app`.
    - Save the changes.

3. **Enable Google APIs**:
    - Go to the [Google Cloud Console](https://console.cloud.google.com/).
    - Create a new project or select an existing project.
    - Go to `APIs & Services` > `Library`.
    - Enable the following APIs:
        - Google Drive API
        - Google Photos Library API

4. **Create OAuth 2.0 Credentials**:
    - In the Google Cloud Console, go to `APIs & Services` > `Credentials`.
    - Click on `Create Credentials` and select `OAuth 2.0 Client IDs`.
    - Configure the consent screen and set up your OAuth 2.0 Client ID.
    - Make sure to add `https://kodi-drive-login.vercel.app/callback` as an authorized redirect URI.
    - Note down the `Client ID` and `Client Secret`.

5. **Add Your Google Account**:
    - In the Google Drive add-on, select `Add account`.
    - A PIN will be generated. Note this PIN.

6. **Authenticate via Our Application**:
    - Open a web browser and go to `https://kodi-drive-login.vercel.app`.
    - Enter the generated PIN, `Client ID`, and `Client Secret`.
    - Follow the Google authentication steps to grant access to your Google Drive.

    **Note**: As the application is not verified by Google, you may encounter warnings. Proceed with the authentication by acknowledging the warnings.

7. **Complete the Setup**:
    - Once authenticated, return to Kodi.
    - Your Google Drive should now be accessible via the add-on.

## Deploy Your Own Instance

To deploy your own instance and avoid the unverified application warnings, configure the following environment variables:

- `NEXT_PUBLIC_CLIENT_ID=`
- `NEXT_PUBLIC_CLIENT_SECRET=`
- `NEXT_PUBLIC_CLIENT_URL=http://localhost:3000`
- `NEXT_PUBLIC_REDIS_CONNECTION=`

### Steps to Deploy

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-repo/your-app.git
    cd your-app
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Environment Variables**:
    Create a `.env` file in the root of your project and add your credentials:
    ```env
    NEXT_PUBLIC_CLIENT_ID=your_client_id
    NEXT_PUBLIC_CLIENT_SECRET=your_client_secret
    NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
    NEXT_PUBLIC_REDIS_CONNECTION=your_redis_connection
    ```

4. **Run the Application**:
    ```bash
    npm run dev
    ```

5. **Access the Application**:
    - Open your browser and go to `http://localhost:3000`.
