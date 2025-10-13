import Button from '@/components/Button';

export default function AccountSettings() {
    const keycloakBaseUrl = process.env.NEXT_PUBLIC_LOCAL_KEYCLOAK_URL;
    const keycloakRealm = process.env.NEXT_PUBLIC_AUTH_REALM;
    const keycloakUpdatePasswordUrl = `${keycloakBaseUrl}/realms/${keycloakRealm}/account/account-security/signing-in`;
    const keycloakLinkedAccountsUrl = `${keycloakBaseUrl}/realms/${keycloakRealm}/account/account-security/linked-accounts`;
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Change Account Info</h2>
                <div className="mb-2 border-b-2 border-black" />
                <p>Update account password</p>
                <Button
                    href={keycloakUpdatePasswordUrl}
                    width="w-full"
                    type="button"
                    colour="orange"
                >
                    Change password in Keycloak
                </Button>
                <p>Update linked Google account</p>
                <Button
                    href={keycloakLinkedAccountsUrl}
                    width="w-full"
                    type="button"
                    colour="orange"
                >
                    Manage link in Keycloak
                </Button>
            </div>
        </div>
    );
}
