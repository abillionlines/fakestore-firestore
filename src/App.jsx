import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        {activeTab === 'home' ? (
          <ProductList />
        ) : (
          <Cart />
        )}
      </main>

      <footer className="bg-white border-t border-gray-100 py-10 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 font-medium leading-relaxed">
            &copy; 2026 FakeStore Redux App. Powered by React Query & Redux Toolkit.
            <br />
            <span className="text-xs text-gray-400 mt-2 block italic text-center">
              * Note: Checkout is simulated by clearing state and sessionStorage.
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
