const Page = ({ classes = "", children = null, style = {} }) => {
  const baseClasses = "flex flex-1 items-center justify-center pt-12";
  return (
    <main className={`${baseClasses} ${classes}`} style={style}>
      {children}
    </main>
  );
};

export default Page;
