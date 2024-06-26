'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const login = (access_token : string) => {
    cookies().set('access_token' , access_token , {
        httpOnly:true, 
        secure:process.env.NODE_ENV === 'production',
        maxAge:60 * 60 * 24 * 7,
        path:'/'
    })
    redirect("/");
}

export const logout = () => {
    cookies().delete('access_token')
    redirect("/login");
   
}