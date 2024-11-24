# Google Drive to Kodi Connection

This guide will help you set up the connection between Google Drive and Kodi using our Next.js application.

## **What's New?**

🚀 **Redis is no longer required!**  
In this updated version of the application, we have simplified deployment by removing the dependency on Redis. You no longer need to configure external caching services or maintain a Redis instance. This change makes it easier than ever to deploy your own instance with minimal configuration.

🔄 **Updated Environment Variable Names**  
As part of this update, we have also updated the names of some environment variables to streamline the configuration process. Be sure to check the new variable names in the documentation or the `.env.example` file to avoid any issues during deployment.

These changes reduce complexity and improve the overall experience of setting up and using the application.


## Important Notice

### **Redis Requirement Removed in v2**
Starting with **v2**, Redis is no longer required for the application to function. The new version (v2) uses an in-memory cache for temporary data, which simplifies the deployment process. If you're using **v1** and still need Redis, please follow the instructions for that version.

- **v1 (Legacy)**: Redis **is required**. Please follow the instructions below to set up Redis.
- **v2 (Current)**: Redis **is no longer required**. Skip Redis setup in this version.


## Prerequisites

- **Kodi Installed**: Ensure you have Kodi installed on your device.
- **Google Drive Add-on**: The Google Drive add-on must be installed from the Kodi add-on repository.


## Deploy Your Own Instance

### 1. Deploy on Vercel

Deploy a basic version of your Next.js application on Vercel to obtain your application's URL.

- **Connect Your Repository**: Go to Vercel and connect your GitHub, GitLab, or Bitbucket repository.
- **Import Your Project**:
  - Click on "New Project".
  - Select your repository and click "Import".
  - Vercel will automatically detect your Next.js application and set it up correctly.

- **Deploy Your Application**:
  - Click "Deploy" to start the deployment process.
  - Once the deployment is complete, note the URL of your application (e.g., `https://your-app.example.vercel.app`).

https://github.com/user-attachments/assets/e45f0a48-a3b3-4333-8167-c7db699102e6

### 2. Enable Google APIs and Create OAuth 2.0 Credentials

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

### 3. Update Environment Variables in Vercel

Now that you have your Google credentials, update the environment variables in Vercel.

- **Set Up Environment Variables**:
  - **`GOOGLE_CLIENT_ID`**: Your client ID from Google.

    Example: `GOOGLE_CLIENT_ID='your-client-id'`

  - **`GOOGLE_CLIENT_SECRET`**: Your client secret from Google.

    Example: `GOOGLE_CLIENT_SECRET='your-client-secret'`

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

