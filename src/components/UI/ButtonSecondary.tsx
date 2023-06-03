interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const ButtonSecondary = (props: buttonProps) => {
  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      className="font-thin rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-300 focus:outline-none focus:shadow-outline w-full"
    >
      {props.children}
    </button>
  );
};

export default ButtonSecondary;
