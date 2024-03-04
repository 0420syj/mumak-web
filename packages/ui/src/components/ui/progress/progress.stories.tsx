import type { Meta, StoryObj } from "@storybook/react";

import { Progress } from "@ui/components/ui/progress";

const meta: Meta<typeof Progress> = {
  title: "Components/UI/Progress",
  component: Progress,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  args: {
    value: 33,
    className: "w-[60%]",
  },
};
