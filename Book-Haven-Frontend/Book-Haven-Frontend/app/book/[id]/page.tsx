'use client';
import React, { useEffect, useState } from 'react';
import { Book } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { cartState } from '@/components/atoms/cartAtom';
import axiosInstance from '@/services/axiosInstance';

const BookDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [book, setBook] = useState<Book | undefined>(undefined);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(`/books/${params.id}`);
        setBook(response.data.book); // Assuming your API returns the book data
      } catch (error) {
        console.error('Error fetching book:', error);
        // Handle error fetching data, e.g., redirect to an error page
      }
    };

    fetchBook();
  }, [params.id]);

  if (!book) {
    return <div>Book not found</div>;
  }

  const addToCart = () => {
    const existingItem = cartItems[params.id];

    if (existingItem) {
      // Item already exists in cart, increase quantity
      setCartItems({
        ...cartItems,
        [params.id]: {
          quantity: existingItem.quantity + 1,
          details: book,
        },
      });
    } else {
      // Item does not exist in cart, add with quantity 1
      setCartItems({
        ...cartItems,
        [params.id]: {
          quantity: 1,
          details: book,
        },
      });
    }
    toast.success('Added to cart!');
  };

  const removeFromCart = () => {
    const updatedCart = { ...cartItems };
    const existingItem = updatedCart[book.id];

    if (existingItem) {
      if (existingItem.quantity === 1) {
        // If quantity is 1, remove the item from cart
        delete updatedCart[book.id];
      } else {
        // Decrease quantity by 1
        updatedCart[book.id] = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
      }

      setCartItems(updatedCart);
      toast.error('Removed from cart!');
    }
  };

  const buyNow = () => {
    const existingItem = cartItems[book.id];

    if (!existingItem) {
      setCartItems({
        ...cartItems,
        [book.id]: {
          quantity: 1,
          details: book,
        },
      });
    }

    router.push('/cart');
  };

  return (
    <div className="min-h-screen lg:flex">
      <div className="flex-1 hidden md:block relative">
        <Image
          src={book.imageUrl}
          alt="Book Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="h-full w-full"
        />
      </div>
      {/* Right side with book details */}
      <div className="flex-1 flex flex-col justify-center p-12">
        <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
        <div className="flex items-center mb-4">
          <Image
            src={book.authorImageUrl}
            alt={book.author}
            width={50}
            height={50}
            className="rounded-full mr-2"
          />
          <p className="text-gray-600 text-sm">{book.author}</p>
        </div>
        <p className="text-gray-600 text-sm mb-2">
          Publication Date: {book.date}
        </p>
        <p className="text-gray-700 my-6">{book.description}</p>
        <p className="text-xl font-bold text-primary">${book.price}</p>

        <div className="lg:flex items-center mt-8">
          <div className="lg:flex items-center">
            <div className="my-2">
              <label
                htmlFor={`quantity`}
                className="mr-2 text-xl font-semibold"
              >
                Quantity:
              </label>
              <button
                onClick={removeFromCart}
                className="border border-gray-300 rounded-l-md px-2 py-2 text-center"
              >
                -
              </button>
              <input
                type="number"
                className="border border-gray-300 py-2 pl-3 w-12 text-center"
                value={cartItems[params.id]?.quantity ?? 0}
                onChange={() => {}}
                min="1"
                readOnly
              />
              <button
                onClick={addToCart}
                className="border border-gray-300 rounded-r-md px-2 py-2 text-center"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={buyNow}
            className="lg:ml-4 my-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
