import React, { useRef } from 'react';
import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { getImageData, imageAccept, videoAccept, documentAccept, allAccept } from '@/common/fileUpload';

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  accept?: typeof imageAccept | typeof videoAccept | typeof documentAccept | typeof allAccept;
  maxFileSize?: number;
  isEditMode?: boolean;
  imageUrl?: string;
  cb?: (arg: any) => void;
}

const FileInput = React.forwardRef<HTMLImageElement, FileInputProps>(
  ({ className, maxFileSize = 5, accept = allAccept, isEditMode = false, imageUrl = '', ...props }, ref) => {
    const [preview, setPreview] = useState<string | null>(isEditMode ? imageUrl : null);
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const imgRef = useRef<HTMLImageElement>(null);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) return;

      if (!file || !validateFile(file)) {
        const sizeMessage = `${maxFileSize}MB 이하`;
        const typeMessage = 'JPG 또는 PNG';
        alert(`${sizeMessage}, ${typeMessage} 파일만 업로드 가능합니다.`);
        return;
      }

      const { files, displayUrl } = getImageData(event);
      props.onChange && props.onChange(event);
      setPreview(displayUrl);
      setFile(files![0]);
    };

    const validateFile = (file: File) => {
      const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png'];
      const MAX_FILE_SIZE = maxFileSize * 1024 * 1024;

      return file.size <= MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type);
    };

    const handleDeleteImage = () => {
      setPreview(null);
      setFile(null);

      // input 값 초기화
      if (inputRef.current) {
        inputRef.current.value = '';
      }

      // props로 받은 onChange에 null 전달을 위한 가짜 이벤트 생성
      const emptyEvent = {
        target: {
          value: '',
          files: null,
        },
      } as unknown as ChangeEvent<HTMLInputElement>;

      props.onChange && props.onChange(emptyEvent);
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
            {isEditMode ? '이미지 수정' : '이미지 추가'}
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
                onClick={handleDeleteImage}
              />
            </div>
          </div>
        )}

        {/* preview 사진 */}
        <div className="flex h-full h-[400px] w-full items-center justify-center rounded  hover:border-gray-400">
          {/* {preview && <img ref={imgRef} src={preview} alt="Preview" className="h-full w-full rounded object-cover" />} */}

          {/* <img ref={imgRef} src={preview || ''} alt="Preview" className="h-full w-full rounded object-cover" /> */}
          {preview && <img ref={ref} src={preview} alt="Preview" className="h-full w-full rounded object-cover" />}
        </div>

        <Input type="file" ref={inputRef} id={props.id} className="hidden" onChange={onChange} accept={accept} />
      </>
    );
  },
);

export { FileInput };
