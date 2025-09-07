import React, { useState } from 'react';

// --- SVG Icons ---
// Using components for icons to keep the main component clean
const OverviewIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

const OrdersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);
 
const EducationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
);

const AIDetectionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><circle cx="12" cy="12" r="1"></circle><path d="M12 2v2.5"></path><path d="m4.2 4.2 1.8 1.8"></path><path d="M2 12h2.5"></path><path d="m4.2 19.8 1.8-1.8"></path><path d="M12 22v-2.5"></path><path d="m19.8 19.8-1.8-1.8"></path><path d="M22 12h-2.5"></path><path d="m19.8 4.2-1.8 1.8"></path></svg>
);

const VerifiedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
);

// --- Sidebar Component ---
const Sidebar = () => {
    const menuItems = [
        { name: 'Overview', icon: <OverviewIcon /> },
        { name: 'My Orders', icon: <OrdersIcon /> },
        { name: 'Orders', icon: <CartIcon /> },
        { name: 'Education', icon: <EducationIcon /> },
        { name: 'AI Detection', icon: <AIDetectionIcon /> },
    ];

    const activeItem = 'Overview';

    return (
        <aside className="w-64 flex-shrink-0 bg-white p-4 hidden lg:block border-r">
            <div className="flex flex-col space-y-2">
                {menuItems.map((item) => (
                    <a
                        key={item.name}
                        href="#"
                        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium ${
                            item.name === activeItem
                                ? 'bg-gray-200 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </a>
                ))}
            </div>
        </aside>
    );
};

// --- Order Item Component ---
const OrderItem = ({ type, orderId, items, status, statusColor, isAwaitingPickup }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
        <div className="flex items-center space-x-4">
            <div>
              <p className="font-semibold text-gray-800">{items[0].name}</p>
              {items.length > 1 && <p className="font-semibold text-gray-800">{items[1].name}</p>}
              <p className="text-sm text-gray-500">
                  {items.map((item, index) => (
                    <span key={index}>{`Qty: ${item.qty} • Price: ${item.price}`} <br/></span>
                  ))}
                  Seller: {items[0].seller}
                  {items[0].deliveredOn && ` • Delivered on: ${items[0].deliveredOn}`}
              </p>
            </div>
        </div>
        <div className="flex items-center space-x-4">
            {isAwaitingPickup && (
              <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">Awaiting Pickup</span>
            )}
             {status && (
              <span className={`text-xs font-semibold ${statusColor} px-3 py-1 rounded-full`}>{status}</span>
            )}
            <button className="bg-gray-100 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">Details</button>
        </div>
    </div>
);


// --- Orders Section Component ---
const OrdersSection = () => {
    const [activeTab, setActiveTab] = useState('seller');
    
    const declinedOrders = [
        { id: 'B-2091', items: [{ name: 'Saplings • Banana Tissue Culture', qty: '200', price: '₹38/unit', seller: 'FreshHub Retail' }] },
        { id: 'B-2095', items: [{ name: 'Pesticides • Copper Oxychloride', qty: '10 cans (1L)', price: '₹420/can', seller: 'City Organics' }] },
    ];
    
    const deliveredOrders = [
        { id: 'B-2077', items: [{ name: 'Seeds • Onion (Nasik Red)', qty: '30 kg', price: '₹1,200/kg', seller: 'Metro Foods', deliveredOn: 'Aug 14' }] },
        { id: 'B-2082', items: [{ name: 'Pesticides • Emamectin Benzoate', qty: '8 packs (250g)', price: '₹680/pack', seller: 'Green Basket', deliveredOn: 'Aug 16' }] },
    ];


    return (
        <div className="mt-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
                <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setActiveTab('buyer')}
                        className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'buyer' ? 'bg-white shadow' : 'text-gray-600'}`}>
                        Buyer
                    </button>
                    <button 
                        onClick={() => setActiveTab('seller')}
                        className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'seller' ? 'bg-white shadow' : 'text-gray-600'}`}>
                        Seller
                    </button>
                </div>
            </div>
            
            <div className="mt-6 space-y-6">
                {/* Ongoing Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="text-yellow-500 mr-2">
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m7.8 16.2-2.9 2.9"/><path d="M6 12H2"/><path d="m7.8 7.8-2.9-2.9"/></svg>
                        </span>
                        Ongoing
                    </h3>
                    <div className="space-y-4">
                       <OrderItem
                            items={[{ name: 'Seeds • Tomato (Heirloom)', qty: '50 packets', price: '₹120/packet', seller: 'FreshMart Co.' }]}
                            isAwaitingPickup={true}
                        />
                         <OrderItem
                            items={[{ name: 'Fertilizers • NPK 19:19:19', qty: '20 bags', price: '₹950/bag', seller: 'Green Basket' }]}
                            status="Confirmed"
                            statusColor="bg-green-100 text-green-800"
                        />
                    </div>
                </div>

                {/* Declined Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                       <span className="text-red-500 mr-2">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                       </span>
                        Declined
                    </h3>
                    <div className="space-y-4">
                        {declinedOrders.map(order => (
                             <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                                <div>
                                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">Seller</span>
                                    <span className="text-sm text-gray-500 ml-2">Order #{order.id}</span>
                                    <p className="font-semibold text-gray-800 mt-1">{order.items[0].name}</p>
                                    <p className="text-sm text-gray-500">Qty: {order.items[0].qty} • Price: {order.items[0].price} • Seller: {order.items[0].seller}</p>
                                </div>
                                <button className="bg-gray-100 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">Details</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Delivered Section */}
                <div>
                     <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                        <span className="text-green-500 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </span>
                        Delivered
                    </h3>
                    <div className="space-y-4">
                         {deliveredOrders.map(order => (
                             <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                                <div>
                                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">Seller</span>
                                    <span className="text-sm text-gray-500 ml-2">Order #{order.id}</span>
                                    <p className="font-semibold text-gray-800 mt-1">{order.items[0].name}</p>
                                    <p className="text-sm text-gray-500">Qty: {order.items[0].qty} • Price: {order.items[0].price} • Seller: {order.items[0].seller} • Delivered on: {order.items[0].deliveredOn}</p>
                                </div>
                                <button className="bg-gray-100 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">Details</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---//
function Dashboard() {
    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-8">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Farmer Dashboard</h1>
                    </header>
                    
                    {/* Profile Section */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex justify-between items-start">
                           <div className="flex items-center space-x-5">
                                <img
                                    className="h-24 w-24 rounded-full object-cover"
                                    src="https://placehold.co/100x100/E2E8F0/4A5568?text=RH"
                                    alt="Rahul Mehta"
                                />
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <h2 className="text-2xl font-bold text-gray-900">Rahul Mehta</h2>
                                        <span className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center text-xs font-semibold">
                                            <VerifiedIcon />
                                            <span className="ml-1">Verified</span>
                                        </span>
                                    </div>
                                    <p className="text-gray-500 mt-1">rahul.mehta@example.com • Nashik, IN</p>
                                    <div className="flex space-x-2 mt-3">
                                        <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">Tomato</span>
                                        <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">Onion</span>
                                        <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">Chili</span>
                                        <span className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">Okra</span>
                                    </div>
                                </div>
                           </div>
                           <div className="flex space-x-3">
                                <button className="font-semibold text-gray-700 bg-white border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">Edit Profile</button>
                                <button className="font-semibold text-white bg-green-600 px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors">Add Crop</button>
                           </div>
                        </div>
                        <div className="mt-5">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-600">Profile completeness</span>
                                <span className="text-sm font-bold text-green-600">76%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '76%' }}></div>
                            </div>
                        </div>
                    </div>
                    
                    <OrdersSection />
                </main>
            </div>
        </div>
    );
}

export default Dashboard