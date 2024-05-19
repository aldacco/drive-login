export function getGoogleAuthUrl(pin: string, clientId?: string, clientSecret?: string) {
    const params = new URLSearchParams()
    params.append("client_id", clientId ?? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string)
    params.append("redirect_uri", `${process.env.NEXT_PUBLIC_CLIENT_URL}/callback`)
    params.append("state", `${pin}|${clientId}|${clientSecret}`)
    params.append("response_type", "code")
    params.append("scope", "https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/photoslibrary.readonly profile")
    params.append("access_type", "offline")
    params.append("prompt", "consent")

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}