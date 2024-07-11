import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/header.png')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-lg"></div>
      <div className="mx-auto max-w-2xl py-48 sm:py-48 lg:py-24 relative z-10">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Discover our new arrivals!{' '}
            <Link href="#" className="font-semibold text-primaryLight">
              <span className="absolute inset-0" aria-hidden="true" />
              Browse now <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="text-center relative z-10">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Books to ignite your imagination
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-200">
            Dive into a world of knowledge and adventure with our curated
            collection of books. From bestsellers to hidden gems, we have
            something for every reader.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#"
              className="rounded-md bg-primaryLight px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryLight"
            >
              Shop Now
            </Link>
            <Link
              href="#"
              className="text-sm font-semibold leading-6 text-gray-200"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
