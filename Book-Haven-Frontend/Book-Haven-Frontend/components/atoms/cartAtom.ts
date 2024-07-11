'use client';
import { atom } from 'recoil';
import { Book } from '@/types';
import { localStorageEffect } from './localStorageEffect';

interface CartItem {
  quantity: number;
  details: Book;
}

// Initialize an empty cart
const initialCart: Record<string, CartItem> = {};

// Define the atom for cart state
export const cartState = atom<Record<string, CartItem>>({
  key: 'cartState',
  default: initialCart,
  effects: [localStorageEffect('cart')],
});
