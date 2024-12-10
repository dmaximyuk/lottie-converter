import "./Page.sass";

import { AllHTMLAttributes, FC } from "react";

interface PageProps extends AllHTMLAttributes<HTMLElement> {}

const Page: FC<PageProps> = (props) => {
  return (
    <main className="Page">
      <section className="Page__container">{props.children}</section>
    </main>
  );
};

export default Page;
