import React, { useState } from "react";

export default function Timeline() {
  // Set initial state to 5 to show the period before 1911 by default
  const [selectedPeriod, setSelectedPeriod] = useState(5);

  const periods = [
    {
      id: 1,
      imgSrc: "httt5.jpg",
      text: "Giai đoạn 1945 - 1969, Tư tưởng Hồ Chí Minh tiếp tục phát triển và hoàn thiện",
      imgSample: "bacHo6.png",
      marginLeft: "sm:ml-[315px] ml-[187px]",
    },
    {
      id: 2,
      imgSrc: "httt4.jpg",
      text: "Giai đoạn 1930 - 1945, Vượt qua thử thách, kiên trì, giữ vững lập trường cách mạng.",
      imgSample: "bacHo5.jpg",
      marginLeft: "sm:ml-[230px] ml-[139px]",
    },
    {
      id: 3,
      imgSrc: "httt3.jpg",
      text: "Giai đoạn 1921 - 1930, Bác hình thành cơ bản tư tưởng về cách mạng Việt Nam",
      imgSample: "bacHo4.jpg",
      marginLeft: "sm:ml-[150px] ml-[94px]",
    },
    {
      id: 4,
      imgSrc: "httt2.jpg",
      text: "Giai đoạn 1911 - 1920, Bác tìm thấy con đường cứu nước, giải phóng dân tộc.",
      imgSample: "bacHo3.jpg",
      marginLeft: "sm:ml-[75px] ml-[52px]",
    },
    {
      id: 5,
      imgSrc: "httt.jpg",
      text: "Trước năm 1911, Bác hình thành tư tưởng yêu nước và chí hướng cứu nước.",
      imgSample: "bacHo2.jpg",
      marginLeft: "sm:ml-[0px] ml-[10px]",
    },
  ];

  return (
    <div className="container mx-auto mt-10 mb-10">
      <h2 className="text-4xl font-bold mb-5 px-5">
        Quá Trình Hình Thành Tư Tưởng
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="sm:pt-20 pt-5">
          {periods.map((period) => (
            <img
              key={period.id}
              className={`w-1/2 ${period.marginLeft} cursor-pointer`}
              src={period.imgSrc}
              alt={`Period ${period.id}`}
              onClick={() => setSelectedPeriod(period.id)}
            />
          ))}
        </div>
        <div>
          {selectedPeriod && (
            <div className="text-center md:text-left">
              <p className="font-poppins text-2xl px-5 sm:px-10 mb-5">
                {periods.find((p) => p.id === selectedPeriod)?.text}
              </p>
              <img
                className="sm:px-10 px-5 w-full"
                src={periods.find((p) => p.id === selectedPeriod)?.imgSample}
                alt="Additional Period Image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
