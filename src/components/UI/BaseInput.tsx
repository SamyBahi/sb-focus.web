interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const BaseInput = (props: inputProps) => {
  const { children, ...rest } = props;
  return (
    <input
      {...rest}
      className="border-2 p-3 w-full rounded-md mt-2 focus:border-indigo-500 focus:outline-none"
    />
  );
};

export default BaseInput;
