
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminSetUserPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";


Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: 'sfsdafdasfasd',
      userPoolId: 'ap-south-sdfsfdsfdsa',
    }
  }
});

const client = new CognitoIdentityProviderClient({
  region: "ap-south-1",
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: "ap-south-1" },
    identityPoolId: "ap-south-1:asfs-fasa-4c80-907f-safasf",
  }),
});

const inputCreateUserEmail = {
  UserPoolId: "ap-south-asfasfasf", 
  Username: "testuser",
  UserAttributes: [
    {
      Name: "email",
      Value: "aaa@bbb.com",
    },
    {
      Name: 'email_verified',
      Value: 'true',
    },
  ],
  MessageAction: 'SUPPRESS',
};

const inputCreateUser = {
  UserPoolId: "ap-south-ssfasfaa", 
  Username: "testuser",
  MessageAction: 'SUPPRESS',
};

const inputUpdatePassword = {
  UserPoolId: "ap-south-safsdfaa",
  Username: "testuser",
  Password: "xxxxxxxxxxxxx",
  Permanent: true,
}

const command = new AdminCreateUserCommand(inputCreateUser);
const commandUpdatePassword = new AdminSetUserPasswordCommand(inputUpdatePassword);
//const response = await client.send(command);

const createUser = async () => {
  try {
    const data = await client.send(command);
    const result = await client.send(commandUpdatePassword);
    console.log("User created successfully", data);
    console.log("User password updated successfully", result);
  } catch (err) {
    console.error("Error creating user", err);
  }
};

export default function App() {
  return (
    <Authenticator  hideSignUp socialProviders={['google', 'facebook']}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={createUser}>Create User</button>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
