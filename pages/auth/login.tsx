import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import React from "react";
import { supabase } from "@/utils/client";
import { AuthError } from "@supabase/supabase-js";
import EmailVerification from "@/components/EmailVerification";
import LogoLight from "../../assets/logo-light.svg";
import Image from "next/image";

interface LoginForm {
  email: string;
  password: string;
}

interface TokenResponse {
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    user: {
      id: string;
      aud: string;
      role: string;
      email: string;
      email_confirmed_at: string;
      phone: string;
      confirmation_sent_at: string;
      confirmed_at: string;
      last_sign_in_at: string;
      app_metadata: {
        provider: string;
        providers: string[];
      };
      user_metadata: {};
      identities: {
        id: string;
        user_id: string;
        identity_data: {
          email: string;
          sub: string;
        };
        provider: string;
        last_sign_in_at: string;
        created_at: string;
        updated_at: string;
      }[];
      created_at: string;
      updated_at: string;
    };
    expires_at: number;
  };
  token: string;
}

const schema = yup.object().shape({
  email: yup.string().required("Please fill in the name."),
  password: yup.string().required("Please fill in the password."),
  // .min(8, "Password must be at least 8 characters.")
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  //   "Password must contain at least one number, and uppercase and lowercase letters."
  // ),
});

function Login() {
  const router = useRouter();
  const navigate = router.push;
  const [error, setError] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  useEffect(() => {
    const { registered } = router.query;
    if (registered === "true") {
      setShowEmailVerification(true);
    }
  }, [router.query]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

const handleLogin: SubmitHandler<LoginForm> = async (data) => {
  try {
    const response = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (response.error) {
      throw new Error((response.error as AuthError).message);
    }
    router.push('/board');
  } catch (error: any) {
    console.error("Login error:", error.message);
  }
};

  return (
    <div className="bg-very-dark-grey min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-dark-grey p-6 rounded-md w-full max-w-[480px] flex flex-col items-center">
        <Image src={LogoLight} alt="logo-light" className="mb-6" />
        {/* <h1 className="text-heading-lg mb-6 self-start">Login</h1> */}
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="mb-6">
            <label className="block mb-2 text-body-md">Email</label>
            <input
              type="email"
              mt-1
              placeholder="Enter your email"
              {...register("email")}
              className={`outline-none text-white-custom border ${
                errors.email
                  ? "border-red-custom focus:border-red-custom"
                  : "border-lines-dark"
              }  focus:border-main-purple bg-dark-grey px-3 py-2 rounded w-full text-body-md h-[40px] placeholder:text-white-custom/25`}
            />
            {errors.email && (
              <p className="text-body-md text-red-custom mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-body-md">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className={`outline-none text-white-custom border ${
                errors.password
                  ? "border-red-custom focus:border-red-custom"
                  : "border-lines-dark"
              }  focus:border-main-purple bg-dark-grey px-3 py-2 rounded w-full text-body-md h-[40px] placeholder:text-white-custom/25`}
            />
            {errors.password && (
              <p className="text-body-md text-red-custom mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-main-purple hover:bg-main-purple-hover text-body-md rounded-full px-4 py-2 h-[40px] w-full mb-4"
          >
            Login
          </button>
        </form>
        <span className="text-lines-light text-body-md">
          Do not have account? &nbsp;
          <Link
            href="/auth/register"
            className="text-main-purple hover:underline hover:text-main-purple-hover"
          >
            Register here
          </Link>
        </span>
      </div>
      {showEmailVerification && (
        <EmailVerification onClose={() => setShowEmailVerification(false)} />
      )}
    </div>
  );
}

export default Login;
