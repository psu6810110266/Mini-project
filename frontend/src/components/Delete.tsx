interface DeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ isOpen, onConfirm, onCancel }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="trego-modal-overlay">
      <div className="trego-modal-box" style={{ textAlign: 'center', maxWidth: '350px' }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>⚠️</div>
        <h3 style={{ margin: '0 0 10px' }}>Are you sure?</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="trego-btn trego-btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="trego-btn trego-btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}