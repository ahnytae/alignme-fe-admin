import { FunctionComponent, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileInput } from '@/components/ui/fileInput';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';
import { createContent, deleteContent, modifyContent } from '@/api/content';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@/constant/urls';
import useContent from '@/stores/useContent';
import { ACCEPTED_FILE_TYPES, FILE_LIMIT_SIZE } from '@/constant/file';
import { ImagePoseLandmarker } from '@/core/ImagePoseLandmarker';
import { SkletonData } from '@/core/CalculatePose';
import { toast } from 'react-toastify';
import Spinner from '@/components/ui/spinner';

const formSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, { message: '운동 이름을 입력해주세요.' })
      .max(10, { message: '10자 이내로 입력해주세요.' }),
    file: z.union([
      z
        .instanceof(File)
        .refine((file) => file.size <= FILE_LIMIT_SIZE, {
          message: '파일 크기는 5MB 이하여야 합니다.',
        })
        .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
          message: 'JPG 또는 PNG 파일만 업로드 가능합니다.',
        }),
      z.string().optional(), // string 타입 추가 및 옵셔널 처리
    ]),

    level: z.enum(['EASY', 'NORMAL', 'HARD'], { message: '난이도를 선택해주세요.' }),
    desc: z
      .string()
      .trim()
      .min(1, { message: '운동 설명을 입력해주세요.' })
      .max(500, { message: '500자 이내로 입력해주세요.' }),
  })
  .strict();

const levelOptions = [
  { id: '1', title: '쉬움', value: 'EASY' },
  { id: '2', title: '보통', value: 'NORMAL' },
  { id: '3', title: '어려움', value: 'HARD' },
];

interface ContentCreateFormProps extends HTMLAttributes<HTMLDivElement> {
  isEditMode?: boolean;
}
const ContentCreateForm: FunctionComponent<ContentCreateFormProps> = ({ className, isEditMode }) => {
  function onError(msg: string) {
    alert(msg);
    return msg;
  }

  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  // const imageRef = useRef<HTMLImageElement>(null);

  const { title, level, description, imageUrl } = useContent();

  const poseImageRef = useRef<HTMLImageElement>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: (isEditMode && title) || '',
      file: (isEditMode && imageUrl) || undefined,
      level: (isEditMode && (level as 'EASY' | 'NORMAL' | 'HARD')) || undefined,
      desc: (isEditMode && description) || '',
    },
  });

  // console.log('!! form::', form.getValues());

  useEffect(() => {
    setButtonDisabled(!form.formState.isValid);
  }, [form.formState.isValid]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();

    // 파일 추가
    if (data.file instanceof File && form.formState.defaultValues?.file !== form.getValues('file')) {
      formData.append('file', data.file, data.file.name);
    }

    console.log('**', formData)

    const { title, level, desc } = data;

    try {
      let poseData: SkletonData[] | null = null;
      setLoading(true);

      if (form.formState.defaultValues?.file !== form.getValues('file')) {
        ImagePoseLandmarker.init();
        poseData = await ImagePoseLandmarker.start(poseImageRef.current!);
        console.log('*&**', poseData);
        if (poseData === null) {
          toast.error('자세가 부정확 합니다.');
          return;
        }
      }

      formData.append('title', title);
      formData.append('level', level);
      formData.append('description', desc);
      formData.append('poseData', JSON.stringify(poseData));

      console.log('###', formData);
      if (isEditMode) {
        await modifyContent(`${id}`, formData);
        toast.success('콘텐츠 수정이 왼료되었어요');
      } else {
        toast.success('콘텐츠 등록이 왼료되었어요');
        await createContent(formData);
      }

      navigate(PATH.content_list);
    } catch (e) {
      console.log(e);
      // Todo: erorr toast
      toast.error('자세가 부정확 합니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={className}>
        {isLoading && <Spinner />}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired={true}>운동 이름</FormLabel>
                  <FormDescription>운동 이름을 입력해주세요.</FormDescription>
                  <FormControl>
                    <Input placeholder="운동 이름" {...field} isError={!!form.formState.errors.title} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired={true}>운동 사진</FormLabel>
                  <FormDescription>운동 자세가 모두 보이는 이미지를 등록해주세요.</FormDescription>
                  <FormControl>
                    <FileInput
                      id="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      onBlur={field.onBlur}
                      name={field.name}
                      // ref={field.ref}
                      ref={poseImageRef}
                      isEditMode={isEditMode}
                      imageUrl={imageUrl}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel isRequired={true}>난이도</FormLabel>
                  <FormDescription>운동 난이도를 선택해주세요.</FormDescription>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                      {levelOptions.map((option) => (
                        <FormItem key={option.value} className="flex items-center justify-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-paragraph-small font-medium text-[#62626A]">
                            {option.title}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired={true}>운동 설명</FormLabel>
                  <FormDescription>운동 설명을 입력해주세요.</FormDescription>
                  <FormControl>
                    <Textarea placeholder="운동 설명" {...field} maxLength={500} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-9" type="submit" size="area" variant="secondary" disabled={buttonDisabled}>
              등록하기
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export { ContentCreateForm };
