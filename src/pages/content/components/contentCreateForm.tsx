import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileInput } from '@/components/ui/fileInput';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';

const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: '운동 이름을 입력해주세요.' })
      .max(10, { message: '10자 이내로 입력해주세요.' }),
    img: z.string().url({ message: '운동 사진을 입력해주세요.' }).min(1, { message: '운동 사진을 입력해주세요.' }),
    level: z.enum(['easy', 'normal', 'hard'], { message: '난이도를 선택해주세요.' }),
    desc: z
      .string()
      .trim()
      .min(1, { message: '운동 설명을 입력해주세요.' })
      .max(500, { message: '500자 이내로 입력해주세요.' }),
  })
  .strict();

const levelOptions = [
  { id: '1', name: '쉬움', value: 'easy' },
  { id: '2', name: '보통', value: 'normal' },
  { id: '3', name: '어려움', value: 'hard' },
];

interface ContentCreateFormProps extends HTMLAttributes<HTMLDivElement> {}
const ContentCreateForm: FunctionComponent<ContentCreateFormProps> = ({ className, ...props }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      img: '',
      level: undefined,
      desc: '',
    },
  });

  useEffect(() => {
    setButtonDisabled(!form.formState.isValid);
  }, [form.formState.isValid]);

  return (
    <div className={className} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired={true}>운동 이름</FormLabel>
                <FormDescription>운동 이름을 입력해주세요.</FormDescription>
                <FormControl>
                  <Input placeholder="운동 이름" {...field} isError={!!form.formState.errors.name} />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired={true}>운동 사진</FormLabel>
                <FormDescription>운동 자세가 모두 보이는 이미지를 등록해주세요.</FormDescription>
                <FormControl>
                  <FileInput id="img" {...field} />
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
                          {option.name}
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
        </form>
        <Button className="mt-9" type="submit" size="area" variant="secondary" disabled={buttonDisabled}>
          등록하기
        </Button>
      </Form>
    </div>
  );
};

export { ContentCreateForm };
