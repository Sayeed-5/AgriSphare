import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

// Input field ke liye ek reusable component. Isse code saaf rehta hai.
const InputField = ({ icon, type, placeholder, value, onChange, name }) => (
    <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
        </div>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            required
        />
    </div>
);

// Dropdown/Select field ke liye ek alag component.
const SelectField = ({ icon, name, value, onChange, options }) => (
    <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
        </div>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full pl-10 pr-10 py-3 bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 appearance-none"
            required
        >
            <option value="" disabled>Select a category</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    </div>
);


// Main App component jismein pura page hai.
function SellerSignup() {

    const firebase = useFirebase();
    const navigate = useNavigate();

    // Form data ko manage karne ke liye state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullname: '',
        phone: '',
        password: '',
        location: '',
        categories: '',
        adharNo: '',
        gstinNo: ''
    });

    // Jab user input field me kuch type karega, to yeh function call hoga.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate('/')
        }
    },[firebase, navigate])

    // Form submit hone par yeh function call hoga.
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { 
            username, 
            email, 
            fullname, 
            phone, 
            password, 
            location, 
            gstinNo, 
            categories, 
            adharNo 
        } = formData;

        try {
            const result = await firebase.signupWithEmailPassword(email, password);
            const seller = await firebase.CreateNewSeller(username, email, fullname, phone, password, location, gstinNo, categories, adharNo, result.user);

            await updateProfile(result.user, {
               displayName: username  
            });
            
            alert("Registration successful!");
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    const categoryOptions = [
        { value: 'vegetables', label: 'Vegetables' },
        { value: 'seed', label: 'Seed' },
        { value: 'saplings', label: 'Saplings' },
        { value: 'fertilizer', label: 'Fertilizer' }
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
            <div className="relative w-full max-w-6xl flex flex-col md:flex-row m-4 md:m-8 rounded-3xl shadow-2xl overflow-hidden">
                
                {/* Left Side: Form Section */}
                <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Create Seller Account</h1>
                    <p className="text-gray-500 mb-8">Start your selling journey with us!</p>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <InputField
                                icon={<UserIcon />}
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <InputField
                                icon={<MailIcon />}
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <InputField
                                icon={<UserCircleIcon />}
                                type="text"
                                name="fullname"
                                placeholder="Full Name"
                                value={formData.fullname}
                                onChange={handleChange}
                            />
                            <InputField
                                icon={<PhoneIcon />}
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <InputField
                                icon={<LockIcon />}
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                             <InputField
                                icon={<LocationIcon />}
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                            <div className="md:col-span-2">
                                <InputField
                                    icon={<GstinIcon />}
                                    type="text"
                                    name="gstinNo"
                                    placeholder="GSTIN"
                                    value={formData.gstinNo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <SelectField
                                    icon={<CategoryIcon />}
                                    name="categories"
                                    value={formData.categories}
                                    onChange={handleChange}
                                    options={categoryOptions}
                                />
                            </div>
                           <div className="md:col-span-2">
                             <InputField
                                icon={<IdCardIcon />}
                                type="text"
                                name="adharNo"
                                placeholder="Aadhar Number"
                                value={formData.adharNo}
                                onChange={handleChange}
                            />
                           </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 transform hover:scale-105 mt-6">
                            Sign Up
                        </button>
                    </form>
                </div>

                {/* Right Side: Image Section */}
                <div className="hidden md:block w-1/2">
                    <img 
                        src="https://nufarm.com/ca/wp-content/uploads/sites/16/2018/06/Farmer-in-Canola-Field-at-Sunset-Alamy-Stock-Image.jpg" 
                        alt="Farm field" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

// Icon Components (Inline SVG for simplicity)
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const UserCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const CategoryIcon = () => (
    <svg xmlns="http://www.w.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
);
const GstinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" />
    </svg>
);
const IdCardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 15h4" />
    </svg>
);

export default SellerSignup;