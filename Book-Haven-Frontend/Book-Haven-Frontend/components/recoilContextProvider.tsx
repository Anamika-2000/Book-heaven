'use client';
import React from 'react';
import { RecoilRoot } from 'recoil';

const RecoilContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilContextProvider;
