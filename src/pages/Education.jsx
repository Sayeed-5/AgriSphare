import Carasoul from "../components/Carasoul"
import SchemeCards from "../components/SchemeCards"
import VideoCarasoul from "../components/VideoCarasoul"

function Education() {
    return (
        <div className="max-w-[100rem] mx-auto bg-[#F5F9F4]" >
          <div className="min-h-screen py-12">
            <Carasoul/>
            <VideoCarasoul/>
            <SchemeCards/>
          </div>
        </div>
    )
  }
  
  export default Education