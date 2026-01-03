import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', padding: '30px', borderRadius: '12px',
        textAlign: 'center', maxWidth: '400px', width: '90%',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>ยืนยันการลบ?</h3>
        <p style={{ color: '#666', marginBottom: '25px' }}>
          คุณแน่ใจหรือไม่ที่จะลบทัวร์นี้? <br/>ข้อมูลที่ลบแล้วจะไม่สามารถกู้คืนได้
        </p>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button 
            onClick={onCancel} 
            style={{ 
              padding: '10px 20px', cursor: 'pointer', borderRadius: '8px',
              border: '1px solid #ccc', backgroundColor: 'white'
            }}>
            ยกเลิก
          </button>
          <button 
            onClick={onConfirm} 
            style={{ 
              padding: '10px 20px', cursor: 'pointer', borderRadius: '8px',
              border: 'none', backgroundColor: '#dc2626', color: 'white', fontWeight: 'bold'
            }}
          >
            ลบข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;