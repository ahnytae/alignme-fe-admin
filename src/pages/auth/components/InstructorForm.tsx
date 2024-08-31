import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  /** 소속 레슨장 */
  studioName: z.string().min(1, '소속 레슨장을 입력해주세요.'),
  /** 강사 이름 */
  name: z.string().min(1, '강사 이름을 입력해주세요.'),
});

/** 강사 정보 입력 폼 */
const InstructorForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studioName: '',
      name: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

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

        {/** 강사 이름 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={true}>강사 이름</FormLabel>
              <FormDescription>강사 이름을 입력해주세요.</FormDescription>
              <FormControl>
                <Input placeholder="강사 이름" isError={!!form.formState.errors.name} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant="primary" size="area" type="submit" className="mt-3 w-[380px]">
          가입 완료
        </Button>
      </form>
    </Form>
  );
};

export default InstructorForm;
