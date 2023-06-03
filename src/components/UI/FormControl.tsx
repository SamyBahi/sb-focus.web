interface formControlProps {
  children: React.ReactNode;
  type: String;
}

const FormControl = (props: formControlProps) => {
  return (
    <div className="w-1/3">
      <label htmlFor="email">{props}</label>
      <input
        type={props.type}
        placeholder="Enter your email"
        className="border-2 p-3 w-full rounded-md mt-2 focus:border-indigo-500 focus:outline-none"
        name="email"
      ></input>
    </div>
  );
};
