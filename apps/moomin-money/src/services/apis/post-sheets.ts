import type { z } from 'zod';
import type { formSchema } from '@moomin-money/components/home/home-form';

interface PostSheetValuesRequestInterface {
  param: z.infer<typeof formSchema>;
}

interface PostSheetValuesResponseInterface {
  data: (string | number)[];
}

export async function postSheetValues({
  param,
}: PostSheetValuesRequestInterface): Promise<PostSheetValuesResponseInterface['data']> {
  const response = await fetch(`/api/sheets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(param),
  });

  if (!response.ok) {
    return response.text().then(text => {
      throw new Error(text);
    });
  }

  const { data } = (await response.json()) as PostSheetValuesResponseInterface;
  return data;
}
