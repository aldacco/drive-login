# Google Drive to Kodi Connection

This guide will help you set up the connection between Google Drive and Kodi using our Next.js application.

## Prerequisites

- **Kodi Installed**: Ensure you have Kodi installed on your device.
- **Google Drive Add-on**: The Google Drive add-on must be installed from the Kodi add-on repository.

## Warning

**Important**: This application is not verified by Google, which means there will be additional steps during the authentication process. See the "Deploy Your Own Instance" section for more details on configuring environment variables and deploying your service.

## Deploy Your Own Instance

### 1. Set Up Upstash Redis

- **Create an Upstash Account**: Go to Upstash and create an account.
- **Create a Redis Database**:
  - Once logged in, navigate to the dashboard and create a new Redis database.
  - Copy the connection string provided by Upstash; it will look something like this: `rediss://default:<password>@<your-upstash-url>:<port>`.
  - Use this connection string as the value for the `NEXT_PUBLIC_REDIS_CONNECTION` environment variable in Vercel.
  
> [!WARNING]  
> **Important**: **You must use `rediss://` instead of `redis://` to ensure the connection is secured with SSL/TLS.**
> This ensures that data transmitted between your application and Redis is encrypted, protecting against attacks and maintaining the integrity of the information.
> 
> **Correct Example**: `NEXT_PUBLIC_REDIS_CONNECTION='rediss://default:<password>@<your-upstash-url>:<port>'`
  
https://github.com/user-attachments/assets/38eebc0d-3036-4edb-9b4a-febca1a6ff84

### 2. Deploy on Vercel

Deploy a basic version of your Next.js application on Vercel to obtain your application's URL.

- **Connect Your Repository**: Go to Vercel and connect your GitHub, GitLab, or Bitbucket repository.
- **Import Your Project**:
  - Click on "New Project".
  - Select your repository and click "Import".
  - Vercel will automatically detect your Next.js application and set it up correctly.
- **Configure Temporary Environment Variables**:
  - Temporarily add the necessary environment variables except for Google credentials.
  - Example: Only set up `NEXT_PUBLIC_REDIS_CONNECTION`.
- **Deploy Your Application**:
  - Click "Deploy" to start the deployment process.
  - Once the deployment is complete, note the URL of your application (e.g., `https://your-app.example.vercel.app`).

https://github.com/user-attachments/assets/e45f0a48-a3b3-4333-8167-c7db699102e6

### 3. Enable Google APIs and Create OAuth 2.0 Credentials

- **Create OAuth 2.0 Credentials**:
  - In the Google Cloud Console, go to APIs & Services > Credentials.
  - Click on Create Credentials and select OAuth 2.0 Client IDs.
  - Configure the consent screen and set up your OAuth 2.0 Client ID.
  - Add `https://your-app.example.vercel.app` as an authorized domain.
  - Add `https://your-app.example.vercel.app/callback` as an authorized redirect URI.
  - Note down the Client ID and Client Secret.

  https://github.com/user-attachments/assets/1413b6ce-f267-47b3-963c-c10a26798969
  
- **Enable Google APIs**:
  - Go to the Google Cloud Console.
  - Create a new project or select an existing project.
  - Go to APIs & Services > Library.
  - Enable the following APIs:
    - Google Drive API
    - Google Photos Library API

### 4. Update Environment Variables in Vercel

Now that you have your Google credentials, update the environment variables in Vercel.

- **Set Up Environment Variables**:
  - **`NEXT_PUBLIC_CLIENT_ID`**: Your client ID from Google.

    Example: `NEXT_PUBLIC_CLIENT_ID='your-client-id'`

  - **`NEXT_PUBLIC_CLIENT_SECRET`**: Your client secret from Google.

    Example: `NEXT_PUBLIC_CLIENT_SECRET='your-client-secret'`

  - **`NEXT_PUBLIC_REDIS_CONNECTION`**: The connection string to your Upstash Redis instance.

    Example: `NEXT_PUBLIC_REDIS_CONNECTION='rediss://default:<password>@<your-upstash-url>:<port>'`

https://github.com/user-attachments/assets/c1c43983-9cc4-4744-94a6-fdcfb7ddfe6c

## Complete the Kodi Setup

### 1. Install Google Drive Add-on

- Open Kodi.
- Go to Add-ons > Download > Video add-ons.
- Search for and install the Google Drive add-on.

### 2. Modify Add-on Settings

- Open Kodi and go to Add-ons > My add-ons > Video add-ons > Google Drive.
- Click on Configure.
- In the Advanced tab, find the Source property.
- Change the Source URL to: `https://your-app.example.vercel.app`.
- Save the changes.

> [!WARNING]  
> **Do not include the trailing slash (`/`)** at the end of the URL (e.g., `https://your-app.example.vercel.app/`). Adding the trailing slash may cause connection issues with the server, and the add-on might not function properly.
>
> Make sure the URL is set exactly as: **`https://your-app.example.vercel.app`**.

## Authenticate via Our Application

- **Add Your Google Account**:
  - In the Google Drive add-on, select Add account.
  - A PIN will be generated. Note this PIN.

- **Authenticate via Our Application**:
  - Open a web browser and go to `https://your-app.example.vercel.app`.
  - Enter the generated PIN.
  - Follow the Google authentication steps to grant access to your Google Drive.
  - Note: As the application is not verified by Google, you may encounter warnings. Proceed with the authentication by acknowledging the warnings.

## Complete the Setup

- Once authenticated, return to Kodi.
- Your Google Drive should now be accessible via the add-on.

