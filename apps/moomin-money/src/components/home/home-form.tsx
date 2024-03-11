'use client';

import { Form } from '@repo/ui/form';
import { Button } from '@repo/ui/button';
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
  name: z.enum(['wanny', 'moomin']),
  date: z.date({
    required_error: '날짜를 입력해주세요',
  }),
  content: z.string().min(1, '내용을 입력해주세요'),
  price: z
    .string()
    .min(1, '가격을 입력해주세요')
    .transform(v => v.replace(/[^0-9]/g, '')),
  category: z.string().min(1, '카테고리를 입력해주세요'),
  payment: z.string().min(1, '결제수단을 입력해주세요'),
  note: z.string(),
});

export function HomeForm(): React.ReactElement {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: 'wanny',
      date: new Date(),
      content: '',
      price: '',
      category: '',
      payment: '',
      note: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>): void {
    // eslint-disable-next-line no-console -- Temporarily disable no-console rule to log form values for debugging
    console.log(values);
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
        <DateFormField control={form.control} />
        <ContentFormField control={form.control} />
        <PriceFormField control={form.control} />
        <CategoryFormField control={form.control} />
        <PaymentFormField control={form.control} />
        <NoteFormField control={form.control} />
        <Button type="submit">입력</Button>
      </form>
    </Form>
  );
}
