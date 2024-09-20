import React from 'react';
import Slider from 'react-slick';

const YouTubeEmbed = ({ videoId }) => {
  const src = `https://www.youtube.com/embed/${videoId}`;
  return (
    <iframe
      className="w-full aspect-video"
      src={src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

function VideoCarousel() {
  const videos = [
    { id: 'giQN5HSPi8k', title: 'Đạo đức cách mạng theo tư tưởng Hồ Chí Minh - VNEWS' },
    { id: 'Kst9WItHj5Q', title: 'Học tập và làm theo đạo đức Hồ Chí Minh' },
    { id: '3jRm8KRwFlo', title: 'Tư tưởng Hồ Chí Minh về xã hội chủ nghĩa' },
    { id: 'PS1rvFLjyzU', title: 'Tư tưởng Hồ Chí Minh về xây dựng con người Việt Nam' }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div className="bg-orange-600 text-white p-5">
      <h2 className="text-2xl font-bold mb-4">Video liên quan</h2>
      <Slider {...settings}>
        {videos.map((video, index) => (
          <div key={index} className="px-3">
            <div className="bg-gray-300 p-3 rounded-lg shadow-lg">
              <a href={`https://www.youtube.com/embed/${video.id}`} className="font-semibold text-black hover:text-blue-500">{video.title}</a>
              <YouTubeEmbed videoId={video.id} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default VideoCarousel;
