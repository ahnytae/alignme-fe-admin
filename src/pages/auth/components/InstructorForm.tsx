import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signUpInstructor } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constant/urls';
import useAuthStore from '@/stores/useAuthStore';
import useUserStore, { UserRole } from '@/stores/useUserStore';

const formSchema = z.object({
  /** 소속 레슨장 */
  studioName: z.string().min(1),
  /** 강사 이름 */
  name: z.string().min(1),
});

/** 강사 정보 입력 폼 */
const InstructorForm = () => {
  const navigate = useNavigate();
  const setIsLogin = useAuthStore((state) => state.setIsLogin);
  const updateUserId = useUserStore((state) => state.setUserId);
  const updateUserRole = useUserStore((state) => state.setUserRole);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studioName: '',
      name: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await signUpInstructor({ studioName: data.studioName, name: data.name });
      updateUserId(response.data.instructorId);
      updateUserRole(UserRole.INSTRUCTOR);

      // TODO 회원가입 여부 분기 처리
      setIsLogin(true);
      navigate(PATH.content_list);
    } catch (error) {
      alert(error);
    }
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

export default InstructorForm;
