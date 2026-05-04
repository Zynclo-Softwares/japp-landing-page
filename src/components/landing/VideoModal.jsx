import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function VideoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ maxWidth: 900 }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-semibold transition-colors z-10"
        >
          <X size={16} /> Close
        </button>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src="https://www.youtube.com/embed/YRgo4OErGXw?autoplay=1&rel=0"
            title="Just Apply Preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full rounded-2xl"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}