import { useState, useRef, useEffect } from 'react';

const UserBar = ({ user, onProfile, onLogout, className = '' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className={className} ref={ref} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <img
          src={user.avatar || 'https://via.placeholder.com/40x40?text=U'}
          alt="avatar"
          style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', background: '#eee', marginRight: 10 }}
        />
        <span style={{ fontSize: 14, fontWeight: 500 }}>{user.name}</span>
        <svg width="16" height="16" style={{ marginLeft: 6 }}>
          <use href="src/assets/sprite.svg#icon-chevron-down" />
        </svg>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 48, right: 0, background: '#fff', border: '1px solid #eaeaea', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', minWidth: 140, zIndex: 100, padding: '8px 0' }}>
          <button type="button" style={{ padding: '10px 18px', fontSize: 14, color: '#222', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }} onClick={onProfile}>
            Profile
          </button>
          <button type="button" style={{ padding: '10px 18px', fontSize: 14, color: '#222', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }} onClick={onLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserBar; 