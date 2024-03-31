import React from 'react';
import OrdersDocumentCard from "./OrdersDocumentCard";

const OrdersDocuments = ({
                            onUploadFiles,
                            files = [],
                            allowUpload = false,
                            allowDownload = false,
                            allowClearFile = false,
                            allowShare = false
}) => {
  const setFile = file => {
    onUploadFiles([...files, file])
    // onUploadFiles(file)
  }
  const removeFile = (fileId, index) => {
    let f = [...files]
    if (fileId) {
      f = f.filter(i => i.id !== fileId)
    } else {
      f = f.filter((_, idx) => idx !== index)
    }
    onUploadFiles(f)
  }
  return (
    <div className="d-flex gap-2 flex-wrap">
      { files.map((file, idx) => <OrdersDocumentCard
          key={file.id || 'file-' + idx}
          text={file.name || file.fileName}
          fileId={file.fileId}
          allowClearFile={allowClearFile}
          onClearFile={() => removeFile(file.id, idx) }
        />
      )}

      { allowUpload && <OrdersDocumentCard isAddButton onUploadFile={setFile} key={'files-' + files.length} /> }
      { allowDownload && <OrdersDocumentCard text="Скачать все" withIcon={false} /> }
      { allowShare && <OrdersDocumentCard text="Отправить сотрудникам" withIcon={false} /> }
    </div>
  );
};

export default OrdersDocuments;