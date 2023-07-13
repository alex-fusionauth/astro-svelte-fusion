import type { APIRoute } from 'astro';
import { getAccessToken } from '../lib/fusionauth';

export const get: APIRoute = async function get({ request, cookies, redirect }) {
    cookies.delete('session');
    return redirect('/')
}