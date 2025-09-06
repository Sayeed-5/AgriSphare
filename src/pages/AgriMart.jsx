import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebase';

// --- HELPER COMPONENTS ---

// ProductCard Component: Renders a single product item
const ProductCard = (props) => {
    const firebase = useFirebase()

    const categoryColors = {
        Vegetables: 'bg-green-100 text-green-800',
        Seeds: 'bg-yellow-100 text-yellow-800',
        Fertilizer: 'bg-blue-100 text-blue-800',
        Saplings: 'bg-lime-100 text-lime-800',
    };

    // if (!firebase.isLoggedIn) {
    //     alert("Please Login to shopping")
    //     return
    // }

    const placeOrder = async () => {
        const result = await firebase.placeOrder(props.id);
        alert("Your Order is placed")
        //console.log("Order Placed", result);
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="w-full h-48 bg-gray-200">
                <img src={props.image} alt={props.name} className="w-full h-full object-cover"/>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{props.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[props.category] || 'bg-gray-100 text-gray-800'}`}>
                        {props.category}
                    </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">₹{props.price} </p>
                <p className="text-sm text-gray-500 mb-4">Min order: {props.minOrder} </p>
                
                <div className="flex items-center space-x-2">
                    <button className="w-full text-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                        Details
                    </button>
                    <button onClick={placeOrder} className="w-full text-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
                        Buy Now
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
            <h2 className="text-xl font-bold mb-6">Filters</h2>
            <div className="space-y-6">
                {/* Search Filter */}
                <div>
                    <label htmlFor="search" className="text-sm font-medium text-gray-700">Search</label>
                    <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                           <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                           </svg>
                        </span>
                        <input
                            type="text"
                            id="search"
                            value={filters.search}
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                            placeholder="Search products"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>

                {/* Price Range Filter */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Price range (₹)</label>
                    <div className="flex items-center space-x-2 mt-1">
                        <input
                            type="number"
                            name="min"
                            value={filters.price.min}
                            onChange={handlePriceChange}
                            placeholder="Min"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                        <input
                            type="number"
                            name="max"
                            value={filters.price.max}
                            onChange={handlePriceChange}
                            placeholder="Max"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>

                

                {/* Availability Filter */}
                <div>
                    <label className="text-sm font-medium text-gray-700">Availability</label>
                    <div className="space-y-2 mt-1">
                       {availabilityOptions.map(option => (
                             <button
                                key={option}
                                onClick={() => handleAvailabilityChange(option)}
                                className={`w-full text-left px-4 py-2 border rounded-md transition-colors duration-200 ${
                                    filters.availability === option
                                        ? 'bg-green-100 border-green-400 text-green-800'
                                        : 'bg-white border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {option}
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
        <div className="bg-gray-50 min-h-screen font-sans">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">AgriMart</h1>
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        {categories.map(cat => (
                           <button
                             key={cat}
                             onClick={() => setFilters(prev => ({...prev, category: cat}))}
                             className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                 filters.category === cat
                                     ? 'bg-green-600 text-white'
                                     : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                             }`}
                           >
                               {cat === 'All' ? 'All Products' : cat}
                           </button>
                        ))}
                    </div>
                </header>

                <main className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar -- UPDATED for better large screen layout */}
                     <div className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'} lg:w-72 lg:flex-shrink-0`}>
                        <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
                            <Sidebar filters={filters} setFilters={setFilters} />
                        </div>
                     </div>

                    {/* Product Listing */}
                    <div className="w-full lg:flex-1">
                        {/* Sort and Filter Controls */}
                        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                </svg>
                                <span className="text-gray-700 font-medium">Sort by</span>
                                <select 
                                  value={sortBy}
                                  onChange={(e) => setSortBy(e.target.value)}
                                  className="border-gray-300 rounded-md shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                                >
                                    <option>Popularity</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                            
                            <button 
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.572a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                                </svg>
                                {isSidebarOpen ? 'Hide' : 'Show'} Filters
                            </button>
                            <div className="hidden lg:block">
                                <span className="text-gray-600">{filteredProducts.length} products found</span>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} {...product} id={product.id} />
                                ))}
                                {/* link={`/products/view/${product.id}`} */}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                                <h3 className="text-2xl font-semibold text-gray-700">No Products Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AgriMart;