import { HtmlHTMLAttributes, useEffect } from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { AvatarImageInput } from '@/components/ui/avatarImageInput';
import useUserStore from '@/stores/useUserStore';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constant/urls';
import { getProfile, updateProfile } from '@/api/profile';

interface MyPageFormProps extends HtmlHTMLAttributes<HTMLDivElement> {}

const instructorForm = z.object({
  profileImage: z
    .instanceof(File, { message: '프로필 사진을 선택해주세요.' })
    .refine((file) => file.size <= 5000000, { message: '파일 크기는 10MB 이하여야 합니다.' }),
  email: z.string(),
  name: z.string().trim().min(1, { message: '이름을 입력해주세요.' }),
  studio: z.string(),
  studioRegionName: z.string(),
});

type InstructorFormValues = z.infer<typeof instructorForm>;

const MyPageForm = ({ className, ...props }: MyPageFormProps) => {
  const navigate = useNavigate();

  const {
    email,
    userName,
    studioName,
    studioRegionName,
    profileImageUrl,
    setEmail,
    setUserName,
    setStudioName,
    setStudioRegionName,
    setProfileImageUrl,
  } = useUserStore();
  const defaultValues = {
    profileImage: undefined,
    email,
    name: userName,
    studio: studioName,
    studioRegionName: studioRegionName,
  };

  const form = useForm<InstructorFormValues>({
    resolver: zodResolver(instructorForm),
    defaultValues: defaultValues,
  });

  const logout = () => {
    console.log('logout');
  };

  async function onSubmit(data: z.infer<typeof instructorForm>) {
    const { profileImage, name } = data;

    const formData = new FormData();

    // 파일 추가
    if (profileImage instanceof File) {
      formData.append('file', profileImage, profileImage.name);
    } else {
      console.error('No file selected');
      return;
    }

    try {
      formData.append('userName', name);

      await updateProfile(formData);
      navigate(PATH.content_list);
    } catch {
      // Todo: erorr toast
    }
  }

  const loadProfile = async () => {
    try {
      const { data } = await getProfile();
      setEmail(data.email);
      setUserName(data.name);
      setStudioName(data.studio);
      setStudioRegionName(data.studioRegion || '-');
      setProfileImageUrl(data.profile_image || '-');
    } catch {}
  };

  useEffect(() => {
    loadProfile();
  }, [email]);

  return (
    <div className={className} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>프로필 사진</FormLabel>
                <FormDescription>10MB 이하, PNG, JPG, JPEG만 등록가능합니다.</FormDescription>
                <FormControl>
                  <AvatarImageInput
                    id="profile"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    defaultValue={profileImageUrl}
                  />
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
            name="studioRegionName"
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
                <FormLabel isRequired={true}>강사 이름</FormLabel>
                <FormDescription>강사 이름을 입력해주세요.</FormDescription>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <Button size="sm" type="button" variant="outline" onClick={logout}>
            로그아웃
          </Button> */}

          <Button className="mt-9" type="submit" size="area" variant="secondary">
            저장하기
          </Button>
        </form>
      </Form>
    </div>
  );
};
export { MyPageForm };
