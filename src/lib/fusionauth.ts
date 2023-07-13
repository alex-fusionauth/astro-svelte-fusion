import FusionAuthClient from "@fusionauth/typescript-client";

const client = new FusionAuthClient('noapikeyneeded', import.meta.env.PUBLIC_FUSIONAUTH_URL);

export const getConfig = () => {
    const url = import.meta.env.PUBLIC_FUSIONAUTH_URL;
    const clientId = import.meta.env.PUBLIC_FUSIONAUTH_CLIENT_ID;

    //TODO: ADD CHECKS

    return {
        url,
        clientId
    }
}

export const getAccessToken = async (code: string, verifier: string) => {
    const response = await client.exchangeOAuthCodeForAccessTokenUsingPKCE(
        code,
        import.meta.env.PUBLIC_FUSIONAUTH_CLIENT_ID,
        import.meta.env.FUSIONAUTH_CLIENT_SECRET,
        'http://localhost:3000/oauth-redirect',
        verifier
    );
    const accessToken = response.response.access_token;
    if (!accessToken) {
        throw 'Missing Access Token';
    }
    const user = client.retrieveUserUsingJWT(accessToken);
    return user;
}