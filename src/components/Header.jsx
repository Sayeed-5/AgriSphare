import { Menu, X, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { useRef, useEffect, useState } from "react";

const Header = () => {
  const firebase = useFirebase();
  const sidebarRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await firebase.logout();
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
              className="text-sm font-medium transition-colors hover:bg-white/40 rounded-md px-2 py-0.5 hover:text-[#29B6F6] text-black">
              Home
            </Link>
            <Link 
              to="/education" 
              className="text-sm font-medium transition-colors hover:bg-white/40 rounded-md px-2 py-0.5 hover:text-[#29B6F6] text-black">
              Education
            </Link>
            <Link 
              to="/agrimart" 
              className="text-sm font-medium transition-colors hover:bg-white/40 rounded-md px-2 py-0.5 hover:text-[#29B6F6] text-black">
              AgriMart
            </Link>
            <Link 
              to="/ai-detection" 
              className="text-sm font-medium transition-colors hover:bg-white/40 rounded-md px-2 py-0.5 hover:text-[#29B6F6] text-black">
              AI Detection
            </Link>
            <Link 
              to="/orders" 
              className="text-sm font-medium transition-colors hover:bg-white/40 rounded-md px-2 py-0.5 hover:text-[#29B6F6] text-black">
              Orders
            </Link>
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
                <span className="text-sm font-medium text-[#212121] hover:text-[#29B6F6]">
                  {firebase.user.displayName || "User"}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded">
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 hover:bg-white/40 rounded-md px-2 py-0.5 text-[#212121] hover:text-[#29B6F6] transition-colors"
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
                    <span className="text-sm font-medium transition-colors text-[#212121]">
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