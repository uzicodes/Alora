import Image from "next/image";

export default function Loading() {
  return (
    <div className="loader-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '45px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'var(--font-kharaissa), sans-serif', letterSpacing: '4px', fontWeight: 'normal', color: '#636B06', fontSize: '2.5em' }}>ALORA</span>
      </div>
      <div className="loader"></div>
    </div>
  );
}
