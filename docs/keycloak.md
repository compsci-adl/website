# Keycloak

## Getting started

1. Follow the initial setup for [Keycloak](https://www.keycloak.org/getting-started/getting-started-docker) using Docker.
2. Create a new Realm.

## Committee accounts

1. Go to the realm your created, click on `Realm settings` in the sidebar, and set `Unmanaged Attributes` to `Enabled`.
2. Click on `Client Scopes` in the sidebar and create a client scope with name `isCommittee`.
3. Go to the `Mappers` tab and add a new mapper by configuration with `Name: isCommittee, User Attribute: isCommittee, Token Claim Name: isCommittee, Claim JSON Type: boolean` and ensure `Add to ID token` is enabled.
2. Click on `Users` in the sidebar.
3. Select the user you want and go to the `Attributes` tab.
4. Add the attribute `Key: isCommittee, Value: true`.
