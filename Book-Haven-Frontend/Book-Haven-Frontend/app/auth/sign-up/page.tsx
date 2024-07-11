'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getErrorMessage } from '@/lib/errorMessage';
import { signUp } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

interface SignUpFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormInputs>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
          },
          // optional
          autoSignIn: true,
        },
      });
      console.log(res);
      router.push(
        `/auth/confirm-signup?email=${encodeURIComponent(data.email)}`
      );
    } catch (error) {
      setError(getErrorMessage(error));
    }
  });

  // Watch password and confirmPassword for validation
  const password = watch('password', '');

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h2>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Email is required' })}
          className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
            },
          })}
          className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
            errors.password ? 'border-red-500' : ''
          }`}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
          className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
            errors.confirmPassword ? 'border-red-500' : ''
          }`}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Sign Up
      </button>
      {error && <p className="text-red-400">{error}</p>}
      {/* Sign In Link */}
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/auth/sign-in" className="text-primary">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
