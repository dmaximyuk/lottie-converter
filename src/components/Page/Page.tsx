import "./Page.sass";

import { AllHTMLAttributes, FC } from "react";
import cn from "clsx";

import { ModalProvider } from "modals";

interface PageProps extends AllHTMLAttributes<HTMLElement> {
  containerClassName?: string;
}

const Page: FC<PageProps> = (props) => {
  return (
    <>
      <ModalProvider />
      <section className={cn("Page", props.className)}>
        <div className={cn("Page__container", props.containerClassName)}>
          {props.children}
        </div>
      </section>
    </>
  );
};

export default Page;
