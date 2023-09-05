import { ComponentPropsWithoutRef, FunctionComponent } from "react";

interface DropItemProps extends ComponentPropsWithoutRef<"div"> {
  dataName: string;
  dataValue: string;
}

const DropItem: FunctionComponent<DropItemProps> = ({
  children,
  dataName,
  dataValue,
  onDragStart,
  ...restProps
}) => {
  onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(dataName, dataValue);
  };
  return (
    <div draggable onDragStart={onDragStart} {...restProps}>
      {children}
    </div>
  );
};

export default DropItem;
