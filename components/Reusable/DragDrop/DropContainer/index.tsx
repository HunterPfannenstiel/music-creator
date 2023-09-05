import { ComponentPropsWithoutRef, FunctionComponent } from "react";

interface DropContainerProps extends ComponentPropsWithoutRef<"div"> {
  dropHandler: (dataValue: string) => void;
  dataName: string;
}

const DropContainer: FunctionComponent<DropContainerProps> = ({
  dropHandler,
  children,
  dataName,
  onDrop,
  onDragOver,
  ...restProps
}) => {
  onDrop = (e: React.DragEvent) => {
    const data = e.dataTransfer.getData(dataName); //This will be data about the item that was dropped
    dropHandler(data);
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      {...restProps}
    >
      {children}
    </div>
  );
};

export default DropContainer;
