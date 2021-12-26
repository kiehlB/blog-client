type ButtonSize = 'SMALL' | 'DEFAULT' | 'LARGE';

export type CustomButtonProps = {
  inline?: boolean;
  color: string;
  size: ButtonSize;
  border: boolean;
};

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface CustomisingButtonProps extends ButtonProps {
  inline?: boolean;
  to?: string;
  size?: ButtonSize;
  color?: 'teal' | 'gray' | 'darkGray' | 'lightGray';
  border?: boolean;
}

function CustomButton({}: CustomisingButtonProps) {
  return (
    <button
      type='button'
      className='py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full'
    >
      Read More
    </button>
  );
}

export default CustomButton;
