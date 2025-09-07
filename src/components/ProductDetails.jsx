import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import { useParams } from 'react-router-dom';

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
 
const ProductDetails = () => {
    const [quantity, setQuantity] = useState();
    const firebase = useFirebase();
    const [products, setProducts] = useState(null);
    const { id } = useParams();

    // const product = {
    //     name: products.name,
    //     image: products.image,
    //     price: products.price,
    //     unit: products.unit,
    //     minOrder: products.minOrder,
    //     tags: ["Vegetables", "In stock", "Fast delivery"],

    // };

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

    //console.log(firebase.user);

    const placeOrder = async () => {
        const result = await firebase.placeOrder(id);
        alert("Your Order is placed")
    }

    useEffect(() => {
        firebase.getProductsByid(id).then((res) => setProducts(res.data()));
    }, [id]);

    if (!products) {
        return <div className="text-center p-10">Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto rounded-xl font-sans min-h-screen">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-white/30 backdrop-blur-xs rounded-xl ">
                <div className="flex flex-col rounded-2xl gap-8 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8  bg-white/90 backdrop-blur-xs ">

                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Product Image */}
                            <div className="md:w-1/2">
                                <img
                                    src={products.image}
                                    alt={products.name}
                                    className="w-full aspect-square object-cover rounded-xl shadow-md"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="md:w-1/2 flex flex-col my-auto">
                                <div className="flex items-center gap-2 mb-2">
                                    
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">{products.name}</h1>


                                <div className="text-4xl font-extrabold text-gray-800 mb-2">
                                    ₹{products.price} <span className="text-lg font-medium text-gray-500"> per {products.unit}</span>
                                </div>

                                <div className="text-sm text-gray-500 mb-1">Minimum order quantity: {products.minOrder} kg</div>
                                <div className="text-sm text-gray-500 mb-6">Seller rating protection and quality checked</div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Enter quantity ({products.unit})</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        min={products.minOrder}
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                                        placeholder={`e.g., ${products.minOrder}`}
                                    />
                                </div>

                                <div className="w-[16rem] my-4 mx-auto">
                                    <button onClick={placeOrder} className="w-full px-4 py-3 text-center bg-[#4CAF50] hover:bg-[#FFC107] hover:text-[#212121] font-semibold text-white rounded-lg transition-all duration-300 shadow-sm">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Product Details Section */}

                    {/* Right Side: Owner/Seller Details */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={seller.avatarUrl} alt={firebase.displayName} className="w-16 h-16 rounded-full object-cover" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{firebase.user.displayName}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    {seller.isCertified && <CheckCircleIcon className="w-4 h-4 text-green-600" />}
                                    <span>Certified • {seller.platformYears} yrs on platform</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    <StarIcon className="w-4 h-4 text-yellow-500" filled={true} />
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
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetails
