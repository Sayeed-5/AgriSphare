const Hero = () => {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 backdrop-blur-[0.07rem]">
        <div className="max-w-5xl mx-auto text-center flex flex-col justify-center items-center">
          {/* New Feature Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium mt-12 mb-12">
            <span className="text-white px-2 py-0.5 rounded-full text-5xl font-bold text-shadow-xl ">Revolutionizing Farming with <a href="http://" className="hover:text-[#29B6F6]" target="_blank" rel="noopener noreferrer">Ai ✨</a></span>
          </div>
  
          {/* Main Heading */}
          <h1 className="text-2xl text-[#fff924] font-semibold mb-8 leading-tight">
            Learn how to grow smarter, protect crops from diseases, explore new agri-tech, <br />and connect with local buyers & sellers - all in one platform that empowers the youth towards modern farming.
          </h1>
  
          {/* Description */}
          <p className="text-xl text-[#34ff45] font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
            From seed to market, everything you need for farming success is <a href="http://" className="hover:text-[#29B6F6]" target="_blank" rel="noopener noreferrer">here</a> .
          </p>
  
          {/* CTA Buttons */}
          <span className="flex flex-col sm:flex-row gap-4 justify-center items-center bg-black/60 rounded-4xl px-3 py-2 pl-5">
            <div className="text-xl text-white">Start Your Smart Farming Journey</div>
            <button className=" bg-green-500 hover:bg-[#FFC107] hover:text-[#212121] text-white px-6 py-2 rounded-3xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transition-colors duration-300">
              Get Started 
            </button>
            
          </span>
        </div>
      </section>
    )
  }
  
  export default Hero
  