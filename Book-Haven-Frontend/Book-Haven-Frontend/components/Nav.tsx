'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { FaArrowDown, FaArrowUp, FaShoppingCart } from 'react-icons/fa';
import { cartState } from './atoms/cartAtom';
import { userState } from './atoms/userAtom';
import { signOut } from 'aws-amplify/auth';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/lib/errorMessage';

const Nav = () => {
  const [cartItems] = useRecoilState(cartState); // State for cart items
  const [user, setUser] = useRecoilState(userState); // State for user
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      setIsPopoverOpen(false);
      setUser({ username: null });
    } catch (error) {
      toast(getErrorMessage(error));
    }
  };

  const totalCount = Object.values(cartItems).reduce(
    (acc, currentItem) => acc + currentItem.quantity,
    0
  );

  if (!isClient) {
    return;
  }

  return (
    <nav
      className="flex items-center justify-between p-3 lg:px-4 bg-gray-50"
      aria-label="Global"
    >
      <div className="flex lg:flex-1">
        <Link href="/">
          <p className="font-bold text-xl text-gray-900 cursor-pointer">
            Book Haven
          </p>
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link href="/cart">
          <div className="flex items-center space-x-2 ml-4 px-3 py-1.5 rounded-full bg-primary text-white text-sm cursor-pointer">
            <FaShoppingCart className="text-white" size={24} />
            <span>{totalCount}</span>
          </div>
        </Link>
        <div className="relative hidden lg:flex lg:flex-1 lg:justify-end text-gray-900">
          {user?.username ? (
            <div>
              <button
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                className="cursor-pointer flex items-center space-x-2 w-48"
              >
                <p>{user.username}</p>
                {isPopoverOpen ? <FaArrowUp /> : <FaArrowDown />}
              </button>
              {isPopoverOpen && (
                <div className="absolute z-10 right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth/sign-in" className="cursor-pointer">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
