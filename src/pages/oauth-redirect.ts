import type { APIRoute } from 'astro';
import { getAccessToken } from '../lib/fusionauth';

export const get: APIRoute = async function get({ request, cookies, redirect }) {
    const urlSearchParams = new URLSearchParams(request.url.split('?').at(-1));
    const searchParams = Object.fromEntries(urlSearchParams.entries());

    const sessionCookie = cookies.get('session');

    if (!sessionCookie.value) {
        // Fail session
        return {
            body: JSON.stringify({
                failure: 'Missing Session'
            }),
        };
    }

    const session = JSON.parse(sessionCookie.value);
    const stateFromFusionAuth = searchParams.state;
    if (stateFromFusionAuth !== session.stateValue) {
        console.log("State doesn't match. uh-oh.");
        console.log("Saw: " + stateFromFusionAuth + ", but expected: " + session.stateValue);
    }

    try {
        const userResponse = await getAccessToken(searchParams.code, session.verifier)
        session.user = userResponse.response.user;
        cookies.set('session', JSON.stringify(session), { httpOnly: true });
        console.log('Set session cookie to', session)
        return redirect('/', 302)
    } catch (error) {
        return {
            body: JSON.stringify(error),
            status: 404
        };
    }
}