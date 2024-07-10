import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { AuthenticatorRoute } from "@aws-amplify/ui";
import { FC, useEffect, useState } from "react";
import axios from "axios";

interface CustomizedAuthenticatorProps {
  children: React.ReactNode;
}

type AuthGuardProps = CustomizedAuthenticatorProps;

export const CustomizedAuthenticator: FC<CustomizedAuthenticatorProps> = ({
  children,
}) => {
  const { route, user } = useAuthenticator((context) => [context.route]);
  const [preRoute, setPreRoute] = useState<AuthenticatorRoute>("idle");
  console.log(preRoute, route);

  // // Cannot implement because of the unknown error occurs in sign in screen, possibly
  // // because of the dependency conflicts
  // useEffect(() => {
  //   if (preRoute == "transition" && route == "authenticated") {
  //     const accessToken = user.userId;
  //     console.log(accessToken, user.username, user.signInDetails?.loginId);
  //     axios.post(
  //       "http://10.0.2.2:3000/api/v1/user/new",
  //       {
  //         email: user.signInDetails?.authFlowType,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "cognito-token": accessToken,
  //         },
  //       }
  //     );
  //   }
  //   setPreRoute(route);
  // }, [route]);

  return (
    <Authenticator
      Container={(props) => <Authenticator.Container {...props} />}
      components={{
        SignIn: ({ fields, ...props }) => {
          const customizedFields = [...fields];
          customizedFields[0] = {
            name: "username",
            label: "Email",
            placeholder: "Enter your email",
            required: true,
            type: "email",
          };

          return <Authenticator.SignIn {...props} fields={customizedFields} />;
        },

        SignUp: ({ fields, ...props }) => {
          const customizedFields = [...fields];
          customizedFields[0] = {
            name: "username",
            label: "Email",
            placeholder: "Enter your email",
            required: true,
            type: "email",
          };

          customizedFields.push({
            name: "family_name",
            label: "Last Name",
            placeholder: "Enter your last name",
            type: "default",
          });

          customizedFields.push({
            name: "given_name",
            label: "First Name",
            placeholder: "Enter your first name",
            type: "default",
          });

          return <Authenticator.SignUp {...props} fields={customizedFields} />;
        },
      }}
    >
      {children}
    </Authenticator>
  );
};

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  return (
    <Authenticator.Provider>
      <CustomizedAuthenticator>{children}</CustomizedAuthenticator>
    </Authenticator.Provider>
  );
};
