interface PageTitleProps {
  children: React.ReactNode;
}

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <div className="flex w-full items-center ">
      <h1 className="pb-[12px] pt-[72px] text-heading-medium text-content-primary">{children}</h1>
    </div>
  );
};
export default PageTitle;
