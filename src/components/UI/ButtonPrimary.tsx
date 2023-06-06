interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const ButtonPrimary = (props: buttonProps) => {
  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      className="font-thin border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline disabled:bg-indigo-300 w-full"
    >
      {props.children}
    </button>
  );
};

export default ButtonPrimary;
