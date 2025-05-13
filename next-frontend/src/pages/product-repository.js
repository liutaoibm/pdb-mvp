import React from 'react';
import Layout from '../app/layout';

const ProductRepository = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Product Repository</h1>
        <div className="p-4 border rounded-lg shadow-sm bg-white">
          <div className="mb-4">
            <label className="block text-gray-700">Search Products</label>
            <input type="text" className="border p-2 w-full" placeholder="Search..." />
          </div>
          <div className="mt-4">
            <h3>Products</h3>
            <ul>
              <li className="py-2">Sapphire Wellness</li>
              <li className="py-2">Gold Wellness</li>
              <li className="py-2">Silver Wellness</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductRepository;
