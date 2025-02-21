const Button = ({
  children,
  variant = "contained",
  color = "primary",
  className = "",
  disabled = false,
  ...rest
}) => {
  const variants = {
    outlined: {
      base: "px-8 py-2 border-1 rounded-lg hover:border-1 hover:text-white",
      primary: "text-primary hover:bg-primary",
      secondary: "text-secondary hover:bg-secondary",
      accent: "text-accent hover:bg-accent",
    },
    contained: {
      base: "px-16 py-3 text-sm rounded-xl text-white",
      secondary: disabled
        ? "bg-secondary !cursor-not-allowed"
        : "bg-secondary hover:bg-secondary-hover",
    },
  };

  const combinedClassName = `${variants[variant].base} ${variants[variant][color]} ${className}`;

  return (
    <button className={`cursor-pointer  ${combinedClassName}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
