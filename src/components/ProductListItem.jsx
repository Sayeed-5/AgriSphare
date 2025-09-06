import React from 'react'

function ProductListItem() {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
            <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
                <p className="font-bold text-gray-800">{product.name}</p>
                <p className="text-xs text-gray-500">
                Category: {product.category} • Min order: {product.minOrder}
                </p>
                <p className="text-xs text-gray-500">
                Stop selling: {product.stopSelling} • Price: ₹{product.price}/
                {product.name.toLowerCase().includes('npk') ? 'bag' : 'kg'}
                </p>
            </div>
            </div>
            <div className="flex items-center gap-3">
            <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                product.inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
            >
                {product.inStock ? 'In stock' : 'Out of stock'}
            </span>
            <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm">
                Edit
            </button>
            <button className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm">
                Close
            </button>
            </div>
        </div>
    )
}

export default ProductListItem
