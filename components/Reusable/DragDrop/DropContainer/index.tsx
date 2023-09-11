import { PolymorphicComponent } from "@_types/polymorphic";
import { ElementType } from "react";

interface DropContainerProps {
  dropHandler: (dataValue: string) => void;
  dataName: string;
}

const DropContainer = <C extends ElementType = "div">({
  dropHandler,
  children,
  dataName,
  onDrop,
  onDragOver,
  as,
  ...restProps
}: PolymorphicComponent<C, DropContainerProps>) => {
  onDrop = (e: React.DragEvent) => {
    const data = e.dataTransfer.getData(dataName); //This will be data about the item that was dropped
    dropHandler(data);
  };
  const Component = as || "div";
  return (
    <Component
      onDrop={onDrop}
      onDragOver={(e: any) => {
        e.preventDefault();
      }}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export default DropContainer;
