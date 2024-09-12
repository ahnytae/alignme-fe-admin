import { ChangeEvent } from 'react';

/**
 * 파일 업로드 accept type
 */
export const imageAccept = 'image/png, image/jpeg, image/jpg, image/gif';
export const videoAccept =
  'video/mp4, video/quicktime, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/x-flv, video/webm, video/ogg';
export const documentAccept = '.pdf, .doc, .docx, .xls, .xlsx';
export const allAccept = '*/*';

/**
 * 파일에서 이미지 데이터 추출
 * @param  event  ChangeEvent<HTMLInputElement>
 * @returns  {files, displayUrl}
 */
export function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  const displayUrl = file ? URL.createObjectURL(file) : null;
  return { files: event.target.files, displayUrl };
}

/**
 * file size 체크
 * @param file file object
 * @param size size (단위: MB)
 * @returns boolean 유효성 검사 결과
 */
export function checkFileSize(file: File, size: number) {
  return file.size < size * 1024 * 1024;
}

/**
 * file type 체크
 * @param file file object
 * @param accept accept type
 * @returns boolean 유효성 검사 결과
 */
export function checkFileType(file: File, accept: string) {
  if (accept === '*/*') return true;
  return accept.split(',').some((type) => file.type.includes(type.trim()));
}

/**
 * file 유효성 검사 (type, size)
 * @param file file object
 * @param accept accept type
 * @param size size (단위: MB)
 * @returns boolean 유효성 검사 결과
 */
export function validateFile(file: File, accept: string, size: number) {
  if (!checkFileType(file, accept)) return false;
  if (!checkFileSize(file, size)) return false;
  return true;
}
