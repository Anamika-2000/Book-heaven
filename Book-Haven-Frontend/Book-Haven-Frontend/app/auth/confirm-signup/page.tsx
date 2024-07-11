'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { confirmSignUp } from 'aws-amplify/auth';
import { getErrorMessage } from '@/lib/errorMessage';

interface ConfirmSignUpInputs {
  code: string;
  email: string;
}

const ConfirmSignUp = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const URIemail = searchParams.get('email');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmSignUpInputs>({
    defaultValues: {
      email: URIemail ?? '',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await confirmSignUp({
        username: data.email ?? '',
        confirmationCode: data.code,
      });
      router.push(
        `/auth/sign-in?email=${encodeURIComponent(data.email ?? '')}`
      );
    } catch (error) {
      setError(getErrorMessage(error));
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm email</h2>
      <p className="text-gray-500">
        We have sent a verification code to your email.
      </p>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Email is required' })}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 bg-gray-100"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="code" className="text-sm font-medium text-gray-700">
          Code
        </label>
        <input
          type="text"
          id="code"
          {...register('code', { required: 'Code is required' })}
          className={`border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 ${
            errors.code ? 'border-red-500' : ''
          }`}
        />
        {errors.code && (
          <span className="text-red-500 text-sm">{errors.code.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Submit
      </button>
      {error && <p className="text-red-400">{error}</p>}
    </form>
  );
};

export default ConfirmSignUp;
