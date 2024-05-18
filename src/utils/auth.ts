export function getGoogleAuthUrl(pin: string) {
    const client_id = `client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`
    const redirect_uri = `redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_URL}/callback`
    const state = `state=${pin}`
    const response_type = `response_type=code`
    const scope = `scope=https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/photoslibrary.readonly profile`
    const access_type = `access_type=offline`
    const prompt = `prompt=consent`

    const url = `https://accounts.google.com/o/oauth2/v2/auth?${client_id}&${redirect_uri}&${state}&${response_type}&${scope}&${access_type}&${prompt}`
    return url
}