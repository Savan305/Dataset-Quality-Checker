import { X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type || 'info'}`}>
      <span>{toast.message}</span>
      <button type="button" aria-label="Close notification" onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
}
