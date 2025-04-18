import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { ButtonSeverity, ButtonSize } from '../../enums/button.enum';
import { generateInputs } from '../../utils/generate-inputs.util';

const meta: Meta<typeof ButtonComponent> = {
  title: 'Buttons',
  component: ButtonComponent,
  tags: ['autodocs'],
  args: {}
  // argTypes: {
  //   variant: {
  //     options: ['primary', 'secondary'],
  //     control: { type: 'radio' }
  //   }
  // }
};

export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: { severity: ButtonSeverity.Primary },
  render: (args: Record<string, any>) => {
    const argsString: string = generateInputs(args);

    return {
      props: args,
      template: `<app-button ${argsString}>Hello World</app-button>`
    };
  }
};

export const Secondary: Story = {
  args: { severity: ButtonSeverity.Secondary },
  render: (args: Record<string, any>) => {
    const argsString: string = generateInputs(args);

    return {
      props: args,
      template: `<app-button ${argsString}>Hello World</app-button>`
    };
  }
};

export const Success: Story = {
  args: { severity: ButtonSeverity.Success },
  render: (args: Record<string, any>) => {
    const argsString: string = generateInputs(args);

    return {
      props: args,
      template: `<app-button ${argsString}>Hello World</app-button>`
    };
  }
};

export const Large: Story = {
  args: { size: ButtonSize.Large },
  render: (args: Record<string, any>) => {
    const argsString: string = generateInputs(args);

    return {
      props: args,
      template: `<app-button ${argsString}>Hello World</app-button>`
    };
  }
};

export const Small: Story = {
  args: { size: ButtonSize.Small },
  render: (args: Record<string, any>) => {
    const argsString: string = generateInputs(args);

    return {
      props: args,
      template: `<app-button ${argsString}>Hello World</app-button>`
    };
  }
};
