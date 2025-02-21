const Page = ({ classes = "", children = null, style = {} }) => {
  const baseClasses = "flex flex-1 items-center justify-evenly pt-24";

  return (
    <main className={`${baseClasses} ${classes}`} style={style}>
      {children}
    </main>
  );
};

export default Page;
