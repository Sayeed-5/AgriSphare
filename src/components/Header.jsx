import { Menu, X, UserCircle2, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useFirebase, auth, firestore } from "../context/firebase";
import { useRef, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const firebase = useFirebase();
  const sidebarRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await firebase.logout();
  };

  const goTodashboard = async () => {
    window.location.href = "/dashboard";
    // Navigate("/dashboard");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentUser({ uid: user.uid, ...docSnap.data() });
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  


  return (
    <header className="sticky top-0 bg-white/60 backdrop-blur-md z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/Agrisphere-logo.png" 
              alt="AgriSphere" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className="text-sm font-medium   hover:bg-white/40 rounded-md px-2 py-0.5 hover:text-[#29B6F6] text-black transition-all duration-200">
              Home
            </Link>
            <Link 
              to="/education" 
              className="text-sm font-medium   hover:bg-white/40 rounded-md px-2 py-0.5 hover:text-[#29B6F6] text-black transition-all duration-200">
              Education
            </Link>
            <Link 
              to="/agrimart" 
              className="text-sm font-medium   hover:bg-white/40 rounded-md px-2 py-0.5 hover:text-[#29B6F6] text-black transition-all duration-200">
              AgriMart
            </Link>
            <Link 
              to="https://huggingface.co/spaces/SuvamBhola/plant-disease-detector" 
              className="text-sm font-medium   hover:bg-white/40 rounded-md px-2 py-0.5 hover:text-[#29B6F6] text-black transition-all duration-200">
              AI Detection
            </Link>
            {currentUser?.role === "seller" && (
              <Link 
                to="/products" 
                className="text-sm font-medium   hover:bg-white/40 rounded-md px-2 py-0.5 hover:text-[#29B6F6] text-black transition-all duration-200">
                Products
              </Link>
            )}
          </nav>

          {/* User Section */}
          <div>
            {firebase.isLoggedIn ? (
              <div className="flex items-center gap-2">
                {firebase.user.photoURL ? (
                  <img
                    src={firebase.user.photoURL}
                    alt="user"
                    className="w-8 h-8 rounded-full border"
                  />
                ) : (
                  <UserCircle2 size={28} className="text-[#212121]" />
                )}
                <span onClick={goTodashboard} className="text-sm font-medium text-[#212121] hover:text-[#29B6F6]">
                  {firebase.user.displayName || "User" || firebase.user.username}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="px-2 py-2 bg-[#4CAF50] hover:bg-[#FFC107] hover:text-[#212121] text-white rounded-3xl text-white text-sm">
                  <LogOutIcon/>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 hover:bg-white/40 rounded-md px-2 py-0.5 text-[#212121] hover:text-[#29B6F6]  "
              >
                <UserCircle2 size={24}/>
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setOpen(true)}>
            {!open && <Menu size={24} />}
          </button>

          {/* Sidebar */}
          {open && (
            <div
              ref={sidebarRef}
              className="absolute top-0 right-0 w-3/4 h-screen bg-white flex flex-col items-start gap-6 py-6 px-6 md:hidden shadow-lg z-50"
            >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-[#212121]" 
              onClick={() => setOpen(false)}
            >
              <X size={24}/>
            </button>
              {/* User Info */}
              <div className="flex flex-col items-center gap-2 mt-3">
                {firebase.isLoggedIn ? (
                  <>
                    {firebase.user.photoURL ? (
                      <img
                        src={firebase.user.photoURL}
                        alt="user"
                        className="w-8 h-8 rounded-full border"
                      />
                    ) : (
                      <UserCircle2 size={32} className="text-[#212121]" />
                    )}
                    <span className="text-sm font-medium text-[#212121]">
                      {firebase.user.displayName || "User"}
                    </span>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-2 hover:text-[#29B6F6]"
                    onClick={() => setOpen(false)}
                  >
                    <UserCircle2 size={24} className="text-[#212121]" />
                    <span className="text-sm font-medium   text-[#212121]">
                      Sign In
                    </span>
                  </Link>
                )}
              </div>

              {/* Mobile Nav */}
              <nav className="flex flex-col gap-4 w-full">
                <Link 
                  to="/" 
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium hover:text-[#29B6F6] text-[#212121]"
                >
                  Home
                </Link>
                <Link 
                  to="/education"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium hover:text-[#29B6F6] text-[#212121]"
                >
                  Education
                </Link>
                <Link 
                  to="/agrimart"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium hover:text-[#29B6F6] text-[#212121]"
                >
                  AgriMart
                </Link>
                <Link 
                  to="/ai-detection"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium hover:text-[#29B6F6] text-[#212121]"
                >
                  AI Detection
                </Link>
                <Link 
                  to="/orders"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium hover:text-[#29B6F6] text-[#212121]"
                >
                  Orders
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;