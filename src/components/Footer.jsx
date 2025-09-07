import { Globe, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-8 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">🌱</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">AgriConnect</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Connecting farmers and buyers with AI-powered tools, education, and fair market access.
                        </p>
                    </div>

                    {/* Company Section */}
                    <div className="col-span-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div className="col-span-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Resources</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Guides
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Preferences Section */}
                    <div className="col-span-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Preferences</h4>

                        {/* Language Selector */}
                        <div className="flex items-center space-x-2 mb-4">
                            <Globe className="w-4 h-4 text-gray-600" />
                            <select className="text-sm text-gray-600 bg-transparent border-none outline-none cursor-pointer">
                                <option value="en">English</option>
                                <option value="hi">हिन्दी</option>
                                <option value="mr">मराठी</option>
                            </select>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex items-center space-x-3">
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Border */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-xs text-gray-500">
                            © 2025 AgriConnect. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6">
                            <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;