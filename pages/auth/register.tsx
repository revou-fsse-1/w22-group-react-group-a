import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import Link from 'next/link';
import React from 'react';

interface RegisterForm {
    email: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().required('Please fill in the name.'),
    password: yup.string()
    .required('Please fill in the password.')
    .min(8, 'Password must be at least 8 characters.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least one number, and uppercase and lowercase letters.')
});

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
        resolver: yupResolver(schema),
    });
    const router = useRouter();
    const navigate = router.push;
    const handleRegister: SubmitHandler<RegisterForm> = async (data) => {
        try {
            const response = await fetch('link menuju supabase', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type:': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                navigate('/login');
            } else {
                const { error } = await response.json();
                throw new Error('Error encountered. Please try again.')
            }
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <div className='bg-very-dark-grey min-h-screen flex items-center justify-center'>
            <div className='bg-dark-grey p-6 rounded shadow-lg'>
                <h1 className='text-heading-lg mb-4'>Registration Form</h1>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className='mb-4'>
                        <label className='block mb-2 text-heading-md'>Email:</label>
                        <input
                        type="text"
                        placeholder="Enter your email..."
                        {...register('email')}
                        className='border border-light-grey px-3 py-2 rounded w-full text-body-md text-white'
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 text-heading-md'>Password:</label>
                        <input
                        type="text"
                        placeholder="Enter your password..."
                        {...register('password')}
                        className='border border-light-grey px-3 py-2 rounded w-full text-body-md text-white'
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="bg-main-purple hover:bg-main-purple-hover text-white rounded px-4 py-2">
                        Register
                    </button>
                </form>
                <span className="text-lines-light text-body-md">Already have an account?</span>
                <span>
                    <Link href="/auth/login" className="text-body-md">
                        Login here
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default Register