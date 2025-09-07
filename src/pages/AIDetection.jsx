import React, { useState, useRef } from 'react';
import { Upload, Camera, Loader2, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { Client } from "@gradio/client";

const AIDetection = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    // Disease information mapping
    const diseaseInfo = {
        "Apple___Apple_scab": { remedy: "Apply fungicides, remove fallen leaves.", severity: "moderate" },
        "Apple___Black_rot": { remedy: "Prune infected branches, use fungicides.", severity: "moderate" },
        "Apple___Cedar_apple_rust": { remedy: "Remove nearby junipers, apply fungicides.", severity: "moderate" },
        "Apple___healthy": { remedy: "No disease detected!", severity: "healthy" },
        "Blueberry___healthy": { remedy: "Healthy crop.", severity: "healthy" },
        "Cherry_(including_sour)___Powdery_mildew": { remedy: "Use sulfur sprays, improve airflow.", severity: "moderate" },
        "Cherry_(including_sour)___healthy": { remedy: "Healthy crop.", severity: "healthy" },
        "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": { remedy: "Rotate crops, apply resistant hybrids.", severity: "moderate" },
        "Corn_(maize)___Common_rust_": { remedy: "Use fungicide-resistant hybrids.", severity: "moderate" },
        "Corn_(maize)___Northern_Leaf_Blight": { remedy: "Use crop rotation, fungicides.", severity: "moderate" },
        "Corn_(maize)___healthy": { remedy: "Healthy crop.", severity: "healthy" },
        "Grape___Black_rot": { remedy: "Use fungicides, remove mummies.", severity: "moderate" },
        "Grape___Esca_(Black_Measles)": { remedy: "Remove infected vines.", severity: "severe" },
        "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": { remedy: "Apply fungicides.", severity: "moderate" },
        "Grape___healthy": { remedy: "Healthy crop.", severity: "healthy" },
        "Orange___Haunglongbing_(Citrus_greening)": { remedy: "No cure, remove infected trees, control psyllid vector.", severity: "severe" },
        "Peach___Bacterial_spot": { remedy: "Apply copper sprays.", severity: "moderate" },
        "Peach___healthy": { remedy: "Healthy crop.", severity: "healthy" },
        "Pepper,_bell___Bacterial_spot": { remedy: "Use copper fungicides.", severity: "moderate" },
        "Pepper,_bell___healthy": { remedy: "Healthy crop.", severity: "healthy" },
        "Potato___Early_blight": { remedy: "Apply fungicides, rotate crops.", severity: "moderate" },
        "Potato___Late_blight": { remedy: "Apply fungicides immediately.", severity: "severe" },
        "Potato___healthy": { remedy: "Healthy crop.", severity: "healthy" },
        "Raspberry___healthy": { remedy: "Healthy crop.", severity: "healthy" },
        "Soybean___healthy": { remedy: "Healthy crop.", severity: "healthy" },
        "Squash___Powdery_mildew": { remedy: "Apply sulfur or fungicides.", severity: "moderate" },
        "Strawberry___Leaf_scorch": { remedy: "Use resistant varieties, fungicides.", severity: "moderate" },
        "Strawberry___healthy": { remedy: "Healthy crop.", severity: "healthy" },
        "Tomato___Bacterial_spot": { remedy: "Use copper-based bactericides.", severity: "moderate" },
        "Tomato___Early_blight": { remedy: "Apply fungicides, rotate crops.", severity: "moderate" },
        "Tomato___Late_blight": { remedy: "Apply fungicides immediately.", severity: "severe" },
        "Tomato___Leaf_Mold": { remedy: "Ventilate greenhouses, fungicides.", severity: "moderate" },
        "Tomato___Septoria_leaf_spot": { remedy: "Remove infected leaves, fungicides.", severity: "moderate" },
        "Tomato___Spider_mites Two-spotted_spider_mite": { remedy: "Use miticides or insecticidal soap.", severity: "moderate" },
        "Tomato___Target_Spot": { remedy: "Apply fungicides.", severity: "moderate" },
        "Tomato___Tomato_Yellow_Leaf_Curl_Virus": { remedy: "Remove infected plants, control whiteflies.", severity: "severe" },
        "Tomato___Tomato_mosaic_virus": { remedy: "Remove infected plants, sanitize tools.", severity: "severe" },
        "Tomato___healthy": { remedy: "Healthy crop.", severity: "healthy" }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setError("File size too large. Please upload an image smaller than 10MB.");
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError("Please upload a valid image file.");
                return;
            }

            setImage(file);
            setError(null);
            setResults(null);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async () => {
        if (!image) {
            setError("Please upload an image first!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Connect to your Gradio space
            const client = await Client.connect("SuvamBhola/plant-disease-detector");

            // Call the predict function with the image
            const result = await client.predict("/predict", {
                img: image
            });

            console.log("API Response:", result.data);

            // Process the result
            if (result && result.data && result.data.length > 0) {
                // The result.data should contain the markdown string response from your Gradio space
                const responseText = result.data[0];

                // Parse the response to extract disease information
                // Since your Gradio returns formatted markdown, we'll need to extract the disease name
                const diseaseMatch = responseText.match(/Primary Diagnosis[^*]*\*\*Disease:\*\*\s*([^*\n]+)/);
                let detectedDisease = "Unknown";

                if (diseaseMatch && diseaseMatch[1]) {
                    detectedDisease = diseaseMatch[1].trim();
                    // Convert back to the format used in diseaseInfo keys
                    detectedDisease = detectedDisease.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_(),]/g, '');
                }

                // Look for confidence score
                const confidenceMatch = responseText.match(/Confidence:\*\*\s*([0-9.]+)%/);
                const confidence = confidenceMatch ? parseFloat(confidenceMatch[1]) : 95;

                // Create results array
                const processedResults = [{
                    label: detectedDisease,
                    confidence: confidence,
                    info: diseaseInfo[detectedDisease] || { remedy: "No specific information available.", severity: "unknown" },
                    rawResponse: responseText // Keep the full response for display
                }];

                setResults(processedResults);
            } else {
                throw new Error("No valid response received from the model");
            }

        } catch (err) {
            console.error("Error analyzing image:", err);
            setError(`Failed to analyze image: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'healthy':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'severe':
                return <AlertTriangle className="w-5 h-5 text-red-500" />;
            case 'moderate':
                return <Info className="w-5 h-5 text-yellow-500" />;
            default:
                return <Info className="w-5 h-5 text-gray-500" />;
        }
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'healthy':
                return 'border-green-200 bg-green-50';
            case 'severe':
                return 'border-red-200 bg-red-50';
            case 'moderate':
                return 'border-yellow-200 bg-yellow-50';
            default:
                return 'border-gray-200 bg-gray-50';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] to-[#F5F9F4] p-4 py-18">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        🌿 Plant Disease AI Detector
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Advanced AI-powered plant health analysis with instant treatment recommendations
                    </p>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                        <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                            <Upload className="w-5 h-5 mr-2" />
                            Upload Guidelines
                        </h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Use clear, well-lit images</li>
                            <li>• Focus on affected leaf areas</li>
                            <li>• Avoid blurry or dark photos</li>
                            <li>• Supported: JPG, PNG formats</li>
                            <li>• Max file size: 10MB</li>
                        </ul>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                        <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                            <Camera className="w-5 h-5 mr-2" />
                            Supported Plants
                        </h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Apple, Cherry, Grape, Orange</li>
                            <li>• Tomato, Potato, Pepper, Bell Pepper</li>
                            <li>• Corn, Soybean, Strawberry, Blueberry</li>
                            <li>• Peach, Raspberry, Squash & more</li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Upload Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                            <h3 className="text-xl font-semibold text-indigo-800 mb-6 text-center">
                                📤 Upload Plant Image
                            </h3>

                            <div
                                className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors bg-indigo-50"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {imagePreview ? (
                                    <div className="space-y-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                                        />
                                        <p className="text-indigo-600 font-medium">Click to change image</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Upload className="w-16 h-16 mx-auto text-indigo-400" />
                                        <div>
                                            <p className="text-indigo-600 font-medium">Drop your image here</p>
                                            <p className="text-gray-500">or click to browse</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />

                            <button
                                onClick={analyzeImage}
                                disabled={!image || loading}
                                className="w-full mt-6 bg-gradient-to-r from-[#FFC107] to-[#4CAF50] text-white py-4 px-6 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 animate-spin mr-2" />
                                        Analyzing...
                                    </div>
                                ) : (
                                    '🔍 Analyze Plant Health'
                                )}
                            </button>

                            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <p className="text-yellow-800 text-sm">
                                    <strong>💡 Pro Tip:</strong> Upload a clear photo of a plant leaf for best results!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 min-h-[500px]">
                            <h3 className="text-xl font-semibold text-green-800 mb-6 text-center">
                                📊 Analysis Results
                            </h3>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                                    <p className="text-red-800 text-center">❌ {error}</p>
                                </div>
                            )}

                            {!results && !error && !loading && (
                                <div className="text-center py-16 text-gray-500">
                                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <h4 className="text-lg font-medium mb-2">🚀 Ready for Analysis!</h4>
                                    <p className="mb-4">Upload a plant leaf image to get started with AI-powered disease detection.</p>
                                    <div className="space-y-2 text-sm">
                                        <p>🎯 <strong>Primary diagnosis</strong> with confidence score</p>
                                        <p>💊 <strong>Treatment recommendations</strong> and remedies</p>
                                        <p>🔍 <strong>Alternative possibilities</strong> for comprehensive analysis</p>
                                        <p>💡 <strong>Expert advice</strong> for plant care</p>
                                    </div>
                                </div>
                            )}

                            {loading && (
                                <div className="text-center py-16">
                                    <Loader2 className="w-16 h-16 mx-auto animate-spin text-indigo-600 mb-4" />
                                    <p className="text-indigo-600 text-lg font-medium">Analyzing your plant image...</p>
                                    <p className="text-gray-500 mt-2">This may take a few moments</p>
                                </div>
                            )}

                            {results && results.length > 0 && (
                                <div className="space-y-6">
                                    {/* Display the raw response from Gradio if available */}
                                    {results[0].rawResponse && (
                                        <div className="p-6 bg-gray-50 rounded-xl border">
                                            <h4 className="text-lg font-semibold mb-4">📋 Detailed Analysis</h4>
                                            <div
                                                className="prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{
                                                    __html: results[0].rawResponse
                                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                        .replace(/### (.*?)(\n|$)/g, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
                                                        .replace(/\n/g, '<br>')
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* Simplified result card */}
                                    <div className={`p-6 rounded-xl border-2 ${getSeverityColor(results[0].info.severity)}`}>
                                        <div className="flex items-center mb-4">
                                            {getSeverityIcon(results[0].info.severity)}
                                            <h4 className="text-lg font-semibold ml-2">
                                                Quick Summary ({results[0].confidence.toFixed(1)}% confidence)
                                            </h4>
                                        </div>
                                        <p className="text-lg font-medium mb-2">
                                            {results[0].label.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Treatment:</strong> {results[0].info.remedy}
                                        </p>
                                    </div>

                                    {/* General Recommendations */}
                                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                                        <h4 className="text-lg font-semibold mb-4 text-blue-800">💡 General Recommendations</h4>
                                        <ul className="space-y-2 text-blue-700">
                                            <li><strong>Monitor regularly:</strong> Check your plants weekly for early detection</li>
                                            <li><strong>Proper spacing:</strong> Ensure good air circulation between plants</li>
                                            <li><strong>Clean tools:</strong> Sanitize pruning tools between plants</li>
                                            <li><strong>Consult expert:</strong> For severe cases, contact your local agricultural extension office</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center p-6 bg-white rounded-2xl shadow-lg border border-purple-100">
                    <h4 className="text-lg font-semibold text-purple-800 mb-2">
                        🔬 Powered by EfficientNet-B2 Deep Learning Model
                    </h4>
                    <p className="text-gray-600">
                        This AI model has been trained on thousands of plant images to provide accurate disease detection.
                        <br />
                        <strong>For critical cases, always consult with agricultural professionals.</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AIDetection;