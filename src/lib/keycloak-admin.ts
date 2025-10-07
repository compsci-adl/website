import ky from 'ky';

type KeycloakTokenResponse = { access_token?: string; [key: string]: unknown };

export async function getKeycloakAdminToken() {
    const url = `${process.env.NEXT_PUBLIC_CONTAINER_KEYCLOAK_ENDPOINT}/realms/${process.env.NEXT_PUBLIC_AUTH_REALM}/protocol/openid-connect/token`;
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', process.env.AUTH_KEYCLOAK_ID!);
    params.append('client_secret', process.env.AUTH_KEYCLOAK_SECRET!);

    let data: KeycloakTokenResponse;
    try {
        data = await ky
            .post(url, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params.toString(),
            })
            .json<KeycloakTokenResponse>();
    } catch (err) {
        console.error('Failed to fetch Keycloak admin token:', err);
        throw new Error('Failed to get Keycloak admin token (network or server error)');
    }
    if (!data || !data.access_token) {
        console.error('Keycloak token response missing access_token:', data);
        throw new Error('Failed to get Keycloak admin token (no access_token)');
    }
    return data.access_token;
}

export async function updateKeycloakUserName({
    keycloakId,
    firstName,
    lastName,
}: {
    keycloakId: string;
    firstName: string;
    lastName: string;
}) {
    const token = await getKeycloakAdminToken();
    const url = `${process.env.NEXT_PUBLIC_CONTAINER_KEYCLOAK_ENDPOINT}/admin/realms/${process.env.AUTH_REALM}/users/${keycloakId}`;
    let res;
    try {
        res = await ky.put(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            json: { firstName, lastName },
            throwHttpErrors: false,
        });
    } catch (err) {
        console.error('Network error updating Keycloak user:', err);
        throw new Error('Failed to update Keycloak user name (network error)');
    }
    if (!res.ok) {
        let errorBody = '';
        errorBody = await res.text();
        console.error('Keycloak user update failed:', {
            status: res.status,
            statusText: res.statusText,
            body: errorBody,
            url,
            keycloakId,
            firstName,
            lastName,
        });
        throw new Error(
            `Failed to update Keycloak user name: ${res.status} ${res.statusText} ${errorBody}`
        );
    }
    return true;
}
