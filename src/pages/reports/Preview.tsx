/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-23 11:45:32
 * @Description: PDF文件预览窗口
 */

import React from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import styles from './Preview.less';

const options = {
  cMapUrl: '/pdfjs-dist/cmaps/',
  cMapPacked: true,
};

export default function Preview() {
  const [numPages, setNumPages] = React.useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  return (
    <div className={styles.container}>
      <Document
        className={styles.document}
        file={'/pdfjs-dist/eobbook.pdf'}
        options={options}
        onLoadSuccess={onDocumentLoadSuccess}
      >
      {
        Array.from(
          new Array(numPages),
          (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              className={styles.page}
            />
          ),
        )
      }
      </Document>
    </div>
  )
}

