import React, { useState, useEffect, useRef } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";

export default function Overview() {
  // Google Drive PDF link
  const googleDrivePdfLink = "https://drive.google.com/uc?export=download&id=1zM7gj-kbFt7G7y6vEZCWx2uuj3j7uqVR";

  const canvasRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Load PDFJS worker
  GlobalWorkerOptions.workerSrc = pdfWorker;

  useEffect(() => {
    const fetchPdf = async () => {
      const pdfDocument = await getDocument(googleDrivePdfLink).promise;
      setPdf(pdfDocument);
      setTotalPages(pdfDocument.numPages);
    };

    fetchPdf();
  }, [googleDrivePdfLink]);

  // Function to render page on canvas
  const renderPage = async (num) => {
    if (pdf) {
      const page = await pdf.getPage(num);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas dimensions
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into the canvas context
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext).promise;
    }
  };

  // Render the first page initially
  useEffect(() => {
    if (pdf) {
      renderPage(pageNumber);
    }
  }, [pdf, pageNumber]);

  // Handle next page
  const nextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
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
      <div className="container mx-auto my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold mb-2">Tiểu sử</h2>
            <h3 className="text-3xl font-bold mb-2">
              Chủ tịch Hồ Chí Minh (19/5/1890 - 2/9/1969)
            </h3>
            <p className="text-xl text-justify px-5 sm:px-0">
              <b>Hồ Chí Minh</b>, tên khai sinh là Nguyễn Sinh Cung, còn
              được biết với tên gọi Bác Hồ, là một nhà cách mạng và chính khách
              người Việt Nam. Ông là người sáng lập Đảng Cộng sản Việt Nam, từng
              là Chủ tịch nước Việt Nam Dân chủ Cộng hoà từ 1945 – 1969, Thủ
              tướng Việt Nam Dân chủ Cộng hòa trong những năm 1945–1955, Tổng Bí
              thư Ban Chấp hành Trung ương Đảng Lao động Việt Nam từ 1956 –
              1960, Chủ tịch Ban Chấp hành Trung ương Đảng Lao động Việt Nam từ
              năm 1951 cho đến khi qua đời.
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

      {/* PDF Canvas and Pagination
      <div className="mt-10 text-center">
        <h3 className="text-3xl font-bold mb-5">Giáo trình</h3>
        <canvas ref={canvasRef}></canvas>
        <div className="flex justify-center mt-5">
          <button
            onClick={prevPage}
            disabled={pageNumber === 1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-2"
          >
            Trang trước
          </button>
          <span className="text-xl mx-2">
            Trang {pageNumber} / {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={pageNumber === totalPages}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-2"
          >
            Trang tiếp theo
          </button>
        </div>
      </div> */}
    </>
  );
}
