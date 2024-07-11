// components/AuthLayout.tsx

import React from 'react';
import Image from 'next/image';

const AuthLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side with the image */}
      <div className="flex-1 hidden md:block relative">
        <Image
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
          alt="Auth Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="h-full w-full"
        />
      </div>

      {/* Right side with the form or children */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full px-4">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
