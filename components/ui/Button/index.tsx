import React, { ElementType, ReactNode } from "react";
import classes from "./index.module.css";
import { PolymorphicComponent } from "@_types/polymorphic";
import { concatClassNames } from "@_utils/index";

interface ButtonProps {
  color?: string;
  children: ReactNode;
}

const Button = <C extends ElementType = "button">({
  as,
  color,
  className,
  children,
  ...restProps
}: PolymorphicComponent<C, ButtonProps>) => {
  const Component = as || "button";
  return (
    <Component
      {...restProps}
      className={concatClassNames(className, classes.button)}
    >
      {children}
    </Component>
  );
};

export default Button;
