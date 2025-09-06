import React , { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { updateProfile } from "firebase/auth";

const SigninPage = () => {
    const [activeTab, setActiveTab] = useState("signin");
    const navigate = useNavigate();
    const firebase = useFirebase();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleParentClick = () => {
        navigate("/");
    };

    const handleChildClick = (e) => {
        e.stopPropagation(); // Prevent parent click 
        console.log("Child div clicked!");
    };

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate('/')
        }
    },[firebase, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (activeTab === "signin") {
            const result = await firebase.signinWithEmailPassword(email, password);
            alert("login successful!");
        } else {
            const result = await firebase.signupWithEmailPassword(email, password);
            const user = await firebase.CreateNewUser(username, email, phone, password, result.user);
            await updateProfile(result.user, {
                displayName: username  
            });
            alert("Registration successful!");
            //navigate("/");
        }
    };

    return (
        <div className="absolute w-full fixed top-0 z-20 flex justify-center items-center min-h-screen bg-black/30" onClick={handleParentClick}>
            <div className="w-full max-w-5xl h-[90vh] rounded-xl bg-cover bg-center bg-no-repeat"  onClick={handleChildClick} style={{ backgroundImage: "url('https://nufarm.com/ca/wp-content/uploads/sites/16/2018/06/Farmer-in-Canola-Field-at-Sunset-Alamy-Stock-Image.jpg')" }}>
                <div className="relative flex flex-col justify-center items-center w-full max-w-md h-full bg-black/50 p-6 rounded-l-xl ">

                    {/* Tabs */}
                    <div className="w-9/10 bg-[#F5F5F5] rounded-4xl p-1.5 mb-10">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab("signin")}
                                className={`flex-1 py-2 font-semibold rounded-3xl transition 
                                ${activeTab === "signin" ? "bg-[#4CAF50] text-[#212121]" : "bg-[#F5F5F5] text-gray-700"}`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setActiveTab("signup")}
                                className={`flex-1 py-2 font-semibold rounded-3xl transition 
                                ${activeTab === "signup" ? "bg-[#4CAF50] text-[#212121]" : "bg-[#F5F5F5] text-gray-700"}`}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    {activeTab === "signin" ? (
                        <form onSubmit={handleSubmit} className="space-y-4 w-7/10 flex flex-col justify-center">
                            <label className="input validator rounded-2xl">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </g>
                                </svg>
                                <input
                                    type="text"
                                    required
                                    placeholder="Email"
                                    pattern="^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)$"
                                    title="Enter a valid email address or 10-digit phone number"
                                    className="flex-1 outline-none"
                                    onChange={(e) => setEmail(e.target.value)} value={email}
                                />
                            </label>
                            <p className="validator-hint hidden -mt-2">
                                Enter a valid email 
                            </p>

                            <label className="input validator rounded-2xl">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                        ></path>
                                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                    </g>
                                </svg>
                                <input
                                    type="password"
                                    required
                                    placeholder="Password"
                                    minlength="6"
                                    // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                    onChange={(e) => setPassword(e.target.value)} value={password}
                                />
                            </label>
                            {/* <p className="validator-hint hidden -mt-2">
                                Must be more than 8 characters, including
                                <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                            </p> */}

                            <div className="flex w-full flex-col mt-2">
                                <button className="w-full py-2 bg-[#4CAF50] text-[#212121] hover:bg-[#FFC107] transition rounded-2xl">
                                    Sign In
                                </button>
                            </div>
                            <div className="text-[#F5F5F5] flex justify-center my-1.5">--OR--</div>
                                <button onClick={firebase.signinWithGoogle} className="btn bg-[#F5F5F5] text-black border-[#e5e5e5] rounded-2xl">
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Login with Google
                                </button>
                        </form>
                    ) : (
                        <form className="space-y-4 w-7/10 flex flex-col justify-center" onSubmit={handleSubmit}>
                            <label className="input validator rounded-2xl">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </g>
                                </svg>
                                <input
                                    type="text"
                                    required
                                    placeholder="Username"
                                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                                    minlength="3"
                                    maxlength="30"
                                    title="Only letters, numbers or dash"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </label>
                            <p className="validator-hint hidden -mt-2">
                                Must be 3 to 30 characters
                            </p>
                            <label className="input validator rounded-2xl">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </g>
                                </svg>
                                <input type="email" placeholder="mail@site.com" onChange={(e) => setEmail(e.target.value)} value={email} required />
                            </label>
                            <div className="validator-hint hidden -mt-2">Enter valid email address</div>
                            <label className="input validator rounded-2xl">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <g fill="none">
                                        <path
                                            d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                                            fill="currentColor"
                                        ></path>
                                    </g>
                                </svg>
                                <input
                                    type="tel"
                                    className="tabular-nums"
                                    required
                                    placeholder="Phone"
                                    pattern="[0-9]*"
                                    minlength="10"
                                    maxlength="10"
                                    title="Must be 10 digits"
                                    onChange={(e) => setPhone(e.target.value)} value={phone}
                                />
                            </label>
                            <div className="validator-hint hidden -mt-2">Enter valid number</div>
                            <label className="input validator rounded-2xl">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path
                                            d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                        ></path>
                                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                    </g>
                                </svg>
                                <input
                                    type="password"
                                    required
                                    placeholder="Password"
                                    minlength="6"
                                    // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                    onChange={(e) => setPassword(e.target.value)} value={password}
                                />
                            </label>
                            <p className="validator-hint hidden -mt-2">
                                Must be more than 8 characters, including
                                <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                            </p>
                            <button type="submit" className="w-full py-2 bg-[#4CAF50] text-[#212121] rounded-2xl hover:bg-[#FFC107] transition">
                                Sign Up
                            </button>
                            <a href="/seller" className="text-blue-500 text-center">Want to be a seller ?</a>
                        </form>
                        
                    )}
                </div>
            </div>
        </div>
    );
};

export default SigninPage;
