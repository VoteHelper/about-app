import type { Meta, StoryObj } from "@storybook/react";

import ProfileIcon from "../../../components/atoms/Profile/ProfileIcon";

const meta = {
  title: "Atoms/Profile/ProfileIcon",
  component: ProfileIcon,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},

  args: {},
} satisfies Meta<typeof ProfileIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    user: "ABOUT",
    size: "md",
  },
};
