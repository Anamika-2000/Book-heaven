'use client';
import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { Book } from '@/types';
import axiosInstance from '@/services/axiosInstance';

const BookByCategories: React.FC = () => {
  const [booksByCategories, setBooksByCategories] = useState<
    Record<string, Book[]>
  >({});
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books');
        const books: Book[] = response.data.body;
        console.log({ books });
        const categorizedBooks: Record<string, Book[]> = {};

        books.forEach((book) => {
          if (!categorizedBooks[book.category]) {
            categorizedBooks[book.category] = [];
          }
          categorizedBooks[book.category].push(book);
        });

        setBooksByCategories(categorizedBooks);
        setCategories(Object.keys(categorizedBooks));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="flex lg:flex-wrap mx-auto flex-col justify-between w-full items-center lg:p-12">
      {categories.map((category) => (
        <div key={category} className="mb-8 w-full">
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-bold mb-4 text-gray-800">{category}</h2>
            <button className="text-gray-500 text-xs">
              View all {'>'}
              {'>'}
            </button>
          </div>

          <div className="flex mx-auto lg:px-20 justify-center items-center lg:justify-between flex-wrap">
            {booksByCategories[category].map((book) => (
              <div key={book.id}>
                <BookCard {...book} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookByCategories;
