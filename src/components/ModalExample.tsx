import { useRef } from "react";

/* DaisyUI TailwindCSS Popup Example: */

// Documentation: https://daisyui.com/components/modal/#method-1-html-dialog-element

const ModalExample = () => {

  const modalId = "my_modal_2";

  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen" data-theme="synthwave">
      {/* Button to open the modal */}
      <button className="btn" onClick={(openModal)}>Open Modal</button>

      {/* Modal */}
      <dialog ref={modalRef} id={modalId} className="modal" data-theme="synthwave">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="btn">Close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ModalExample;
