import React from 'react';
import Image from 'next/image';
import { Book } from '@/types';
import Link from 'next/link';

export const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 17.27L18.18 21 16.54 14.97 22 10.24 15.81 9.62 12 3 8.19 9.62 2 10.24 7.46 14.97 5.82 21z" />
      </svg>
    );
  }
  return stars;
};
const BookCard: React.FC<Book> = (book: Book) => {
  return (
    <Link href={`/book/${book.id}`}>
      <div className="relative bg-white mb-2 w-64 lg:w-80 h-60 shadow-lg rounded-lg overflow-hidden">
        <Image
          src={book.imageUrl}
          alt={book.title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-60"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className="flex items-center justify-between font-bold text-white text-lg">
            <p>{book.title}</p>
            <div className="flex">{renderStars(book.rating)}</div>
          </div>
          <h3 className="flex justify-between items-center font-semibold mt-2 text-white">
            <div className="flex items-center">
              <Image
                src={book.authorImageUrl}
                alt={book.author}
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="ml-2">{book.author}</span>
            </div>
            <p className="text-sm">${book.price}</p>
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
