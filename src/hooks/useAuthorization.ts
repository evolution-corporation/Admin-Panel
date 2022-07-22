import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { AuthenticationStatus } from "~constants";
import { authentication } from "~api/user";
import app from "~firebase";

const auth = getAuth(app);

export default function useAuthorization(): {
  authenticationStatus: AuthenticationStatus;
  isRegistration: boolean;
} {
  const [authenticationStatus, setAuthenticationStatus] =
    useState<AuthenticationStatus>(AuthenticationStatus.NONE);
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user != null) {
        const data = await authentication();
        setIsRegistration(data != null);
        setAuthenticationStatus(AuthenticationStatus.AUTHORIZED);
      } else {
        setAuthenticationStatus(AuthenticationStatus.NO_AUTHORIZED);
      }
    });
  }, [setIsRegistration]);

  return { authenticationStatus, isRegistration };
}
