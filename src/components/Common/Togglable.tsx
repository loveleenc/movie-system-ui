import { useState, type ReactElement } from "react";

const Togglable = (props: {
  buttonClassName: string;
  buttonText: string;
  children: React.PropsWithChildren<ReactElement>;
  displayElementContainerClassName: string;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const displayElementStyle = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  return (
    <>
      <button className={props.buttonClassName} onClick={toggleVisibility}>
        {props.buttonText}
      </button>
      <div className={props.displayElementContainerClassName} style={displayElementStyle}>{props.children}</div>
    </>
  );
};

export default Togglable;
