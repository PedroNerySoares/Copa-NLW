// import { createContext, ReactNode } from "react";


// interface UserProps{
//   name: String,
//   avatarUrl:string,
// }
// export interface AuthContextDataProps{
//   user: UserProps,
//   signIn: ()=>Promise<void>
// }

// interface AuthProviderProps{
//   children: ReactNode;
// }

// export  const AuthContext = createContext({} as AuthContextDataProps);
// export function AuthContextProvider({children}:AuthProviderProps){
  
//   async function signIn(){
//     console.log("vamos logar")
//   }
  
  
//   return(
//     <AuthContext.Provider value={{
//       signIn,
//       user:{
//         name:'Pedro',
//         avatarUrl:'https://github.com/PedroNerySoares.png'
//       }
//     }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

import { createContext, ReactNode, useState, useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
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
    clientId:"904551769342-mq3p6sgvai7ticnsrsruiorcnf7h2osd.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  console.log (AuthSession.makeRedirectUri({useProxy:true}))

  async function signIn() {
    console.log("vamos logar")
    try {
      setIsUserLoadind(true);
      await prompAsync();
    } catch (error) {
      setIsUserLoadind(false);
      console.log(error);
      throw error;
    }
  }

  async function signInWithGoogle(acces_token:string) {
    console.log("token===>",acces_token)
  }
  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      console.log(response.authentication.accessToken)
      signInWithGoogle(response.authentication.accessToken)
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
