export type Token = {
    access_token: string,
    refresh_token: string,
    scope: string,
    id_token: string,
    token_type: string,
    expires_in: string,
}

export type UserData = {
    owner?: string,
    password: string,
    pin: string,
    provider?: string,
    token?: Token,
}