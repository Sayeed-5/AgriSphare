import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Heart, Sprout, Sun, Cloud, Droplets, Thermometer } from 'lucide-react';

const FarmingChatbot = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm FarmWise, your farming companion. I'm here to help with agricultural questions, weather concerns, crop management, and provide support whenever you need it. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Enhanced keyword detection for depression and mental health
    const detectEmotionalConcerns = (text) => {
        const depressionKeywords = [
            'depressed', 'hopeless', 'worthless', 'suicide', 'kill myself', 'end it all',
            'give up', 'no point', 'failed', 'failure', 'cant do this', 'overwhelming',
            'stressed', 'anxious', 'lonely', 'isolated', 'tired of', 'exhausted',
            'financial problems', 'debt', 'bankruptcy', 'losing farm', 'crop failure'
        ];

        const lowText = text.toLowerCase();
        return depressionKeywords.some(keyword => lowText.includes(keyword));
    };

    // Farming knowledge base
    const getFarmingResponse = (text) => {
        const lowText = text.toLowerCase();

        // Crop-specific advice
        if (lowText.includes('wheat') || lowText.includes('grain')) {
            return "Wheat cultivation tips: Plant in well-drained soil, ensure proper spacing (6-8 inches between rows), watch for rust diseases, and harvest when moisture content is 12-14%. Best sowing time is October-December in most regions.";
        }

        if (lowText.includes('rice') || lowText.includes('paddy')) {
            return "Rice farming guidance: Maintain 2-5cm water level during growing season, use disease-resistant varieties, apply nitrogen fertilizer in splits, and ensure proper drainage before harvest. Transplant 20-25 day old seedlings.";
        }

        if (lowText.includes('tomato')) {
            return "Tomato growing tips: Use well-drained, fertile soil with pH 6.0-7.0, provide support stakes, water regularly but avoid waterlogging, watch for blight and aphids. Space plants 18-24 inches apart.";
        }

        // Weather and irrigation
        if (lowText.includes('weather') || lowText.includes('rain') || lowText.includes('drought')) {
            return "Weather planning is crucial! Monitor local forecasts, consider drought-resistant varieties, implement water conservation techniques like mulching and drip irrigation. I can help you plan around weather challenges.";
        }

        if (lowText.includes('irrigation') || lowText.includes('water')) {
            return "Efficient irrigation saves water and money! Consider drip irrigation for 30-50% water savings, monitor soil moisture, water early morning or evening to reduce evaporation. Different crops need different water schedules.";
        }

        // Pest and disease management
        if (lowText.includes('pest') || lowText.includes('insect') || lowText.includes('bug')) {
            return "Integrated Pest Management (IPM) is your best approach: Use beneficial insects, rotate crops, maintain field hygiene, use organic pesticides when possible. Early detection is key - regular field monitoring helps!";
        }

        if (lowText.includes('disease') || lowText.includes('fungus') || lowText.includes('blight')) {
            return "Disease prevention is better than cure! Ensure good air circulation, avoid overhead watering, use disease-resistant varieties, practice crop rotation, and remove infected plant material immediately.";
        }

        // Soil management
        if (lowText.includes('soil') || lowText.includes('fertilizer') || lowText.includes('nutrient')) {
            return "Healthy soil = healthy crops! Test your soil pH regularly, add organic compost, practice crop rotation, avoid over-fertilization. NPK ratios vary by crop - I can help you choose the right fertilizer mix.";
        }

        // Market and economics
        if (lowText.includes('market') || lowText.includes('price') || lowText.includes('sell')) {
            return "Market strategies for better profits: Diversify crops, consider value-added processing, connect with local buyers, use cooperative marketing, track price trends, and consider contract farming for stable income.";
        }

        return null;
    };

    const generateResponse = (userInput) => {
        const isEmotionalConcern = detectEmotionalConcerns(userInput);

        if (isEmotionalConcern) {
            const supportiveResponses = [
                "I hear that you're going through a really tough time, and I want you to know that your feelings are completely valid. Farming can be incredibly challenging, and it's okay to feel overwhelmed. You're not alone in this - many farmers face similar struggles. Have you been able to talk to anyone about how you're feeling? Sometimes sharing these burdens can help lighten the load. Remember, seeking help is a sign of strength, not weakness. 💚",

                "It sounds like you're carrying a heavy burden right now. Farming is one of the most stressful occupations, and financial pressures, weather uncertainties, and crop challenges can feel overwhelming. Please know that these difficult times don't define your worth as a farmer or as a person. You've overcome challenges before, and you have the strength to get through this too. Consider reaching out to agricultural extension services, farmer support groups, or mental health professionals who understand rural challenges. 🌱",

                "I'm concerned about you, and I want you to know that what you're feeling matters. The farming community faces unique pressures that others might not understand - the isolation, financial stress, unpredictable weather, and the weight of responsibility for land and livestock. But please remember: bad seasons don't make bad farmers, and temporary setbacks don't determine your future. There are people and resources available to help you through this difficult time. Would it help to talk about specific challenges you're facing? 🤝"
            ];

            return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
        }

        // Try to get farming-specific response
        const farmingResponse = getFarmingResponse(userInput);
        if (farmingResponse) {
            return farmingResponse;
        }

        // General supportive farming responses
        const generalResponses = [
            "That's a great question about farming! I'm here to help you succeed. Can you tell me more details about your specific situation so I can provide more targeted advice?",

            "Every farmer faces unique challenges, and I'm here to support you through them. What specific aspect of your farming operation would you like to discuss?",

            "Farming is both an art and a science, and you're doing important work feeding the world. What farming topic can I help you with today?",

            "I appreciate you reaching out! Whether it's about crops, livestock, soil, weather, or just need someone to talk through farming challenges, I'm here for you. What's on your mind?"
        ];

        return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                text: generateResponse(inputText),
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-136 max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                    <Sprout className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">FarmWise AI</h3>
                    <p className="text-green-100 text-sm">Your Farming Companion</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                            }`}>
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-green-500 text-white'
                                }`}>
                                {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className={`px-4 py-2 rounded-lg shadow-sm ${message.sender === 'user'
                                    ? 'bg-blue-500 text-white rounded-br-sm'
                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                                }`}>
                                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                                    }`}>
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                                <Bot size={16} />
                            </div>
                            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 rounded-bl-sm">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Buttons */}
            <div className="px-4 py-2 bg-gray-100 border-t border-gray-200">
                <div className="flex space-x-2 overflow-x-auto">
                    <button
                        onClick={() => setInputText("What's the best time to plant tomatoes?")}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs whitespace-nowrap hover:bg-green-200 transition-colors"
                    >
                        <Sprout size={12} />
                        <span>Planting Time</span>
                    </button>
                    <button
                        onClick={() => setInputText("How do I manage pests naturally?")}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs whitespace-nowrap hover:bg-blue-200 transition-colors"
                    >
                        <Sun size={12} />
                        <span>Pest Control</span>
                    </button>
                    <button
                        onClick={() => setInputText("I'm feeling overwhelmed with farming")}
                        className="flex items-center space-x-1 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs whitespace-nowrap hover:bg-pink-200 transition-colors"
                    >
                        <Heart size={12} />
                        <span>Support</span>
                    </button>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex space-x-2">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about farming, share your concerns, or just chat..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                        rows="1"
                        style={{
                            minHeight: '40px',
                            maxHeight: '100px'
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim()}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>

            {/* Emergency Resources Footer */}
            <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200">
                <p className="text-xs text-yellow-800 text-center">
                    Crisis Support: National Suicide Prevention Lifeline 🇺🇸 988 | Crisis Text Line: Text HOME to 741741
                </p>
            </div>
        </div>
    );
};
export default FarmingChatbot