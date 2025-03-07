import { Alert } from "react-bootstrap";

const Message = ({ variant = "Info", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
