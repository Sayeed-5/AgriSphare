import {
    ArrowRightCircle,
    Sprout, Wheat, CalendarRange, Leaf, ScanSearch, Bug,
    Sparkles, Radar, ReceiptText, Store, ShoppingCart,
    Activity, Recycle
  } from "lucide-react"
import { useNavigate } from "react-router-dom"
  
  const Features = () => {
    const navigate = useNavigate();

    const features = [
      {
        icon: "🌱",
        title: "Learn to Grow",
        description: "Discover step-by-step guides, from soil preparation to harvesting, designed for modern sustainable farming.",
        points: [
          { icon: <Sprout className="h-4 w-4 text-green-600" />, text: "Crop-specific growing techniques" },
          { icon: <CalendarRange className="h-4 w-4 text-blue-600" />, text: "Seasonal guides" },
          { icon: <Leaf className="h-4 w-4 text-emerald-600" />, text: "Sustainable & organic methods" },
        ],
        image: "https://img.freepik.com/premium-photo/farmer-uses-tablet-monitor-his-crops-field_14117-770754.jpg",
        navigator: "Explore Guides",
        navigateFunction: () => navigate('/education')
      },
      {
        icon: "🛡️",
        title: "Protect Your Crops",
        description: "AI-powered tools to detect diseases early and provide solutions before they spread.",
        points: [
          { icon: <ScanSearch className="h-4 w-4 text-red-600" />, text: "Smart image-based disease detection" },
          { icon: <Bug className="h-4 w-4 text-orange-600" />, text: "Pest & nutrient deficiency alerts" },
          { icon: <Sparkles className="h-4 w-4 text-yellow-600" />, text: "Personalized recommendations" },
        ],
        image: "https://as2.ftcdn.net/v2/jpg/05/17/72/83/1000_F_517728333_bRo1d5zBGahlA08DZiDZwcr44jvbAT8c.jpg",
        navigator: "Try Crop Protection",
        navigateFunction: () => navigate('/education')
      },
      {
        icon: "⚙️",
        title: "Learn New Tech",
        description: "Stay ahead with the latest agricultural technologies to boost productivity and efficiency.",
        points: [
          { icon: <Radar className="h-4 w-4 text-cyan-600" /> , text: "Smart farming tools (IoT, drones, sensors)" },
          { icon: <ReceiptText className="h-4 w-4 text-purple-600" />, text: "Transparent pricing system" },
          { icon: <Store className="h-4 w-4 text-teal-600" />, text: "Connect with local markets instantly" },
        ],
        image: "https://img.freepik.com/premium-photo/probe-soil-ph_87720-144273.jpg?w=2000",
        navigator: "Explore Guides",
        navigateFunction: () => navigate('/education')
      },
      {
        icon: "🛒",
        title: "Sell Smarter",
        description: "Directly connect with local buyers and sellers for fair, transparent deals.",
        points: [
          { icon: <ShoppingCart className="h-4 w-4 text-pink-600" />, text: "Sell crops, seeds, fertilizers & more" },
          { icon: <Activity className="h-4 w-4 text-indigo-600" />, text: "Real-time monitoring dashboards" },
          { icon: <Recycle className="h-4 w-4 text-lime-600" />, text: "Eco-friendly innovations " },
        ],
        image: "https://media.istockphoto.com/photos/farmer-handshake-picture-id169940000?k=6&m=169940000&s=612x612&w=0&h=n7vYxTn7Eww4m_MKTEU6oS2CuoZzXX5ShiKpewr6_14=",
        navigator: "Start Selling",
        navigateFunction: () => navigate('/agrimart')
      },
    ]
  
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[68rem] mx-auto">
          <div className="flex flex-col gap-6">
            {features.map((feature, index) => (
              <div className={`flex transition-all duration-300 ease-in-out ${index % 2 === 0 ? "hover:translate-x-6 -ml-6 justify-start" : "hover:-translate-x-6 -mr-6 justify-end"} hover:scale-[1.05]`}>
                <div
                  key={index}
                  className="max-w-5xl hero min-h-fit rounded-2xl bg-cover bg-center shadow-4xl "
                  style={{ backgroundImage: `url(${feature.image})` }}
                >
                  <div className={`hero-content p-0 flex-col lg:flex-row ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                    <div className={`bg-black/30 p-8 backdrop-blur-xs ${index % 2 === 0 ? "rounded-r-4xl" : "rounded-l-4xl"} `}>
                      <h1 className="text-5xl font-bold text-[#fff924] ">{feature.icon}{feature.title}</h1>
                      <p className="py-6 text-[#FFC107]">{feature.description}</p>
                      <ul className="mb-4 space-y-2">
                        {feature.points.map((point, i) => (
                          <li key={i} className="flex items-center gap-2">
                            {point.icon}
                            <span className="text-white">{point.text}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="flex items-center gap-2 bg-[#4CAF50] hover:bg-[#FFC107] hover:text-[#212121] text-white px-3 pl-6 py-2 rounded-3xl font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl">{feature.navigator}  <ArrowRightCircle /> </button>
                    </div>
                    <div className="min-w-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  
    )
  }
  
  export default Features
  