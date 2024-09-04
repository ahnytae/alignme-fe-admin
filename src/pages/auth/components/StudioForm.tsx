import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  /** 소속 레슨장 */
  studioName: z.string().min(1),
  /** 지역 지점 */
  location: z.string(),
  /** 대표자명 */
  name: z.string().min(1),
  /** 이메일 */
  email: z.string().email(),
});

/** 레슨장 정보 입력 폼 */
const StudioForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/** 소속 레슨장 */}
        <FormField
          control={form.control}
          name="studioName"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={true}>소속 레슨장</FormLabel>
              <FormDescription>소속되어 있는 레슨장을 검색해주세요.</FormDescription>
              <FormControl>
                <Input placeholder="소속 레슨장 이름" isError={!!form.formState.errors.studioName} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/** 지역 지점 */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>지역 지점</FormLabel>
              <FormDescription>프렌차이즈일 경우 지점을 입력해주세요.</FormDescription>
              <FormControl>
                <Input placeholder="지점 입력" isError={!!form.formState.errors.name} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/** 대표자명 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={true}>대표자명</FormLabel>
              <FormDescription>대표자명을 입력해주세요.</FormDescription>
              <FormControl>
                <Input placeholder="대표자명" isError={!!form.formState.errors.name} {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/** 이메일 */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={true}>이메일</FormLabel>
              <FormDescription>연락받으실 이메일을 입력해주세요.</FormDescription>
              <FormControl>
                <Input placeholder="이메일" isError={!!form.formState.errors.name} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant="primary"
          size="area"
          type="submit"
          className="mt-3 w-[380px] disabled:text-label-base"
          disabled={!form.formState.isValid}
        >
          가입 완료
        </Button>
      </form>
    </Form>
  );
};

export default StudioForm;
