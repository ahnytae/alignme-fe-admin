import React from 'react';
import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';

export interface FileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, ...props }, ref) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            className="h-9 py-2 px-4 flex gap-2 justify-center items-center cursor-pointer border border-border-primary text-content-primary font-semibold rounded-lg"
          >
            <img src="/assets/icon/plus.svg" alt="plus" className="w-4 h-4" />
            이미지 추가
          </label>
        </div>

        {/* 추가된 이미지 text 나열 */}
        {file && (
          <div className="h-9 px-4 py-2 flex items-center rounded-lg bg-background-secondary border border-border-secondary">
            <div className="flex-1 flex items-center gap-2">
              <img
                src="/assets/icon/paperclip.svg"
                alt="paperclip"
                className="w-5 h-5"
              />
              <p className="font-medium text-sm text-content-primary line-clamp-1">
                {file.name}
              </p>
            </div>
            <div>
              <img
                src="/assets/icon/xmark.svg"
                alt="x mark"
                className="w-5 h-5 cursor-pointer"
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

        <Input
          type="file"
          id={props.id}
          className="hidden"
          onChange={onChange}
        />
      </>
    );
  }
);

export { FileInput };
