import React from 'react';
import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { PlusIcon, UserRound } from 'lucide-react';
import { FileInputProps } from '@/components/ui/fileInput';
import { imageAccept, getImageData, validateFile } from '@/common/fileUpload';

const AvatarImageInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, accept = imageAccept, maxFileSize = 10, ...props }, ref) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !validateFile(file, accept, maxFileSize)) {
        alert('10MB 이하, PNG, JPG, JPEG만 등록가능합니다.');
        return;
      }

      const { files, displayUrl } = getImageData(event);
      props.onChange && props.onChange(event);
      setPreview(displayUrl);
      setFile(files![0]);
    };

    return (
      <>
        <div className="flex items-center justify-between">
          {/* 이미지 프리뷰 */}
          {preview ? (
            <img
              src={preview}
              alt="avatar"
              className="h-24 w-24 rounded-full border-[1.45px] border-border-primary object-cover"
            />
          ) : (
            <img
              src={`${props.defaultValue}`}
              alt="avatar"
              className="h-24 w-24 rounded-full border-[1.45px] border-border-primary object-cover"
            />
          )}

          {/* 사진 업로드 버튼 */}
          <label
            htmlFor={props.id}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-paragraph-small text-white"
          >
            <PlusIcon size={16} />
            사진 업로드
          </label>
        </div>
        <Input type="file" id={props.id} className="hidden" onChange={onChange} accept={imageAccept} />
      </>
    );
  },
);

export { AvatarImageInput };
