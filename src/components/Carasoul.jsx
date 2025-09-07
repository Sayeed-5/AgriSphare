const Carasoul = () => {
    const resources = [
        {
            thumbnail: "https://i.pinimg.com/736x/f9/86/e4/f986e4d28fa6ad24dfe90475dac6a248.jpg",
            title: "Learn to Grow",
            link: "https://drive.google.com/file/d/1TamRw11fiJmx3FQ-iRJaEvwWJhi5j7O_/view",
        },
        {
            thumbnail: "https://5.imimg.com/data5/SELLER/Default/2022/12/EK/NP/CN/49293026/fresh-banana-fruit-500x500.webp",
            title: "Learn to Grow",
            link: "https://drive.google.com/file/d/1MV814pD_0ZLsHmSb-9UJM34rYmDtcsH8/view",
        },
        {
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkohgn4Bd7SIrWRaJtgCRmXeFFUWeDCx5ATA&s",
            title: "Learn to Grow",
            link: "https://drive.google.com/file/d/12JfMCx6Xu2O0xJ4uREHXfnZFmPJGvLOY/view",
        },
        {
            thumbnail: "https://m.media-amazon.com/images/I/51lGvUSZstL._UF1000,1000_QL80_.jpg",
            title: "Learn to Grow",
            link: "https://drive.google.com/file/d/1ZucCCeTqaf2Iafuuvj6sLqjpvVxBcv_3/view",
        },
        {
            thumbnail: "https://m.media-amazon.com/images/I/71xiGynWJjL._UF1000,1000_QL80_.jpg",
            title: "Learn to Grow",
            link: "https://drive.google.com/file/d/1IB6_W2fGJ0W1c2wvxvnFWT7EK8ydYuHO/view",
        },
        {
            thumbnail: "https://m.media-amazon.com/images/I/414iTK-C1CL._UF1000,1000_QL80_.jpg",
            title: "Learn to Grow",
            link: "https://drive.google.com/file/d/1IwpXQKObj9T4r6mgAZf6OPa21fGkDPJn/view",
        },
        {
            thumbnail: "https://m.media-amazon.com/images/I/71KmgOL2q4L.jpg",
            title: "Learn to Grow",
            link: "https://drive.google.com/file/d/1hdtMOKbIHmSCycYyTMbhino-RmABEywY/view",
        },
        {
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6GoLpPXoOkT0lAuFcxXwJSQ7nxtRQqVJLg&s",
            title: "Learn to Grow",
            link: "https://drive.google.com/file/d/18Cbc7ZLJIAmqsUYPy4Gp5p9DD0diNlHe/view",
        },
        {
            thumbnail: "https://m.media-amazon.com/images/I/41QKCkQ2A5L.jpg",
            title: "Learn to Grow",
            link: "https://drive.google.com/file/d/14xZWwiTjKyu2PlorF8__7rSatkhnpJpt/view",
        },
        {
            thumbnail: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
            title: "Learn to Grow",
            link: "https://drive.google.com/file/d/1NQM7l0FwE2U8t0250GJz3LbkERGo-LzR/view",
        },
        {
            thumbnail: "https://cdn.shopaccino.com/rootz/products/watermelon-3kg-866084_m.jpg?v=569",
            title: "Learn to Grow",
            link: "https://drive.google.com/file/d/10EIGRROK8nQWKQbGckNv4UScDQ7wM4AA/view",
        },
        {
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZT9UOP2UE-VQ9KNKJwMCdkUEaTp-GDKuAg&s",
            title: "Learn to Grow",
            link: "https://drive.google.com/file/d/1B9M1ecSQ3x6gQfZ8_kNsfJs3O279FsXU/view",
        },
    ];

     return (
        <div className="max-w-6xl mx-auto bg-white/30 rounded-xl px-4 py-4 backdrop-blur-md"> 
            <h2 className="text-2xl font-bold text-center mb-6">Grow Tips</h2>  
            <div className="carousel rounded-box flex gap-8">
                {resources.map((resource, index) => (
                    <a
                        key={index}
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white carousel-item block w-56 flex-shrink-0 rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative">
                            <img
                                src={resource.thumbnail}
                                alt={resource.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="bg-[#4CAF50] hover:bg-[#FFC107] hover:text-[#212121] font-semibold text-white absolute bottom-0 left-0 w-full rounded-t-lg p-2 text-center">
                                {resource.title}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Carasoul;
