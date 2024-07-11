'use client';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { renderStars } from '@/components/BookCard';
import { cartState } from '@/components/atoms/cartAtom';
import axiosInstance from '@/services/axiosInstance';
import { userState } from '@/components/atoms/userAtom';

const Cart: React.FC = () => {
  const [user] = useRecoilState(userState);
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to handle quantity change
  const handleQuantityChange = (bookId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      toast.error('Quantity must be at least 1');
      return;
    }
    const updatedCart = {
      ...cartItems,
      [bookId]: {
        ...cartItems[bookId],
        quantity: newQuantity,
      },
    };
    console.log({ cartItems, updatedCart });

    setCartItems(updatedCart);
  };

  // Function to remove item from cart
  const removeItem = (bookId: string) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[bookId];
    setCartItems(updatedCart);
    toast.error('Removed from cart!');
  };

  // Calculate total price of items in cart
  const totalPrice = Object.values(cartItems).reduce(
    (acc, currentItem) =>
      acc + currentItem.quantity * Number(currentItem.details.price),
    0
  );

  const handleBuy = async () => {
    try {
      const response = await axiosInstance.post('/payment', {
        userEmail: user.username, // Replace with user's email or fetch from auth context
        amount: totalPrice,
      });

      console.log(response.data); // Log or process response from payment API

      // Clear cart items after successful purchase
      setCartItems({});

      toast.success('Purchase successful!');
    } catch (error) {
      console.error('Error purchasing:', error);
      toast.error('Failed to complete purchase');
    }
  };

  if (!isClient) {
    return;
  }

  return (
    <div className="container mx-auto px-4 min-h-screen py-8">
      <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems &&
          Object.keys(cartItems).map((bookId) => {
            const { details, quantity } = cartItems[bookId];

            return (
              <div
                key={bookId}
                className="border border-gray-200 p-4 rounded-md flex flex-col md:flex-row items-center"
              >
                <div className="flex flex-col items-center mr-4">
                  <button
                    onClick={() => handleQuantityChange(bookId, quantity + 1)}
                    className="border border-gray-300 w-16 rounded-md px-2 py-1 text-center"
                  >
                    +
                  </button>
                  <input
                    type="number"
                    className="border border-gray-300 w-16 font-semibold rounded-md py-2 pl-3 text-center my-2"
                    value={quantity ?? 1}
                    onChange={(e) =>
                      handleQuantityChange(bookId, parseInt(e.target.value))
                    }
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(bookId, quantity - 1)}
                    className="border border-gray-300 w-16 rounded-md px-2 py-1 text-center"
                  >
                    -
                  </button>
                </div>
                <div className="w-32 h-48 relative mb-4 md:mb-0 md:mr-4">
                  <Image
                    src={details.imageUrl}
                    alt={details.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <h2 className="text-xl font-semibold">{details.title}</h2>
                  <p className="text-gray-600">{details.author}</p>
                  <div className="flex h-16">{renderStars(details.rating)}</div>
                </div>
                <p className="text-lg px-8 font-semibold text-gray-600">
                  Price: ${details.price.toFixed(2) ?? 0}
                </p>
                <button
                  onClick={() => removeItem(bookId)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash size={24} />
                </button>
              </div>
            );
          })}
      </div>
      <p className="text-gray-600 mt-4 font-semibold text-xl">
        Total price: ${totalPrice.toFixed(2)}
      </p>
      <button
        onClick={handleBuy}
        className="lg:ml-4 my-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
      >
        Buy
      </button>
    </div>
  );
};

export default Cart;
