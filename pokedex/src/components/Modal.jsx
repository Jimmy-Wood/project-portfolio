import ReactDom from "react-dom";

export default function Modal(props) {
  const { children, handleCloseModal } = props;
  //Render Modal in 'Portal' div from index.html
  return ReactDom.createPortal(
    <div className="modal-container">
      {/* Clickable area around modal to close  */}
      <button onClick={handleCloseModal} className="modal-underlay" />
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("portal")
  );
}
