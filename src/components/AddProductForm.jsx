import React from 'react'
import { useState } from 'react';

function AddProductForm() {
    const [productName, setProductName] = useState('');
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200" id='orders'>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select className="form-input">
              <option>Select category</option>
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Fertilizers</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Product name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g., Tomato (Heirloom)"
                className="form-input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              type="text"
              placeholder="Enter price (per kg/bag)"
              className="form-input"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Min order quantity
            </label>
            <input
              type="text"
              placeholder="Enter minimum quantity"
              className="form-input"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Stop selling before
            </label>
            <input
              type="text"
              placeholder="Select date & time"
              className="form-input"
              onFocus={(e) => (e.target.type = 'datetime-local')}
              onBlur={(e) => (e.target.type = 'text')}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Stock status
            </label>
            <select className="form-input">
              <option>In stock</option>
              <option>Out of stock</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Set to Out of stock when unavailable
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Upload image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                  >
                    <span>Choose a product image</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm">
            Add Product
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProductForm
