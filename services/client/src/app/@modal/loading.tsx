export default function Loading() {
  return (
    <dialog className="modal modal-open">
      <div className="modal-backdrop">
        <div className="flex items-center justify-center">
          <span className="border-primary h-16 w-16 animate-spin rounded-full border-4 border-dashed"></span>
        </div>
      </div>
    </dialog>
  );
}
