import Carasoul from "../components/Carasoul"
import SchemeCards from "../components/SchemeCards"
import VideoCarasoul from "../components/VideoCarasoul"

function Education() {
    return (
        <div className="max-w-[100rem] mx-auto bg-[#FFF9F0] " >
          <div className="min-h-screen flex flex-col gap-8 py-12">
            <Carasoul/>
            <VideoCarasoul/>
            <SchemeCards/>
          </div>
        </div>
    )
  }
  
  export default Education