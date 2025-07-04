'use client';

import { Form } from '@repo/ui/form';
import { Button } from '@repo/ui/button';
import { ToastAction, useToast } from '@repo/ui/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { convertLocalTimeZoneToUTCTimeZone } from '@repo/lib';
import { useRouter } from 'next/navigation';
import { postSheetValues } from '@moomin-money/services/apis/post-sheets';
import { NameFormField } from './block/name-form-field';
import { DateFormField } from './block/date-form-field';
import { ContentFormField } from './block/content-form-field';
import { PriceFormField } from './block/price-form-field';
import { CategoryFormField } from './block/category-form-field';
import { PaymentFormField } from './block/payment-form-field';
import { NoteFormField } from './block/note-form-field';

export const formSchema = z.object({
  name: z.enum(['wanny', 'moomin', '']),
  date: z
    .date({
      required_error: '날짜를 입력해주세요',
    })
    .transform(date => convertLocalTimeZoneToUTCTimeZone(date))
    .optional(),
  content: z.string().min(1, '내용을 입력해주세요').optional(),
  price: z
    .string()
    .min(1, '가격을 입력해주세요')
    .refine(v => /^[0-9,-]*$/.test(v), {
      message: '숫자만 입력해주세요',
    })
    .transform(v => v.replace(/[^0-9-]/g, ''))
    .optional(),
  category: z.string().min(1, '카테고리를 입력해주세요').optional(),
  payment: z.string().min(1, '결제수단을 입력해주세요').optional(),
  note: z.string().optional(),
});

interface HomeFormProps {
  defaultValues?: z.infer<typeof formSchema>;
}

export function HomeForm({ defaultValues }: HomeFormProps): React.ReactElement {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      content: '',
      price: '',
      category: '',
      payment: '',
      note: '',
      ...defaultValues,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    const activeElement = document.activeElement as HTMLElement | null;
    if (activeElement) {
      activeElement.blur();
    }

    try {
      const response = await postSheetValues({ param: values });
      toast({
        title: '입력 완료',
        description: <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>,
      });
    } catch (error: unknown) {
      toast({
        title: '입력 실패',
        description: (
          <pre className="whitespace-pre-wrap">
            {error instanceof Error ? error.message : JSON.stringify(error, null, 2)}
          </pre>
        ),
        variant: 'destructive',
        action: (
          <ToastAction
            altText="다시 시도"
            onClick={() => {
              void form.handleSubmit(onSubmit)();
            }}
          >
            다시 시도
          </ToastAction>
        ),
      });
    } finally {
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={e => {
          void form.handleSubmit(onSubmit)(e);
        }}
      >
        <NameFormField control={form.control} />

        <div className="flex flex-col gap-8 sm:grid sm:grid-cols-3 sm:gap-8">
          <DateFormField control={form.control} />
          <ContentFormField control={form.control} />
          <PriceFormField control={form.control} />
        </div>

        <CategoryFormField control={form.control} />
        <PaymentFormField control={form.control} />
        <NoteFormField control={form.control} />
        <div className="flex flex-row space-x-4">
          <Button className="flex flex-1" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                입력 중...
              </>
            ) : (
              '입력'
            )}
          </Button>
          <Button
            onClick={() => {
              form.reset();
            }}
            type="reset"
            variant="destructive"
          >
            초기화
          </Button>
        </div>
      </form>
    </Form>
  );
}
