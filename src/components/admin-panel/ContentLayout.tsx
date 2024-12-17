import { Navbar } from "./navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
        <Navbar title={title} />
        <div className="container pt-4 pb-8 px-4 sm:px-4">
        {children}
        </div>
    </div>
  );
}
