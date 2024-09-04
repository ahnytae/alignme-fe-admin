import { cn } from '../lib/utils';
import { FunctionComponent, HTMLAttributes } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { FileInput } from '@/components/ui/fileInput';
import { SearchBar } from '@/components/ui/searchBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// checkbox options 더미 데이터
const checkOptions = [
  { id: '1', name: 'option1' },
  { id: '2', name: 'option2' },
  { id: '3', name: 'option3 option3 option3' },
];

// form 규칙
const formSchema = z.object({
  input1: z.string().min(2, {
    message: 'input1 must be at least 2 characters.',
  }),
  input2: z.string(),
  input3: z.string(),
  textarea: z.string().max(500, {
    message: 'textarea must be at most 500 characters.',
  }),
  checkItems: z.array(z.string()),
  image: z.string().min(1, {
    message: 'You have to upload at least one image.',
  }),
  selectbox: z.enum(['light', 'dark', 'system']),
});

interface RoadmapFormProps extends HTMLAttributes<HTMLDivElement> {}

const Test: FunctionComponent<RoadmapFormProps> = ({ className, ...props }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input1: 'default value1',
      input2: 'default value2',
      input3: '',
      textarea: '',
      checkItems: [],
      image: '',
      selectbox: 'system',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div className="my-4 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className={cn('space-y-4', className)} {...props}>
        {/* search bar */}
        <SearchBar
          placeholder={'검색어를 입력해주세요.'}
          onSubmit={() => console.log('submit')}
        />

        {/* select */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        {/* form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* input - 1) 일반 */}
            <FormField
              control={form.control}
              name="input1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired={true}>input1</FormLabel>
                  <FormDescription>input1을 입력해주세요.</FormDescription>
                  <FormControl>
                    <Input
                      placeholder="input을 입력해주세요"
                      {...field}
                      isError={!!form.formState.errors.input1}
                    />
                  </FormControl>
                  <FormMessage>default message</FormMessage>
                </FormItem>
              )}
            />
            {/* input - 2) disabled */}
            <FormField
              control={form.control}
              name="input2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>input2</FormLabel>
                  <FormDescription>input2을 입력해주세요.</FormDescription>
                  <FormControl>
                    <Input
                      placeholder="input2을 입력해주세요"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* input - 3) with right icon */}
            <FormField
              control={form.control}
              name="input3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired={true}>input3</FormLabel>
                  <FormDescription>input3을 입력해주세요.</FormDescription>
                  <FormControl>
                    <Input
                      placeholder="input3을 입력해주세요"
                      isError={!!form.formState.errors.input3}
                      {...field}
                      right={
                        <img
                          src="/assets/icon/search.svg"
                          alt="search"
                          className="w-5 h-5 text-gray-300"
                        />
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* textarea */}
            <FormField
              control={form.control}
              name="textarea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>textarea</FormLabel>
                  <FormDescription>textarea</FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="textarea"
                      {...field}
                      maxLength={500}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* checkbox */}
            <FormField
              control={form.control}
              name="checkItems"
              render={() => (
                <FormItem>
                  <FormLabel>체크박스</FormLabel>
                  <div className="flex items-center align-middle flex-wrap gap-4">
                    {checkOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="checkItems"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-center align-middle space-x-2 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  {...field}
                                  value={item.id}
                                  className="w-4 h-4"
                                />
                              </FormControl>
                              <FormLabel className="text-[#62626A]">
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* image input */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이미지</FormLabel>
                  <FormControl>
                    <FileInput id="image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* select */}
            <FormField
              control={form.control}
              name="selectbox"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>select box</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="system">system</SelectItem>
                      <SelectItem value="light">light</SelectItem>
                      <SelectItem value="dark">dark</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className="mt-4 flex justify-end gap-2">
              <button type="submit">확인</button>
            </section>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Test;
