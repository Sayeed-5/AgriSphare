import React, { useState, useMemo, useEffect } from 'react';
import {useFirebase} from '../context/firebase'
import { Link } from "react-router-dom";
import { uploadOnCloudinary } from "../context/cloudinary.js";

const ORDERS_PER_PAGE = 3;

// --- Reusable Components ---

const OrderCard = ({ order, onUpdateStatus }) => {

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start space-x-4">
          <img
            src={order.image}
            alt={order.product}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-gray-800">{order.name}</p>
            <p className="text-sm text-gray-500">
              Wants to buy: {order.product} (My product)
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 pl-14">
        <label
          htmlFor={`reason-${order.id}`}
          className="text-sm font-medium text-gray-500"
        >
          Reason
        </label>
        <input
          type="text"
          id={`reason-${order.id}`}
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          placeholder="Optional: Add a reason for your action"
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600 font-medium pl-14 md:pl-0">
          Price: ₹{order.pricePerUnit} • Total:{' '}
          <span className="font-bold text-gray-900">
            ₹{order.total.toLocaleString('en-IN')}
          </span>
        </p>
        {order.status === 'ongoing' && (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onUpdateStatus(order.id, 'declined')}
              className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-sm"
            >
              Decline
            </button>
            <button
              onClick={() => onUpdateStatus(order.id, 'delivered')}
              className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm"
            >
              Accept
            </button>
          </div>
        )}
        {order.status === 'declined' && (
          <span className="text-sm font-semibold text-red-600 bg-red-100 py-1 px-3 rounded-full">
            Declined
          </span>
        )}
        {order.status === 'delivered' && (
          <span className="text-sm font-semibold text-blue-600 bg-blue-100 py-1 px-3 rounded-full">
            Delivered
          </span>
        )}
      </div>
    </div>
  );
};

const AddProductForm = () => {

  const firebase = useFirebase()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [minOrder, setMinOrder] = useState('')
  const [stock, setStock] = useState('')
  const [image, setImage] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image");
      return;
    }
    const imageUrl = await uploadOnCloudinary(image);
    const list = await firebase.AddNewProduct(name, category, price, minOrder, stock, imageUrl);
    alert("Product add successfully !");
  }

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200" id='orders'>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Product name
              </label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="e.g., Tomato (Heirloom)"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Select category</option>
                <option>Vegetables</option>
                <option>Seeds</option>
                <option>Fertilizers</option>
                <option>Saplings</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Price</label>
              <input
                type="text"
                placeholder="Enter price (per kg/bag)"
                className="form-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Stock status
              </label>
              <select className="form-input" value={stock} onChange={(e) => setStock(e.target.value)}>
                <option>Select options</option>
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
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button type='submit' className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm">
                Add Product
              </button>
            </div>
        </form>
      </div>
    </>
  );
};

const ProductListItem = (props) => {
    return(
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={props.image}
            alt={props.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <p className="font-bold text-gray-800">{props.name}</p>
            <p className="text-xs text-gray-500">
              Category: {props.category} • Min order: {props.minOrder}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              props.stock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {props.stock ? 'In stock' : 'Out of stock'}
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

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${
            currentPage === page
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

// --- Main Orders Component ---
function Products(props) {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([])
  const firebase = useFirebase()

  useEffect(() => {
      if(firebase.isLoggedIn){
          firebase.fetchMyProducts(firebase.user.uid).then((product) => setProducts(product.docs))
      }    
  }, [firebase])

  useEffect(() => {
    const loadOrders = async () => {
      const myOrders = await firebase.fetchMyOrders();
      console.log("Fetched Orders:", myOrders); // 👈 Debug ke liye
      setOrders(myOrders);
    };
    loadOrders();
  }, []);

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  const filteredOrders = useMemo(
    () => orders.filter((order) => order.status === activeTab),
    [orders, activeTab]
  );

  const currentOrders = useMemo(() => {
    const indexOfLastOrder = currentPage * ORDERS_PER_PAGE;
    const indexOfFirstOrder = indexOfLastOrder - ORDERS_PER_PAGE;
    return filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  }, [filteredOrders, currentPage]);

  const FilterButton = ({ tabName, children }) => (
    <button
      onClick={() => handleTabChange(tabName)}
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${
        activeTab === tabName
          ? 'bg-green-600 text-white'
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );

  if(!firebase.isLoggedIn){
        return (
            <div className='container mx-auto text-center py-20'>
                <h1 className='text-2xl mb-5'>Please login to view your orders</h1>
                <Link
                to="/login"
                className="flex justify-center gap-2  text-[#212121] hover:text-[#29B6F6] transition-colors"
              >
                <span className="text-2xl font-medium border-2 px-2 py-2 rounded-lg">Sign In</span>
              </Link>
            </div>
        )
    }

  return (
    <>
      <div className="max-w-[100rem] mx-auto bg-fixed bg-cover bg-center ">
        <style>{`.form-input{width:100%;margin-top:.25rem;padding:.5rem .75rem;border:1px solid #D1D5DB;border-radius:.5rem;transition:all .2s}.form-input:focus{outline:0;--tw-ring-color:#10B981;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);border-color:#10B981} `}</style>
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Orders Section */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
                <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                  <FilterButton tabName="ongoing">Ongoing</FilterButton>
                  <FilterButton tabName="declined">Declined</FilterButton>
                  <FilterButton tabName="delivered">Delivered</FilterButton>
                </div>
              </div>
              <div className="space-y-4">
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onUpdateStatus={handleUpdateOrderStatus}
                    />
                  ))
                ) : (
                  <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      No orders here
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You have no {activeTab} orders at the moment.
                    </p>
                  </div>
                )}
              </div>
              <Pagination
                totalItems={filteredOrders.length}
                itemsPerPage={ORDERS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
            {/* Product Management Section */}
            <div>
              <AddProductForm/>
              <div className="mt-6 space-y-4">
                {products.map((product) => (
                  <ProductListItem key={product.id} {...product.data()} id={product.id}/>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Products