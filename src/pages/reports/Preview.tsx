/*
 * @Author: ZHONG JUN
 * @Date: 2020-02-23 11:45:32
 * @Description: PDF文件预览窗口
 */

import React from 'react';
import router from 'umi/router';
import { ActivityIndicator, Modal } from 'antd-mobile';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// 備用`cdnhttps://cdn.bootcss.com/pdf.js/${pdfjs.version}/pdf.worker.min.js`
import 'react-pdf/dist/Page/AnnotationLayer.css';
// import { Document, Page } from 'react-pdf/dist/entry.webpack';
import { getPageKeyValue } from '@/utils';
import styles from './Preview.less';

const options = {
  // 有pdf不支持的字体格式，可以通过引入pdf.js的字体来解决该问题
  // 1.cdn --> https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/cmaps/
  // 2.cdn --> https://cdn.bootcss.com/pdf.js/2.4.456/pdf.min.js
  // 2.本地 --> ./cmaps/
  cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`, // '/pdfjs-dist/cmaps/',
  cMapPacked: true,
};
const SAMPLE = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';

export default function Preview() {

  const [numPages, setNumPages] = React.useState(null);
  const [file, setFile] = React.useState();

  React.useEffect(() => {
    const file = getPageKeyValue('file');
    const pdf_url: any = file ? file : SAMPLE;
    setFile(pdf_url)
  }, [])

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  }

  const onDocumentLoadError = ({ message }: any) => {
    Modal.alert(
      '错误提示',
      <div style={{ wordBreak: 'break-word' }}>{message}</div>,
      [
        { text: '确定', onPress: () => router.goBack() },
      ])
  }

  return (
    <div className={styles.container}>
      <Document
        className={styles.document}
        file={file}
        options={options}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={
          <div style={{ marginTop: '2rem' }}>
            <ActivityIndicator text="文件加载中，请稍等..." />
          </div>
        }
        error={<div style={{ marginTop: '2rem' }}>加载PDF文件失败。</div>}
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

