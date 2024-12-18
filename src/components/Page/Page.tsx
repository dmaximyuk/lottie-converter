import "./Page.sass";

import { AllHTMLAttributes, FC } from "react";
import cn from "clsx";

interface PageProps extends AllHTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

const Page: FC<PageProps> = (props) => {
  return (
    <main className="Page">
      <section className={cn("Page__container", props.containerClassName)}>
        {props.children}
      </section>
    </main>
  );
};

export default Page;
