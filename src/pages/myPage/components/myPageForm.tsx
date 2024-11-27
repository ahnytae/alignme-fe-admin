import { HtmlHTMLAttributes, useEffect, useState } from 'react';
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
import { ACCEPTED_FILE_TYPES, FILE_LIMIT_SIZE } from '@/constant/file';
import { toast } from 'react-toastify';

interface MyPageFormProps extends HtmlHTMLAttributes<HTMLDivElement> {}

const instructorForm = z.object({
  profileImage: z.string().optional(), // 기존 이미지 URL
  file: z.union([
    z
      .instanceof(File)
      .refine((file) => file.size <= FILE_LIMIT_SIZE, {
        message: '파일 크기는 5MB 이하여야 합니다.',
      })
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
        message: 'JPG 또는 PNG 파일만 업로드 가능합니다.',
      }),
    z.undefined().optional(),
  ]),
  email: z.string().optional(),
  name: z.string().trim(),
  studio: z.string().optional(),
  studioRegionName: z.string().optional(),
});

type InstructorFormValues = z.infer<typeof instructorForm>;

const MyPageForm = ({ className, ...props }: MyPageFormProps) => {
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: '',
    profileImage: '',
  });

  const [profileEmail, setProfileEmail] = useState('');
  const [profileName, setProfileName] = useState('');
  const [profileStudio, setProfileStudio] = useState('');
  const [profileRegion, setProfileRegion] = useState('');
  const [profileImage, setProfileImage] = useState('');

  // const {
  //   email,
  //   userName,
  //   studioName,
  //   studioRegionName,
  //   profileImageUrl,
  //   setEmail,
  //   setUserName,
  //   setStudioName,
  //   setStudioRegionName,
  //   setProfileImageUrl,
  // } = useUserStore();

  const defaultValues = {
    profileImage: undefined,
    file: undefined,
    email: profileEmail,
    name: profileName,
    studio: profileStudio,
    studioRegionName: profileRegion,
  };

  const form = useForm<InstructorFormValues>({
    resolver: zodResolver(instructorForm),
    defaultValues: defaultValues,
  });

  async function onSubmit(data: InstructorFormValues) {
    const { file, name, profileImage } = data;
    const formData = new FormData();

    if (file) {
      formData.append('file', file);
    } else if (profileImage) {
      // 기존 이미지를 그대로 사용하는 경우
      formData.append('profileImage', profileImage);
    }

    formData.append('userName', name);

    try {
      await updateProfile(formData);
      toast.success('프로필이 수정되었습니다.');
      // navigate(PATH.content_list);
    } catch {
      // Todo: error toast
    }
  }

  const loadProfile = async () => {
    try {
      getProfile().then((_data) => {
        const { data } = _data;
        setInitialValues({
          name: data.name,
          profileImage: '',
        });

        setProfileEmail(data.email);
        setProfileName(data.name);
        setProfileStudio(data.studio);
        setProfileRegion(data.studioRegion || '-');
        setProfileImage(data.profile_image || '-');
      });

      // setEmail(data.email);
      // setUserName(data.name);
      // setStudioName(data.studio);
      // setStudioRegionName(data.studioRegion || '-');
      // setProfileImageUrl(data.profile_image || '-');
    } catch {}
  };

  console.log('@@', form.watch());

  // 값이 변경되었는지 확인하는 함수
  const hasChanges = () => {
    const currentName = form.watch('name');
    const currentFile = form.watch('file');
    const currentProfileImage = form.watch('profileImage');

    return (
      currentName !== initialValues.name ||
      currentFile !== undefined ||
      currentProfileImage !== initialValues.profileImage
    );
  };

  // submit 버튼 disabled 상태 관리
  const isSubmitDisabled = !hasChanges() || !form.formState.isValid;

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    form.reset({
      profileImage: profileImage,
      file: undefined,
      email: profileEmail,
      name: profileName,
      studio: profileStudio,
      studioRegionName: profileRegion,
    });
  }, [profileName, profileImage]);

  return (
    <div className={className} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="file"
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
                    defaultValue={profileImage}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            // control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>가입 이메일</FormLabel>
                <FormDescription>가입시 사용된 카카오톡 이메일입니다.</FormDescription>
                <FormControl>
                  <Input value={profileEmail} disabled />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            // control={form.control}
            name="studio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>소속 레슨장</FormLabel>
                <FormControl>
                  <Input value={profileStudio} disabled />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            // control={form.control}
            name="studioRegionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>지역 지점</FormLabel>
                <FormControl>
                  <Input value={profileRegion} disabled />
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

          <Button className="mt-9" type="submit" size="area" variant="secondary" disabled={isSubmitDisabled}>
            저장하기
          </Button>
        </form>
      </Form>
    </div>
  );
};
export { MyPageForm };
