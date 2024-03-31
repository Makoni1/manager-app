import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import pdf from "../../../public/privacy-policy.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const OrderInfoConditionsModal = ({ item, onClose }) => {
  const [isConditions, setTsConditions] = useState(false);
  const [numPages, setNumPages] = useState(null);
  function onDocumentLoadSuccess({ numPages }) {
    console.log("PPPPP", numPages);
    setNumPages(numPages);
  }
  return (
    <>
      <div className="modal-overlay">
        <div
          style={{
            backgroundColor: "#f0f4f7",
            width: "57%",
            borderRadius: "6px",
            margin: "30px auto",
          }}
        >
          <div>
            <div
              style={{
                padding: "14px 24px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#ffffff",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: "16px", backgroundColor: "#ffffff" }}>
                Пользовательское соглашение
              </div>
              <div
                onClick={onClose}
                style={{ padding: "4px", cursor: "pointer", opacity: "0.5" }}
              >
                <img src="/icons/close.svg" height="14px" />
              </div>
            </div>

            <div
              style={{
                padding: "24px",
                height: "85vh",
                overflowY: "scroll",
                width: "100%",
              }}
            >
              <div>
                <Document
                  file={pdf}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={console.error}
                  className="pdf-document"
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      className="pdf-page"
                      pageNumber={index + 1}
                      width="800"
                    />
                  ))}
                </Document>
                <div className="pageConditionsModal">
                  <div style={{ marginLeft: "30px", marginTop: '10px' }}>
                  </div>
                  <div style={{ marginRight: "30px" }}>
                        <button onClick={onClose}
                        style={{
                          width: "100%",
                          backgroundColor: "#A3195B",
                          borderRadius: "8px",
                          padding: "14px",
                          border: "none",
                          color: "#ffffff",
                          fontWeight: "500",
                        }}
                      >
                        Закрыть{" "}
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderInfoConditionsModal;
