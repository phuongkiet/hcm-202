import PDFViewer from "./PDFViewer";
import Timeline from "./Timeline";

export default function Overview() {
  return (
    <>
      <div>
        <img
          className="max-h-[750px] w-full object-fill"
          src="banner1.jpg"
          alt="Overview Banner"
        />
      </div>
      <div className="container mx-auto my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold mb-2">Tiểu sử</h2>
            <h3 className="text-3xl font-bold mb-2">
              Chủ tịch Hồ Chí Minh (19/5/1890 - 2/9/1969)
            </h3>
            <p className="text-xl text-justify px-5 sm:px-0">
              <b>Hồ Chí Minh</b>, tên khai sinh là Nguyễn Sinh Cung, còn được
              biết với tên gọi Bác Hồ, là một nhà cách mạng và chính khách người
              Việt Nam. Ông là người sáng lập Đảng Cộng sản Việt Nam, từng là
              Chủ tịch nước Việt Nam Dân chủ Cộng hoà từ 1945 – 1969, Thủ tướng
              Việt Nam Dân chủ Cộng hòa trong những năm 1945–1955, Tổng Bí thư
              Ban Chấp hành Trung ương Đảng Lao động Việt Nam từ 1956 – 1960,
              Chủ tịch Ban Chấp hành Trung ương Đảng Lao động Việt Nam từ năm
              1951 cho đến khi qua đời.
            </p>

            <div className="flex mt-10 lg:justify-end justify-center">
              <a
                href="https://tulieuvankien.dangcongsan.vn/c-mac-angghen-lenin-ho-chi-minh/ho-chi-minh/tieu-su-cuoc-doi-va-su-nghiep/tieu-su-chu-tich-ho-chi-minh-52"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Tìm hiểu thêm
              </a>
            </div>
          </div>

          <div>
            <img
              className="w-full max-h-[750px]"
              src="portrait.jpg"
              alt="Portrait of Hồ Chí Minh"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container mx-auto mt-20 mb-10 py-10">
          <h2 className="text-4xl font-bold mb-4">Tổng Quan Môn Học</h2>
          <div className="text-center md:text-left">
            <p className="text-xl text-center px-5 sm:px-0">
              Môn học <b>Tư tưởng Hồ Chí Minh</b> là một học phần quan trọng
              trong chương trình đào tạo đại học, giúp sinh viên hiểu rõ hơn về
              cuộc đời, sự nghiệp và hệ thống tư tưởng của Chủ tịch Hồ Chí Minh.
              Nội dung của môn học bao gồm những giá trị cốt lõi trong tư tưởng
              Hồ Chí Minh về độc lập dân tộc, chủ nghĩa xã hội, Đảng Cộng sản,
              nhà nước pháp quyền, và đạo đức cách mạng. Thông qua môn học, sinh
              viên sẽ nắm vững được tư tưởng chiến lược của Người trong công
              cuộc xây dựng và bảo vệ Tổ quốc, cũng như vận dụng các bài học quý
              báu này vào thực tiễn đời sống xã hội hiện nay.
            </p>
          </div>
        </div>
      </div>

      <div>
        <Timeline/>
      </div>

      <div className="bg-gray-50">
        <PDFViewer />
      </div>
    </>
  );
}
