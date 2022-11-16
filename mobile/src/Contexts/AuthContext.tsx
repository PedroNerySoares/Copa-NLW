import { createContext, ReactNode, useState, useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession();

export interface UserProps {
  name: string;
  avatarUrl: string;
}
export interface AuthContextDataProps {
  user: UserProps;
  isUserLoadind: boolean;
  signIn: () => Promise<void>;
}
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [isUserLoadind, setIsUserLoadind] = useState(false);

  const [request, response, prompAsync] = Google.useAuthRequest({
    clientId:'904551769342-mq3p6sgvai7ticnsrsruiorcnf7h2osd.apps.googleusercontent.com',
    // clientId:process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  // console.log(AuthSession.makeRedirectUri({ useProxy: true }));

  async function signIn() {
    // console.log("vamos logar");
    try {
      setIsUserLoadind(true);
      await prompAsync();
    } catch (error) {
      setIsUserLoadind(false);
      console.log(error);
      throw error;
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoadind(true);

      const tokenResponse =await api.post('/users',{access_token})
      // console.log(tokenResponse.data)
      api.defaults.headers.common['Authorization']=`Bearer ${tokenResponse.data.token}`;

      const userInfoResponse = await api.get('/me');
      setUser(userInfoResponse.data.user);
      console.log(userInfoResponse.data);



    } catch (error) {
      console.log(error);
      throw error;
    
    } finally {
      setIsUserLoadind(false);
    
    }
  }
  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      // console.log(response.authentication.accessToken);
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);
  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoadind,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
