import React, { useEffect, useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

const FILE_ID = process.env.REACT_APP_GOOGLE_DRIVE_FILE_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function PDFViewer() {
  const [currentPDF, setCurrentPDF] = useState({
    file: null,
    countOfPages: 0,
    currentPage: 1,
    zoom: 1.0,
  });
  const viewerRef = useRef(null);
  const [renderTask, setRenderTask] = useState(null); // Track the current render task

  const loadPDF = (filePath) => {
    const loadingTask = pdfjsLib.getDocument(filePath);
    loadingTask.promise
      .then((doc) => {
        setCurrentPDF((prev) => ({
          ...prev,
          file: doc,
          countOfPages: doc.numPages,
        }));
        renderPage(doc, 1, 1.0); // Render the first page when loading
      })
      .catch((error) => {
        console.error("Error loading PDF:", error);
      });
  };

  // Function to render the current page with cancellation of previous tasks
  const renderPage = (pdfFile, pageNum, zoom) => {
    // Cancel the current rendering task if it's still running
    if (renderTask) {
      renderTask.cancel();
    }

    // Get the page and render it on the canvas
    pdfFile.getPage(pageNum).then((page) => {
      const viewport = page.getViewport({ scale: zoom });
      const canvas = viewerRef.current;
      const context = canvas.getContext("2d");

      // Clear the canvas before rendering a new page
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Set the canvas dimensions
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      // Start rendering the page
      const task = page.render(renderContext);
      setRenderTask(task); // Store the current render task

      // After rendering is complete, clear the render task
      task.promise
        .then(() => {
          setRenderTask(null);
        })
        .catch((error) => {
          if (error.name === "RenderingCancelledException") {
            console.log("Rendering cancelled: ", error.message);
          }
        });
    });
  };

  // Navigation (next page)
  const handleNextPage = () => {
    const isValidPage = currentPDF.currentPage < currentPDF.countOfPages;
    if (isValidPage) {
      const newPage = currentPDF.currentPage + 1;
      setCurrentPDF((prev) => ({ ...prev, currentPage: newPage }));
      renderPage(currentPDF.file, newPage, currentPDF.zoom);
    }
  };

  // Navigation (previous page)
  const handlePreviousPage = () => {
    const isValidPage = currentPDF.currentPage - 1 > 0;
    if (isValidPage) {
      const newPage = currentPDF.currentPage - 1;
      setCurrentPDF((prev) => ({ ...prev, currentPage: newPage }));
      renderPage(currentPDF.file, newPage, currentPDF.zoom);
    }
  };

  const handleDownload = () => {
    const fileId = FILE_ID;
    const apiKey = API_KEY;
    console.log(FILE_ID, " + " ,API_KEY)
    const fileUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
    const fileName = "GTHCM202.pdf";

    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    const pdfPath = `GTHCM202.pdf`;
    loadPDF(pdfPath);
  }, []);

  // Function to navigate to a specific page when clicking on a list item
  const handleNavigateToPage = (pageNum) => {
    if (currentPDF.file) {
      setCurrentPDF((prev) => ({ ...prev, currentPage: pageNum }));
      renderPage(currentPDF.file, pageNum, currentPDF.zoom);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-scree">
        <h1 className="text-4xl font-bold my-10">Giáo Trình Môn Học</h1>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-7xl px-5">
          {/* Column 1: PDF Viewer */}
          <div className="flex flex-col items-center">
            <div className="controls mb-4 flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
              <button
                onClick={handleDownload}
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-full shadow-lg transition-all"
              >
                Tải giáo trình
              </button>
            </div>

            <canvas
              ref={viewerRef}
              className="pdf-viewer bg-white shadow-lg rounded-lg w-full max-h-[750px]"
            ></canvas>

            <div className="footer mt-4 flex flex-col items-center">
              <span className="text-gray-700 mb-2">
                Trang {currentPDF.currentPage} trên {currentPDF.countOfPages}
              </span>
            </div>

            <div className="flex mb-10 px-5">
              <button
                onClick={handlePreviousPage}
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 mr-2 rounded-lg shadow-md transition-all"
              >
                Trước
              </button>
              <button
                onClick={handleNextPage}
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 ml-2 rounded-lg shadow-md transition-all"
              >
                Sau
              </button>
            </div>
          </div>

          {/* Column 2: List Items */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4 mb-10">
            <h2 className="text-2xl font-bold mb-4">Danh sách mục lục</h2>
            <ul className="flex flex-col space-y-6">
              <li
                onClick={() => handleNavigateToPage(9)}
                className="bg-gray-100 hover:bg-gray-200 text-lg p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <span className="font-semibold">
                  1. Khái niệm, đối tượng, phương pháp nghiên cứu và ý nghĩa học
                  tập môn tư tưởng Hồ Chí Minh
                </span>
              </li>
              <li
                onClick={() => handleNavigateToPage(21)}
                className="bg-gray-100 hover:bg-gray-200 text-lg p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <span className="font-semibold">
                  2. Cơ sở, quá trình hình thành và phát triển tư tưởng Hồ Chí
                  Minh
                </span>
              </li>
              <li
                onClick={() => handleNavigateToPage(43)}
                className="bg-gray-100 hover:bg-gray-200 text-lg p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <span className="font-semibold">
                  3. Tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội
                </span>
              </li>
              <li
                onClick={() => handleNavigateToPage(71)}
                className="bg-gray-100 hover:bg-gray-200 text-lg p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <span className="font-semibold">
                  4. Tư tưởng Hồ Chí Minh về Đảng Cộng sản Việt Nam và Nhà nước
                  của nhân dân, do nhân dân, vì nhân dân
                </span>
              </li>
              <li
                onClick={() => handleNavigateToPage(96)}
                className="bg-gray-100 hover:bg-gray-200 text-lg p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <span className="font-semibold">
                  5. Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc và đoàn
                  kết quốc tế
                </span>
              </li>
              <li
                onClick={() => handleNavigateToPage(114)}
                className="bg-gray-100 hover:bg-gray-200 text-lg p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <span className="font-semibold">
                  6. Tư tưởng Hồ Chí Minh về văn hóa, đạo đức, con người
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
