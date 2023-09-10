import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./ModalDisplay.module.css";
import Background from "./Background";

import Spinner from "../Spinner";
// import CloseButton from "./CloseButton";
import ModalPortal from "./ModalPortal";
import { concatClassNames } from "../../../utils";

interface ModalDisplayProps {
  children: ReactNode;
  handleModal: () => void;
  playAnimation: boolean;
  animationTime: number;
  isLoading?: boolean;
  className?: string;
  closeable?: boolean;
}

const ModalDisplay: FunctionComponent<ModalDisplayProps> = ({
  handleModal,
  playAnimation,
  animationTime,
  children,
  isLoading,
  className: userClassName,
  closeable = true,
}) => {
  const className = concatClassNames(
    classes.modal_content,
    userClassName,
    (playAnimation && classes.animate_out) || undefined
  );
  return (
    <ModalPortal selector="modal">
      {!isLoading ? (
        <div
          className={className}
          style={{ "--animation-time": animationTime + "ms" } as CSSProperties}
        >
          {/* <CloseButton
            className={classes.close}
            onClick={closeable ? handleModal : () => {}}
          /> */}
          <p
            className={classes.close}
            onClick={closeable ? handleModal : () => {}}
          >
            X
          </p>
          {children}
        </div>
      ) : (
        <Spinner center />
      )}
      <Background
        handleModal={handleModal}
        playAnimation={playAnimation}
        animationTime={animationTime}
        closeable={closeable}
      />
    </ModalPortal>
  );
};

export default ModalDisplay;
