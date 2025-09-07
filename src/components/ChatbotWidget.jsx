import React, { useState, useRef, useEffect } from 'react';
import FarmingChatbot from './FarmingChatbot';
import { LucideBot } from 'lucide-react';

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={toggleChatbot}
                className="fixed bottom-6 right-6 bg-[#4CAF50] hover:bg-[#FFC107] hover:text-[#212121] text-white p-4 rounded-full shadow-lg transition-all duration-300"
                style={{ zIndex: 1000 }}
            >
                <LucideBot/>
            </button>

            {/* Chatbot Popup */}
            {isOpen && (
                <div
                    className="fixed bottom-20 right-24 w-128 bg-white rounded-lg shadow-lg p-4 flex flex-col"
                    ref={sidebarRef}
                    style={{ zIndex: 1000 }}
                >
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-lg">Chat with us</h3>
                        <button
                            onClick={toggleChatbot}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <FarmingChatbot />
                </div>
            )}
        </>
    );
};

export default ChatbotWidget;
