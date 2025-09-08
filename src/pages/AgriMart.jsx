import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

// --- HELPER COMPONENTS ---

// ProductCard Component: Renders a single product item
const ProductCard = (props) => {
    const firebase = useFirebase();

    const categoryColors = {
        Vegetables: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        Seeds: 'bg-amber-50 text-amber-700 border border-amber-200',     
        Fertilizer: 'bg-blue-50 text-blue-700 border border-blue-200',
        Saplings: 'bg-lime-50 text-lime-700 border border-lime-200',
    };



    // if (!firebase.isLoggedIn) {
    //     alert("Please Login to shopping")
    //     return
    // }
    
    const handlePlaceOrder = async () => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        try {
            const result = await firebase.placeOrder(props.id, currentUser); 
            alert("Your Order is placed successfully!");
            console.log("Order Placed:", result.id);
        } catch (error) {
            console.error("🔥 Place order error:", error.message);
            alert("Failed to place order. Please try again.");
        }
    };

    const productdetails = async () => {
        navigate(`/product/details/${props.id}`)
    }; 

    const isOutOfStock = props.availability === 'Out of stock';

    return (
        <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 ease-out hover:-translate-y-1">
            <div className="relative w-full h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <img 
                    src={props.image} 
                    alt={props.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Out of Stock</span>
                    </div>
                )}
                <div className="absolute top-4 right-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm ${categoryColors[props.category] || 'bg-gray-50 text-gray-700 border border-gray-200'}`}>
                        {props.category}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{props.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-3xl font-bold text-gray-900">₹{props.price}</span>
                        <span className="text-sm text-gray-500 font-medium">/{props.unit}</span>
                    </div>
                    <p className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg inline-block">
                        Min order: <span className="font-semibold text-gray-700">{props.minOrder} {props.unit}</span>
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button 
                        onClick={productdetails} 
                        className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        View Details
                    </button>
                    <button 
                        onClick={handlePlaceOrder} 
                        disabled={isOutOfStock}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 ${
                            isOutOfStock 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                : 'bg-[#4CAF50] hover:bg-[#45a049] text-white hover:shadow-lg focus:ring-green-200'
                        }`}
                    >
                        {isOutOfStock ? 'Out of Stock' : 'Buy Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Sidebar Component: Contains all the filter options
const Sidebar = ({ filters, setFilters }) => {
    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, price: { ...prev.price, [name]: value } }));
    };

    const handleAvailabilityChange = (availability) => {
        setFilters(prev => ({...prev, availability: prev.availability === availability ? '' : availability}));
    };
    
    const availabilityOptions = ['In stock', 'Out of stock'];

    return (
        <aside>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Filters</h2>
            <div className="space-y-8">
                {/* Search Filter */}
                <div>
                    <label htmlFor="search" className="block text-sm font-semibold text-gray-800 mb-3">Search Products</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                           <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                           </svg>
                        </div>
                        <input
                            type="text"
                            id="search"
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            placeholder="Search for products..."
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-200 focus:border-green-300 transition-all duration-200 bg-gray-50 focus:bg-white"
                        />
                    </div>
                </div>

                {/* Price Range Filter */}
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">Price Range (₹)</label>
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <input
                                type="number"
                                name="min"
                                value={filters.price.min}
                                onChange={handlePriceChange}
                                placeholder="Min"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-200 focus:border-green-300 transition-all duration-200 bg-gray-50 focus:bg-white"
                            />
                        </div>
                        <div className="text-gray-400 font-bold">—</div>
                        <div className="flex-1">
                            <input
                                type="number"
                                name="max"
                                value={filters.price.max}
                                onChange={handlePriceChange}
                                placeholder="Max"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-200 focus:border-green-300 transition-all duration-200 bg-gray-50 focus:bg-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Availability Filter */}
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-3">Availability</label>
                    <div className="space-y-3">
                       {availabilityOptions.map(option => (
                             <button
                                key={option}
                                onClick={() => handleAvailabilityChange(option)}
                                className={`w-full text-left px-4 py-3 border-2 rounded-xl transition-all duration-200 font-medium ${
                                    filters.availability === option
                                        ? 'bg-green-50 border-green-300 text-green-800'
                                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-gray-700'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {filters.availability === option && (
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                            </button>
                       ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

// Helper function for filtering and sorting
const applyFiltersAndSorting = (products, filters, sortBy) => {
    let tempProducts = [...products];

    // 1. Filter by Category (case-insensitive)
    if (filters.category !== "All") {
        tempProducts = tempProducts.filter(
            (p) => (p.category || "").toLowerCase() === filters.category.toLowerCase()
        );
    }

    // 2. Filter by Search Term
    if (filters.search) {
        tempProducts = tempProducts.filter((p) =>
            (p.name || "").toLowerCase().includes(filters.search.toLowerCase())
        );
    }

    // 3. Filter by Price ✅ FIXED
    const minPrice = filters.price.min ? parseFloat(filters.price.min) : null;
    const maxPrice = filters.price.max ? parseFloat(filters.price.max) : null;

    if (minPrice !== null && !isNaN(minPrice)) {
        tempProducts = tempProducts.filter((p) => parseFloat(p.price || 0) >= minPrice);
    }
    if (maxPrice !== null && !isNaN(maxPrice)) {
        tempProducts = tempProducts.filter((p) => parseFloat(p.price || 0) <= maxPrice);
    }

    // 4. Filter by Availability ✅ FIXED
    if (filters.availability) {
        tempProducts = tempProducts.filter(
            (p) => (p.availability || "").toLowerCase() === filters.availability.toLowerCase()
        );
    }

    // 5. Apply Sorting
    switch (sortBy) {
        case "Price: Low to High":
            tempProducts.sort((a, b) => parseFloat(a.price || 0) - parseFloat(b.price || 0));
            break;
        case "Price: High to Low":
            tempProducts.sort((a, b) => parseFloat(b.price || 0) - parseFloat(a.price || 0));
            break;
        case "Popularity":
        default:
            tempProducts.sort(
                (a, b) => (parseFloat(b.popularity) || 0) - (parseFloat(a.popularity) || 0)
            );
            break;
    }

    return tempProducts;
};

// Main App Component
function AgriMart() {
    // --- STATE MANAGEMENT ---
    // The products state would be populated from a Firebase call in a real app.
    
    const [filteredProducts, setFilteredProducts] = useState([]);
    const firebase = useFirebase();
    const [products, setProducts] = useState([]);
    
    // State for all active filters
    const [filters, setFilters] = useState({
        category: 'All',
        search: '',
        price: { min: '', max: '' },
        availability: '',
    });
    
    const [sortBy, setSortBy] = useState('Popularity');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const categories = ['All', 'Vegetables', 'Seeds', 'Fertilizer', 'Saplings'];

    // --- FILTERING AND SORTING LOGIC ---
    useEffect(() => {
        setFilteredProducts(applyFiltersAndSorting(products, filters, sortBy));
    }, [filters, sortBy, products]);

    useEffect(() => {
        firebase.getAllProducts()
          .then((snapshot) => {
            const products = snapshot.docs.map(doc => ({
              id: doc.id,      
              ...doc.data()    
            }));
            setProducts(products);
          });
    }, []);

    return (
        <div className="bg-gradient-to-br from-[#FFF9F0] via-[#FFFAF2] to-[#FFF7ED] min-h-screen font-sans">
            <div className="container mx-auto px-6 py-10">
                {/* Header */}
                <header className="flex flex-col lg:flex-row justify-between items-center mb-12">
                    <div className="text-center lg:text-left mb-8 lg:mb-0">
                        <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-3 tracking-tight">
                            Agri<span className="text-[#4CAF50]">Mart</span>
                        </h1>
                        <p className="text-lg text-gray-600 font-medium">Fresh produce, delivered to your doorstep</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center items-center gap-3">
                        {categories.map(cat => (
                           <button
                             key={cat}
                             onClick={() => setFilters(prev => ({...prev, category: cat}))}
                             className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                                 filters.category === cat
                                     ? 'bg-[#4CAF50] text-white shadow-lg shadow-green-200'
                                     : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 shadow-sm'
                             }`}
                           >
                               {cat === 'All' ? 'All Products' : cat}
                           </button>
                        ))}
                    </div>
                </header>

                <main className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar */}
                     <div className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'} lg:w-80 lg:flex-shrink-0`}>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-6">
                            <Sidebar filters={filters} setFilters={setFilters} />
                        </div>
                     </div>

                    {/* Product Listing */}
                    <div className="w-full lg:flex-1">
                        {/* Sort and Filter Controls */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-gray-100 rounded-xl">
                                    <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                    </svg>
                                </div>
                                <span className="text-gray-800 font-semibold">Sort by</span>
                                <select 
                                  value={sortBy}
                                  onChange={(e) => setSortBy(e.target.value)}
                                  className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-green-300 focus:ring-2 focus:ring-green-200 bg-gray-50 focus:bg-white font-medium transition-all duration-200"
                                >
                                    <option>Popularity</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                            
                            <button 
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden flex items-center gap-3 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-semibold transition-all duration-200"
                            >
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.572a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                                </svg>
                                {isSidebarOpen ? 'Hide' : 'Show'} Filters
                            </button>
                            
                            <div className="hidden lg:flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-700 font-semibold">{filteredProducts.length} products</span>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} {...product} id={product.id} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-10 h-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">No Products Found</h3>
                                <p className="text-gray-500 text-lg">Try adjusting your filters to find what you're looking for.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AgriMart;