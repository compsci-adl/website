# Keycloak

## Starting Keycloak
1. Navigate to the `keycloak` directory and start Keycloak by running `docker compose up`.
2. Open your browser and go to `http://localhost:8080` to access the Keycloak admin console. Log in using the admin credentials specified in the Docker Compose file.
3. Create a new realm by following these steps:
    - Click on `master` in the sidebar.
    - Click the **Create realm** button.
    - Enter a name for the new realm and save.

## Realm Setup
1. Go to the realm you created and click on **Realm settings** in the sidebar.
2. Click on the **Login** tab and enable the following options:
    - User registration
    - Forgot password
    - Email as username
    - Login with email
    - Verify Email
3. Next, go to the **Email** tab and enter the information for:
    - **From**
    - **From display name**
    - **Host**
    - **Port**
    - Enable **SSL**
    - Toggle **Authentication** and enter your SMTP username and password.

## Client Setup
1. Inside the realm you just created, click on **Clients** in the sidebar and click on the **Create client** button.
2. Set the **Client Id**, enable **Client authentication**, and set all of the following:
    - **Root URL**: `http://localhost:3000/`
    - **Home URL**: `http://localhost:3000/`
    - **Valid redirect URIs**: `http://localhost:3000/*`
    - **Valid post logout redirect URIs**: `http://localhost:3000/*`
    - **Web origins**: `http://localhost:3000/*`
3. Go to the **Credentials** tab and copy the **Client Secret** along with the **Client Id** you set before to the `.env` file in the CS Club website code.

## Admin Accounts
1. Click on **Realm roles** in the sidebar and create a new role called `restricted-access`.
2. Click on **Users** in the sidebar.
3. Select the user you want and go to the **Role mapping** tab.
4. Click on **Filter by clients** to switch to **Filter by realm roles** and click on `restricted-access` to assign the role.
