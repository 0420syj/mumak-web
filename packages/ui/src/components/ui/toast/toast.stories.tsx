import type { Meta, StoryObj } from '@storybook/react';

import { Toaster, useToast } from '@ui/components/ui/toast';
import { Button } from '@ui/components/ui/button';

const meta: Meta<typeof Toaster> = {
  title: 'Components/UI/Toast',
  component: Toaster,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
        }}
      >
        Show Toast
      </Button>
    );
  },
};
