'use server'

import { signIn, signOut } from "@/auth";

interface UserInfo{
  username:string,
  password:string,
}

export async function doCredentialLogin(user:UserInfo) {
    console.log("formData", user);
  
    try {
      const response = await signIn("credentials", {
        username: user.username,
        password: user.password,
        redirect: false,
      });
      return response;
    } catch (err:any) {
      console.log(err.message)
    }
  }

  export async function doSocialLogin(formData:FormData) {
    const action = formData.get('action')
    await signIn(action?.toString(), { redirectTo: "/dashboard" });
}


  export async function doLogout() {
    await signOut({ redirectTo: "/auth/login" });
  }