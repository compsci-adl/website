import Button from '@/components/Button';

export default function AccountSettings() {
    const keycloakBaseUrl = process.env.NEXT_PUBLIC_LOCAL_KEYCLOAK_URL;
    const keycloakRealm = process.env.NEXT_PUBLIC_AUTH_REALM;
    const keycloakAccountUrl = `${keycloakBaseUrl}/realms/${keycloakRealm}/account/account-security/signing-in`;
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Change Password</h2>
                <div className="mb-2 border-b-2 border-black" />
                <a href={keycloakAccountUrl} target="_blank" rel="noopener noreferrer">
                    <Button width="w-full" type="button" colour="orange">
                        Change password in Keycloak
                    </Button>
                </a>
            </div>
        </div>
    );
}
