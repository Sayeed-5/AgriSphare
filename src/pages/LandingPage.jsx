import { TooltipProvider } from "../components/ui/tooltip"
import Hero from "../components/Hero"
import Features from "../components/Features"
import FarmerDashboard from "../components/FarmerDashboard"
import LocalBuyersLogistics from "../components/LocalBuyersLogistics"
import Leaderboard from "../components/LeaderBoard"
import Footer from "../components/Footer"


function LandingPage() {
    return (
      <TooltipProvider>
        <div className="max-w-[100rem] mx-auto bg-fixed bg-cover bg-center " style={{ backgroundImage: "url('/Rice-Field.jpg')"}}>
          <div className="bg-black/30 min-h-screen">
            <main>
              <Hero />
              <Features />
              <FarmerDashboard />
              <Leaderboard />
              <LocalBuyersLogistics />
            </main>
            <Footer />
          </div>
        </div>
      </TooltipProvider>
    )
  }
  
  export default LandingPage