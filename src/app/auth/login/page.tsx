"use client";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schemas/login";
import { doCredentialLogin ,doSocialLogin} from "@/app/actions";

export default function Login() {
  const router = useRouter();
  const [user,setUser] = useState({
  username:'',
  password:''
 })
  const [error, setError] = useState('');

  async function onLogin(event:FormEvent) {
    event.preventDefault();  // Prevent the default form submission behavior

    try {
      
      // Validate form data with Zod schema
      loginSchema.parse(user);

      // If validation passes, proceed to login
      const response = await doCredentialLogin(user)
       if(!response){
        setError('somthing wrong internally,Try again')
       }
       else{
        router.push("/dashboard");

       }

    } catch (error:any) {
      if (error.errors) {
        // Zod validation errors
        setError(error.errors.map((err:any) => err.message).join(", "));
      } else {
        // Other errors (e.g., login failure)
        setError('Login failed: Wrong Credentials ');
      }
    }
  }

  return (
    <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex justify-center mx-auto">
        <img
          className="w-auto h-7 sm:h-8"
          src=""
          alt="Logo"
        />
      </div>

      <form className="mt-6" onSubmit={onLogin}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm text-gray-800 dark:text-gray-200"
          >
            Username
          </label>
          <input
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={user.username}
            onChange={e=>setUser({...user,username:e.target.value})}
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
            >
              Forget Password?
            </a>
          </div>

          <input
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={user.password}
            onChange={e=>setUser({...user,password:e.target.value})}
          />
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-6">
          <button type="submit" className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            Sign In
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
        <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
          or login with Social Media
        </span>
        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
      </div> 
      <form action={doSocialLogin}>
      <div className="flex items-center mt-6 -mx-2">
        <button
          type="submit" name="action" value="github"
          className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
        >
          <i className="bi bi-github"></i>
          
          <span className="hidden mx-2 sm:inline">Sign in with Github</span>
        </button>
      </div>
      </form>

      

      <p className="mt-8 text-xs font-light text-center text-gray-400">
        {" "}
        Don't have an account?{" "}
        <a
          href="#"
          className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
        >
          Create One
        </a>
      </p>
    </div>
  );
}
