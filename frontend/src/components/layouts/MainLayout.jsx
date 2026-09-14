import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import FloatingButtons from '../common/FloatingButtons/FloatingButtons';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <FloatingButtons />
      <Footer />
    </>
  );
};

export default MainLayout;
