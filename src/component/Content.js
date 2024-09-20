import React, { useState } from "react";
import VideoCarousel from "./YoutubeEmbed";

function Content() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShow = (item) => () => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  return (
    <>
      <div>
        <img
          className="max-h-[750px] w-full object-fill"
          src="banner1.jpg"
          alt="Overview Banner"
        />
      </div>
      <div className="p-5">
        <div className="mx-auto">
          <h1 className="text-4xl font-bold mt-4 mb-10">Nội Dung Chương 6</h1>
          <iframe
            className="w-full h-auto sm:min-h-[550px] min-h-[220px] mx-auto rounded-lg"
            src="https://www.canva.com/design/DAGQW2-EpvA/DwgeP8DSSsMKAg6URjwjhw/view?embed"
            title="Nội dung chương 6"
          />
        </div>
        <div className="bg-gray-50 pb-5">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold pt-5 mt-16 mb-10">
              Câu Hỏi Kiến Tạo Xã Hội
            </h1>
            <div className="flex justify-center">
              <img className="mb-5" src="bacho.jpeg" alt="CQ" />
            </div>
            <p className="text-lg font-semibold mb-5">
              <b>Hồ Chí Minh</b> từng viết: "Người có tài mà không có đức là
              người vô dụng, người có đức mà không có tài thì làm việc gì cũng
              khó", các bạn nghĩ thế nào?
            </p>
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4 mb-10">
              <ul className="flex flex-col space-y-6">
                <li
                  className="bg-gray-200 hover:bg-gray-300 text-lg p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={handleShow(1)}
                >
                  <span className="font-poppins font-semibold">
                    1. Khái niệm của Hồ Chí Minh về Tài và Đức
                  </span>
                  {selectedItem === 1 && (
                    <div className="mt-4 text-md px-7 text-left">
                      <ul className="space-y-5">
                        <li className="font-poppins list-disc">
                          Tài là khả năng, trí tuệ để hoàn thành nhiệm vụ hiệu
                          quả, trong khi đức là nền tảng của con người, là tiêu
                          chuẩn đánh giá phẩm chất cá nhân và hướng dẫn tài năng
                          phục vụ nhân dân.
                        </li>
                        <li className="font-poppins list-disc">
                          Hồ Chí Minh nhấn mạnh sự kết hợp giữa đạo đức ("hồng")
                          và tài năng ("chuyên"), coi đức là gốc của tài và tài
                          là phương tiện biến đạo đức thành hành động. Người có
                          đức mà thiếu tài sẽ khó áp dụng lý thuyết vào thực
                          tiễn.
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li
                  className="bg-gray-200 hover:bg-gray-300 text-lg p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={handleShow(2)}
                >
                  <span className="font-poppins font-semibold">
                    2. "Người có tài mà không có đức là người vô dụng"
                  </span>
                  {selectedItem === 2 && (
                    <div className="mt-4 text-md px-7 text-left">
                      <ul className="space-y-5">
                        <li className="font-poppins list-disc">
                          Một người có tài nhưng thiếu đạo đức có thể sử dụng
                          tài năng của mình theo những mục đích không lành mạnh,
                          thậm chí gây hại cho xã hội. Vì vậy, người tài năng mà
                          không có đạo đức không những không có ích mà còn có
                          thể trở thành "vô dụng" hoặc nguy hiểm.
                        </li>
                        <li className="font-poppins list-disc">
                          Đạo đức là kim chỉ nam để sử dụng tài năng đúng mục
                          đích. Nếu chỉ có tài mà thiếu đạo đức, tài năng đó
                          không phục vụ lợi ích chung, không giúp ích cho xã
                          hội, từ đó trở nên vô giá trị.
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li
                  className="bg-gray-200 hover:bg-gray-300 text-lg p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={handleShow(3)}
                >
                  <span className="font-poppins font-semibold">
                    3. "Người có đức mà không có tài thì làm việc gì cũng khó"
                  </span>
                  {selectedItem === 3 && (
                    <div className="mt-4 text-md px-7 text-left">
                      <ul className="space-y-5">
                        <li className="font-poppins list-disc">
                          Một người có đạo đức tốt nhưng thiếu năng lực và kỹ
                          năng cần thiết sẽ gặp trở ngại khi muốn thực hiện
                          những việc lớn hoặc đóng góp cho xã hội. Người này có
                          thiện chí và động lực làm việc đúng đắn nhưng lại
                          không đủ khả năng để triển khai thành hành động thực
                          tế. Điều này gây khó khăn trong việc đạt được kết quả
                          mong muốn.
                        </li>
                        <li className="font-poppins list-disc">
                          Vì vậy, tài năng là cần thiết để hỗ trợ và cụ thể hóa
                          những phẩm chất đạo đức thành hành động, đóng góp cho
                          xã hội một cách hiệu quả.
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li
                  className="bg-gray-200 hover:bg-gray-300 text-lg p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  onClick={handleShow(4)}
                >
                  <span className="font-poppins font-semibold">
                    4. Kết luận
                  </span>
                  {selectedItem === 4 && (
                    <div className="mt-4 text-md px-7 text-left">
                      <ul className="space-y-5">
                        <li className="font-poppins list-disc">
                          Qua hai vế của câu nói, Hồ Chí Minh đã thể hiện rõ
                          quan điểm về sự cần thiết của việc kết hợp giữa đức và
                          tài. Người cách mạng cần có đủ cả hai yếu tố này để có
                          thể hoàn thành nhiệm vụ cách mạng một cách xuất sắc.
                          mong muốn.
                        </li>
                        <li className="font-poppins list-disc">
                          Nếu chỉ có tài mà không có đức, con người sẽ thiếu
                          định hướng, dễ sử dụng tài năng vào những việc tiêu
                          cực, gây hại cho xã hội.
                        </li>
                        <li className="font-poppins list-disc">
                          Ngược lại, nếu chỉ có đức mà không có tài, con người
                          sẽ gặp khó khăn trong việc biến các lý tưởng tốt đẹp
                          thành kết quả thực tế.
                        </li>
                        <li className="font-poppins list-disc">
                          Như vậy, tư tưởng Hồ Chí Minh luôn nhấn mạnh đến sự
                          thống nhất giữa đức và tài, và rằng đức là nền tảng
                          của tài. Đây là bài học sâu sắc trong việc rèn luyện
                          và phát triển con người toàn diện, đặc biệt trong bối
                          cảnh xây dựng đất nước​.
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <VideoCarousel/>
        </div>
      </div>
    </>
  );
}

export default Content;
