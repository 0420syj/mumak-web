'use client';

import { Form } from '@repo/ui/form';
import { Button } from '@repo/ui/button';
import { useToast } from '@repo/ui/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { NameFormField } from './block/name-form-field';
import { DateFormField } from './block/date-form-field';
import { ContentFormField } from './block/content-form-field';
import { PriceFormField } from './block/price-form-field';
import { CategoryFormField } from './block/category-form-field';
import { PaymentFormField } from './block/payment-form-field';
import { NoteFormField } from './block/note-form-field';

export const formSchema = z.object({
  name: z.enum(['wanny', 'moomin']).optional(),
  date: z
    .date({
      required_error: '날짜를 입력해주세요',
    })
    .optional(),
  content: z.string().min(1, '내용을 입력해주세요').optional(),
  price: z
    .string()
    .min(1, '가격을 입력해주세요')
    .transform(v => v.replace(/[^0-9]/g, ''))
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

  function onSubmit(values: z.infer<typeof formSchema>): void {
    toast({
      title: '입력 완료',
      description: <pre className="whitespace-pre-wrap">{JSON.stringify(values, null, 2)}</pre>,
    });
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
          <Button className="flex flex-1" type="submit">
            입력
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
