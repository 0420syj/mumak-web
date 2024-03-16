import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@ui/components/ui/calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    mode: 'single',
    selected: new Date(),
    className: 'rounded-md border shadow',
  },
};
