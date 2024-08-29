# Google Drive to Kodi Connection

This guide will help you set up the connection between Google Drive and Kodi using our Next.js application.

## Prerequisites

1. **Kodi Installed**: Ensure you have Kodi installed on your device.
2. **Google Drive Add-on**: The Google Drive add-on must be installed from the Kodi add-on repository.

## Warning

**Important**: This application is not verified by Google, which means there will be additional steps during the authentication process. See the "Deploy Your Own Instance" section for more details on configuring environment variables and deploying your service.

## Deploy Your Own Instance
### 1. Set Up Environment Variables

You need to configure the following environment variables in Vercel. This can be done in the "Environment Variables" section within your project settings on the Vercel dashboard:

- `NEXT_PUBLIC_CLIENT_ID`: Your client ID provided by your authentication provider.
  - **Example**: `NEXT_PUBLIC_CLIENT_ID='your-client-id'`
  
- `NEXT_PUBLIC_CLIENT_SECRET`: The client secret provided by your authentication provider.
  - **Example**: `NEXT_PUBLIC_CLIENT_SECRET='your-client-secret'`

- `NEXT_PUBLIC_CLIENT_URL`: The base URL of your application, typically the URL provided by Vercel after deployment.
  - **Example**: `NEXT_PUBLIC_CLIENT_URL='https://yourapp.vercel.app'`

- `NEXT_PUBLIC_REDIS_CONNECTION`: The connection string to your Upstash Redis instance. You can obtain this connection string from your Upstash dashboard after setting up your Redis database.
  - **Example**: `NEXT_PUBLIC_REDIS_CONNECTION='redis://default:<password>@<your-upstash-url>:<port>'`

### 2. Set Up Upstash Redis

1. **Create an Upstash Account**: Go to [Upstash](https://upstash.com/) and create an account.

2. **Create a Redis Database**:
   - Once logged in, navigate to the dashboard and create a new Redis database.
   - Copy the connection string provided by Upstash; it will look something like this: `redis://default:<password>@<upstash-url>:<port>`.
   - Use this connection string as the value for the `NEXT_PUBLIC_REDIS_CONNECTION` environment variable in Vercel.

### 3. Deploy on Vercel

To deploy your Next.js application on Vercel, follow these steps:

1. **Connect Your Repository**: Go to [Vercel](https://vercel.com/) and connect your GitHub, GitLab, or Bitbucket repository.

2. **Import Your Project**:
   - Click on "New Project".
   - Select your repository and click "Import".
   - Vercel will automatically detect your Next.js application and set it up correctly.

3. **Configure Environment Variables**:
   - During the setup step, find the "Environment Variables" section.
   - Add the environment variables listed above with the appropriate values.

4. **Deploy Your Application**:
   - Click "Deploy" to start the deployment process.
   - Vercel will begin building and deploying your application.
   - Once the deployment is complete, you will get a URL (such as `https://yourapp.vercel.app`) which will be your production base URL.
      Complete the Kodi Setup
5. **Install Google Drive Add-on**:
    - Open Kodi.
    - Go to `Add-ons` > `Download` > `Video add-ons`.
    - Search for and install the `Google Drive` add-on.

### 3. Complete the Kodi Setup

1. **Modify Add-on Settings**:
    - Open Kodi and go to `Add-ons` > `My add-ons` > `Video add-ons` > `Google Drive`.
    - Click on `Configure`.
    - In the `Advanced` tab, find the `Source` property.
    - Change the `Source` URL to: `https://yourapp.vercel.app`.
    - Save the changes.

2. **Enable Google APIs**:
    - Go to the [Google Cloud Console](https://console.cloud.google.com/).
    - Create a new project or select an existing project.
    - Go to `APIs & Services` > `Library`.
    - Enable the following APIs:
        - Google Drive API
        - Google Photos Library API

3. **Create OAuth 2.0 Credentials**:
    - In the Google Cloud Console, go to `APIs & Services` > `Credentials`.
    - Click on `Create Credentials` and select `OAuth 2.0 Client IDs`.
    - Configure the consent screen and set up your OAuth 2.0 Client ID.
    - Make sure to add `https://yourapp.vercel.app/callback` as an authorized redirect URI.
    - Note down the `Client ID` and `Client Secret`.

4. **Add Your Google Account**:
    - In the Google Drive add-on, select `Add account`.
    - A PIN will be generated. Note this PIN.

5. **Authenticate via Our Application**:
    - Open a web browser and go to `https://yourapp.vercel.app`.
    - Enter the generated PIN
    - Follow the Google authentication steps to grant access to your Google Drive.

    **Note**: As the application is not verified by Google, you may encounter warnings. Proceed with the authentication by acknowledging the warnings.

6. **Complete the Setup**:
    - Once authenticated, return to Kodi.
    - Your Google Drive should now be accessible via the add-on.
