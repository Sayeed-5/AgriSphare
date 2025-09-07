import { TooltipProvider } from "../components/ui/tooltip"
import Hero from "../components/Hero"
import Features from "../components/Features"
import ProductDetails from "../components/ProductDetails"
import Carasoul from "../components/Carasoul"
import VideoCarasoul from "../components/VideoCarasoul"
import SchemeCards from "../components/SchemeCards"
import FarmingChatbot from "../components/FarmingChatbot"
import AIDetection from "./AIDetection"
import ChatbotWidget from "../components/ChatbotWidget"
import Education from "./Education"



function LandingPage() {
    return (
      <TooltipProvider>
        <div className="max-w-[100rem] mx-auto bg-fixed bg-cover bg-center " style={{ backgroundImage: "url('/Rice-Field.jpg')"}}>
          <div className="bg-black/30 min-h-screen">
            <main>
              <Hero />
              <Features />
              <AIDetection/>
              <div className="max-w-[100rem] mx-auto " >
                <div className="min-h-screen py-12">
                  <Carasoul/>
                  <VideoCarasoul/>
                  <SchemeCards/>
                </div>
              </div>
              <ChatbotWidget/>
            </main>
          </div>
        </div>
      </TooltipProvider>
    )
  }
  
  export default LandingPage