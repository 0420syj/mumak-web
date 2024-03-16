import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '@ui/components/ui/label';
import { Checkbox } from '@ui/components/ui/checkbox';

const meta: Meta<typeof Label> = {
  title: 'Components/UI/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  decorators: [
    Story => (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Story />
      </div>
    ),
  ],
  args: {
    htmlFor: 'terms',
    children: 'Accept terms and conditions',
  },
};
