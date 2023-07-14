import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import React from 'react';
import EmailVerification from '@/components/EmailVerification';

interface LoginForm {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('Please fill in the name.'),
  password: yup
    .string()
    .required('Please fill in the password.')
    .min(8, 'Password must be at least 8 characters.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least one number, and uppercase and lowercase letters.'
    ),
});

function Login() {
  const router = useRouter();
  const navigate = router.push;
  const [error, setError] = useState('');
  const [showEmailVerification, setShowEmailVerification] = useState(false);

  useEffect(() => {
    const { registered } = router.query;
    if (registered === 'true') {
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
      const response = await fetch('link menuju supabase', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setShowEmailVerification(true);
        navigate('/board');
      } else {
        const { error } = await response.json();
        throw new Error('Failed to login. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-very-dark-grey min-h-screen flex items-center justify-center">
      <div className="bg-dark-grey p-6 rounded shadow-lg">
        <h1 className="text-heading-lg mb-4">Login Form</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label className="block mb-2 text-heading-md">Email:</label>
            <input
              type="text"
              placeholder="Enter your email..."
              {...register('email')}
              className="border border-light-grey px-3 py-2 rounded w-full text-body-md text-white"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-heading-md">Password:</label>
            <input
              type="password"
              placeholder="Enter your password..."
              {...register('password')}
              className="border border-light-grey px-3 py-2 rounded w-full text-body-md text-white"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <button type="submit" className="bg-main-purple hover:bg-main-purple-hover text-white rounded px-4 py-2">
            Login
          </button>
        </form>
        <span className="text-lines-light text-body-md">Don't have account?</span>
        <span>
          <Link href="/auth/register" className="text-body-md">
            Register here
          </Link>
        </span>
      </div>
      {showEmailVerification && <EmailVerification onClose={() => setShowEmailVerification(false)} />}
    </div>
  );
}

export default Login
