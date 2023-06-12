import { baseInputProps } from "../../types/componentProps";

const BaseInput = (props: baseInputProps) => {
  const { children, ...rest } = props;
  return (
    <input
      {...rest}
      className="border-2 p-3 w-full rounded-md mt-2 focus:border-indigo-500 focus:outline-none"
    />
  );
};

export default BaseInput;
