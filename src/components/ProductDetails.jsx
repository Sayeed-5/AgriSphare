import React, { useState } from 'react';

// --- Icon Components (using inline SVG for single-file compatibility) ---

const StarIcon = ({ className, filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const CheckCircleIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);


// --- Main App Component ---

function ProductDetails() {
  const [quantity, setQuantity] = useState(50);

  const product = {
    name: "Tomato (Grade A)",
    imageUrl: "https://images.unsplash.com/photo-1561138972-66c36191b619?q=80&w=1935&auto=format&fit=crop",
    rating: 4.6,
    reviews: 210,
    price: 28,
    minOrder: 50,
    tags: ["Vegetables", "In stock", "Fast delivery"],
    details: {
        origin: "Hosur, Tamil Nadu",
        variety: "Hybrid",
        cultivationType: "Organic",
        shelfLife: "7-10 days",
        description: "Fresh, juicy, and organically grown Grade A tomatoes. Perfect for salads, sauces, and curries. Sourced directly from trusted farms to ensure the best quality and taste."
    }
  };

  const seller = {
    name: "GreenField Produce",
    isCertified: true,
    platformYears: 3,
    rating: 4.8,
    totalReviews: 1200,
    location: "Hosur, TN",
    fulfilledBy: "Local network",
    responseTime: "~2 hours",
    returnPolicy: "48h after delivery",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Left Side: Product Image and Details */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Product Image */}
                    <div className="md:w-1/2">
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full aspect-square object-cover rounded-xl shadow-md" 
                        />
                    </div>

                    {/* Product Info */}
                    <div className="md:w-1/2 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                            {product.tags.map(tag => (
                                <span key={tag} className={`text-xs font-medium px-3 py-1 rounded-full ${
                                    tag === 'In stock' ? 'bg-green-100 text-green-800' :
                                    tag === 'Fast delivery' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <div className="flex items-center gap-2 mt-2 mb-4">
                            <div className="flex items-center text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className="w-5 h-5" filled={i < Math.round(product.rating)} />
                                ))}
                            </div>
                            <span className="text-gray-600 font-medium">{product.rating}</span>
                            <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
                        </div>
                        
                        <div className="text-4xl font-extrabold text-gray-800 mb-2">
                            ₹{product.price} <span className="text-lg font-medium text-gray-500">per kg</span>
                        </div>

                        <div className="text-sm text-gray-500 mb-1">Minimum order quantity: {product.minOrder} kg</div>
                        <div className="text-sm text-gray-500 mb-6">Seller rating protection and quality checked</div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-auto">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Enter quantity (kg)</label>
                            <input 
                                type="number" 
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                min={product.minOrder}
                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                placeholder={`e.g., ${product.minOrder}`}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <button className="w-full px-4 py-3 text-center font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all duration-300">
                                Ask seller
                            </button>
                            <button className="w-full px-4 py-3 text-center font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-sm">
                                Contact logistics
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Product details</h2>
                <div className="space-y-4">
                    <p className="text-gray-600">{product.details.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-semibold text-gray-800">Origin</p>
                            <p className="text-gray-500">{product.details.origin}</p>
                        </div>
                         <div>
                            <p className="font-semibold text-gray-800">Variety</p>
                            <p className="text-gray-500">{product.details.variety}</p>
                        </div>
                         <div>
                            <p className="font-semibold text-gray-800">Cultivation Type</p>
                            <p className="text-gray-500">{product.details.cultivationType}</p>
                        </div>
                         <div>
                            <p className="font-semibold text-gray-800">Shelf Life</p>
                            <p className="text-gray-500">{product.details.shelfLife}</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Side: Owner/Seller Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                <div className="flex items-center gap-4 mb-4">
                    <img src={seller.avatarUrl} alt={seller.name} className="w-16 h-16 rounded-full object-cover"/>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{seller.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            {seller.isCertified && <CheckCircleIcon className="w-4 h-4 text-green-600"/>}
                            <span>Certified • {seller.platformYears} yrs on platform</span>
                        </div>
                         <div className="flex items-center gap-1 mt-1">
                            <StarIcon className="w-4 h-4 text-yellow-500" filled={true}/>
                            <span className="text-sm font-semibold text-gray-700">{seller.rating}</span>
                            <span className="text-sm text-gray-500">({(seller.totalReviews / 1000).toFixed(1)}k ratings)</span>
                        </div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm my-6">
                    <div>
                        <p className="text-gray-500">Location</p>
                        <p className="font-semibold text-gray-800">{seller.location}</p>
                    </div>
                     <div>
                        <p className="text-gray-500">Fulfilled by</p>
                        <p className="font-semibold text-gray-800">{seller.fulfilledBy}</p>
                    </div>
                     <div>
                        <p className="text-gray-500">Response time</p>
                        <p className="font-semibold text-gray-800">{seller.responseTime}</p>
                    </div>
                     <div>
                        <p className="text-gray-500">Return policy</p>
                        <p className="font-semibold text-gray-800">{seller.returnPolicy}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button className="w-full px-4 py-3 text-center font-semibold text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-all duration-300">
                        View store
                    </button>
                    <button className="w-full px-4 py-3 text-center font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-sm">
                        Message
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails
