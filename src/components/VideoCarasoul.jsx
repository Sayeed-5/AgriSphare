const VideoCarasoul = () => {
    const videos = [
        { id: "Z8JAG3qdarI", title: "Video 1" },
        { id: "-M5HL6CaEic", title: "Video 2" },
        { id: "xubxKQDIRcM", title: "Video 3" },
        { id: "BwktUQm7ZlQ", title: "Video 4" },
        { id: "7vdWY7jySjs", title: "Video 5" },
        { id: "ncIYn3W6H58", title: "Video 6" },
        { id: "hIjzJ-vRRCQ", title: "Video 7" },
        { id: "6cbJA4MWIBQ", title: "Video 8" },
        { id: "kjtjxQHvDio", title: "Video 9" }
    ];

    return (
        <div className="max-w-6xl mx-auto bg-white/30 rounded-xl px-4 py-4 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-center mb-6">Learn new Tech</h2>
            <div className="carousel carousel-center rounded-box flex gap-8 ">
                {videos.map((video, index) => (
                    <div
                        key={index}
                        className="carousel-item flex-shrink-0 w-74 rounded shadow-lg overflow-hidden "
                    >
                        <iframe
                            className="w-full h-48"
                            src={`https://www.youtube.com/embed/${video.id}`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <div className="bg-black bg-opacity-60 text-white p-2 text-center">
                            {video.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoCarasoul;
