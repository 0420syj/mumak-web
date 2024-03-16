import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '@ui/components/ui/label';
import { Checkbox } from '@ui/components/ui/checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  decorators: [
    Story => (
      <div className="flex items-center space-x-2">
        <Story />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    ),
  ],
  args: {
    id: 'terms',
  },
};
