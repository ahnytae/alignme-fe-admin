import React from 'react';
import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { getImageData, validateFile, imageAccept, videoAccept, documentAccept, allAccept } from '@/common/fileUpload';

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  accept?: typeof imageAccept | typeof videoAccept | typeof documentAccept | typeof allAccept;
  maxFileSize?: number;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, maxFileSize = 1, accept = allAccept, ...props }, ref) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !validateFile(file, accept, maxFileSize)) {
        if (accept === allAccept) {
          alert(`${maxFileSize} MB 이하 파일만 등록가능합니다.`);
        } else {
          alert(`${maxFileSize} MB 이하,  ${accept} 파일만 등록가능합니다.`);
        }
        return;
      }

      const { files, displayUrl } = getImageData(event);
      props.onChange && props.onChange(event);
      setPreview(displayUrl);
      setFile(files![0]);
    };

    return (
      <>
        {/* 이미지 추가 버튼 */}
        <div>
          <label
            htmlFor={props.id}
            className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border-primary px-4 py-2 font-semibold text-content-primary"
          >
            <img src="/assets/icon/plus.svg" alt="plus" className="h-4 w-4" />
            이미지 추가
          </label>
        </div>

        {/* 추가된 이미지 text 나열 */}
        {file && (
          <div className="flex h-9 items-center rounded-lg border border-border-secondary bg-background-secondary px-4 py-2">
            <div className="flex flex-1 items-center gap-2">
              <img src="/assets/icon/paperclip.svg" alt="paperclip" className="h-5 w-5" />
              <p className="line-clamp-1 text-sm font-medium text-content-primary">{file.name}</p>
            </div>
            <div>
              <img
                src="/assets/icon/xmark.svg"
                alt="x mark"
                className="h-5 w-5 cursor-pointer"
                onClick={() => {
                  setPreview(null);
                  setFile(null);
                }}
              />
            </div>
          </div>
        )}

        {/* preview 사진 */}
        {/* <div className="w-40 h-40 bg-gray-200">
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover"
            />
          )}
        </div> */}

        <Input type="file" id={props.id} className="hidden" onChange={onChange} accept={accept} />
      </>
    );
  },
);

export { FileInput };
