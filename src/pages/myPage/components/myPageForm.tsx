import { HtmlHTMLAttributes } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { AvatarImageInput } from '@/components/ui/avatarImageInput';

interface MyPageFormProps extends HtmlHTMLAttributes<HTMLDivElement> {}

const instructorForm = z.object({
  profile: z.string(),
  email: z.string(),
  name: z.string().trim().min(1, { message: '이름을 입력해주세요.' }),
  studio: z.string(),
  studioBranch: z.string(),
});

const studioForm = z.object({
  profile: z.string(),
  email: z.string(),
  name: z.string().trim().min(1, { message: '이름을 입력해주세요.' }),
  studio: z.string(),
  studioBranch: z.string(),
  contactEmail: z.string().email({ message: '연락받으실 이메일을 입력해주세요.' }),
});

type InstructorFormValues = z.infer<typeof instructorForm>;
type StudioFormValues = z.infer<typeof studioForm>;
type userType = 'instructor' | 'studio';

const MyPageForm = ({ className, ...props }: MyPageFormProps) => {
  const type: userType = true ? 'instructor' : 'studio'; // user 정보 연동 후 수정

  const formSchema = type === 'instructor' ? instructorForm : studioForm;

  // user 정보 연동 후 수정
  const defaultValues = {
    profile: '',
    email: 'test@gmail.com',
    name: '김아무개',
    studio: 'ㅇㅇ 요가 학원',
    studioBranch: '서울',
    ...(type === 'studio' && { contactEmail: 'contact@gmail.com' }),
  };

  const form = useForm<InstructorFormValues | StudioFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const logout = () => {
    console.log('logout');
  };

  return (
    <div className={className} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
          <FormField
            control={form.control}
            name="profile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>프로필 사진</FormLabel>
                <FormDescription>10MB 이하, PNG, JPG, JPEG만 등록가능합니다.</FormDescription>
                <FormControl>
                  <AvatarImageInput id="profile" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>가입 이메일</FormLabel>
                <FormDescription>가입시 사용된 카카오톡 이메일입니다.</FormDescription>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>소속 레슨장</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studioBranch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>지역 지점</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel isRequired={true}>{type === 'instructor' ? '이름' : '대표자명'}</FormLabel>
                <FormDescription>강사 이름을 입력해주세요.</FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {type === 'studio' && (
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired={true}>이메일</FormLabel>
                  <FormDescription>연락받으실 이메일을 입력해주세요.</FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button size="sm" type="button" variant="outline" onClick={logout}>
            로그아웃
          </Button>

          <Button className="mt-9" type="submit" size="area" variant="secondary">
            저장하기
          </Button>
        </form>
      </Form>
    </div>
  );
};
export { MyPageForm };
