import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@ui/components/ui/input';
import { Label } from '@ui/components/ui/label';
import { Button } from '@ui/components/ui/button';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/components/ui/form';
import { Toaster, toast } from '@ui/components/ui/toast';

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
  },
};

export const File: Story = {
  decorators: [
    Story => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Story />
      </div>
    ),
  ],
  args: {
    id: 'picture',
    type: 'file',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithLabel: Story = {
  decorators: [
    Story => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Story />
      </div>
    ),
  ],
  args: {
    ...Default.args,
    id: 'email',
  },
};

export const WithButton: Story = {
  decorators: [
    Story => (
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Story />
        <Button type="submit">Subscribe</Button>
      </div>
    ),
  ],
  args: {
    ...Default.args,
  },
};

export const FormStory: Story = {
  decorators: [
    Story => (
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Toaster />
        <Story />
      </div>
    ),
  ],
  render: () => {
    const FormSchema = z.object({
      username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
      }),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        username: '',
      },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};
