
import PED_GOLD_BG from '@/assets/cert-design/Pedigree certificate gold.svg';
import PED_BLUE_BG from '@/assets/cert-design/Pedigree certificate blue.svg';

interface Ancestor {
  name: string;
  pcrId: string;
  kennel?: string;
  details?: string; 
}

interface PedigreeCertificateProps {
  data: {
    name: string;
    pcrId: string;
    breed: string;
    sex: string;
    dateOfBirth: string;
    color: string;
    microchip: string;
    tier: 'GOLD' | 'BLUE';
    issueDate: string;
    sire?: Ancestor; 
    dam?: Ancestor;  
    paternalGrandSire?: Ancestor; 
    paternalGrandDam?: Ancestor;  
    maternalGrandSire?: Ancestor; 
    maternalGrandDam?: Ancestor;  
  };
  s?: number;
}

const PedigreeCertificate: React.FC<PedigreeCertificateProps> = ({ data, s = 1 }) => {
  const bgImage = data.tier === 'GOLD' ? PED_GOLD_BG : PED_BLUE_BG;
  const borderColor = 'hsla(225, 65%, 37%, 1)'; // Blue color for borders

  // Helper component for family tree boxes (Transparent BG, Bigger Text, Shifted UP)
  const InfoBox = ({ ancestor, label, top, left }: { ancestor?: Ancestor, label?: string, top: number, left: number }) => (
    <div style={{
      position: 'absolute',
      top: `${(top - 35) * s}px`, // Cards shifted UP by 35px
      left: `${left * s}px`,
      width: `${195 * s}px`,
      textAlign: 'center',
      fontSize: `${12 * s}px`, 
      fontFamily: "'STIXGeneralCustom', serif",
      border: `${1.5 * s}px solid ${borderColor}`, 
      padding: `${10 * s}px`,
      backgroundColor: 'transparent', // NO BG
      boxSizing: 'border-box',
    }}>
      {label && <div style={{ 
        backgroundColor: '#D4AF37', 
        fontSize: `${9 * s}px`, 
        color: '#fff', 
        padding: `${2 * s}px`,
        borderRadius: `${2 * s}px`,
        display: 'inline-block',
        marginBottom: `${5 * s}px`,
        textTransform: 'uppercase'
      }}>{label}</div>}
      <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: `${14 * s}px` }}>
        {ancestor?.name || 'UNKNOWN'}
      </div>
      <div style={{ fontSize: `${12 * s}px`, marginTop: `${2 * s}px` }}>
        {ancestor?.pcrId || 'N/A'}
      </div>
      <div style={{ fontSize: `${12 * s}px`, marginTop: `${2 * s}px`}}>
        {ancestor?.kennel || 'PCR REGISTERED'}
      </div>
    </div>
  );

  return (
    <div
      id="certificate-pedigree"
      style={{
        width: `${1123 * s}px`,
        height: `${794 * s}px`,
        position: 'relative',
        backgroundImage: `url(${(bgImage as any).src || bgImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        color: '#1C1C1C',
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      {/* 1. Breed & Summary Section */}
      <div style={{ position: 'absolute', top: `${135 * s}px`, right: `${80 * s}px`, fontSize: `${42 * s}px`, fontFamily: "'STIXGeneralCustom', serif", fontStyle: 'italic', textTransform: 'uppercase' }}>
        {data.breed}
      </div>

      <div style={{ position: 'absolute', top: `${195 * s}px`, right: `${80 * s}px`, textAlign: 'right', fontSize: `${14 * s}px`, fontFamily: "'STIXGeneralCustom', serif", lineHeight: `${18 * s}px` }}>
        <p>NAME: <strong>{data.name}</strong> &nbsp; COLOR: <strong>{data.color}</strong></p>
        <p>DOB: <strong>{data.dateOfBirth}</strong> &nbsp; SEX: <strong>{data.sex}</strong></p>
        <p>MICROCHIP#: <strong>{data.microchip}</strong></p>
      </div>

      {/* 2. Generation 1 Boxes (Grandparents) */}
      <InfoBox label="PRESTIGE AMBASSADOR" ancestor={data.paternalGrandSire} top={240} left={150} />
      <InfoBox ancestor={data.paternalGrandDam} top={350} left={150} />
      <InfoBox ancestor={data.maternalGrandSire} top={480} left={150} />
      <InfoBox label="PRESTIGE AMBASSADOR" ancestor={data.maternalGrandDam} top={590} left={150} />

      {/* 3. Generation 2 Boxes (Parents) */}
      <InfoBox ancestor={data.sire} top={305} left={385} />
      <InfoBox ancestor={data.dam} top={545} left={385} />

      {/* 4. Central Canine Box (Bigger Text, Transparent, Shifted UP) */}
      <div style={{
        position: 'absolute',
        top: `${360 * s}px`, // Center-aligned UP
        left: `${700 * s}px`,
        width: `${240 * s}px`,
        border: `${2.5 * s}px solid ${borderColor}`, 
        padding: `${15 * s}px`,
        textAlign: 'center',
        fontFamily: "'STIXGeneralCustom', serif",
        boxSizing: 'border-box',
        backgroundColor: 'transparent'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: `${20 * s}px`, textTransform: 'uppercase' }}>{data.name}</div>
        <div style={{ fontSize: `${16 * s}px`, margin: `${6 * s}px 0` }}>{data.pcrId}</div>
        <div style={{ fontSize: `${12 * s}px`, fontStyle: 'italic', color: borderColor, fontWeight: 'bold' }}>PRODUCED BY PCR</div>
      </div>

      {/* 5. SVG Lines (Adjusted for UP positions) */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {/* Gen 1 to Parents */}
        <path d={`M ${345*s} ${240*s} L ${375*s} ${240*s} L ${375*s} ${305*s} L ${385*s} ${305*s}`} fill="none" stroke={borderColor} strokeWidth={1.5*s} />
        <path d={`M ${345*s} ${350*s} L ${375*s} ${350*s} L ${375*s} ${305*s}`} fill="none" stroke={borderColor} strokeWidth={1.5*s} />
        
        <path d={`M ${345*s} ${480*s} L ${375*s} ${480*s} L ${375*s} ${545*s} L ${385*s} ${545*s}`} fill="none" stroke={borderColor} strokeWidth={1.5*s} />
        <path d={`M ${345*s} ${590*s} L ${375*s} ${590*s} L ${375*s} ${545*s}`} fill="none" stroke={borderColor} strokeWidth={1.5*s} />

        {/* Parents to Main Central */}
        <path d={`M ${580*s} ${305*s} L ${640*s} ${305*s} L ${640*s} ${385*s} L ${700*s} ${385*s}`} fill="none" stroke={borderColor} strokeWidth={1.5*s} />
        <path d={`M ${580*s} ${545*s} L ${640*s} ${545*s} L ${640*s} ${385*s}`} fill="none" stroke={borderColor} strokeWidth={1.5*s} />
      </svg>

      {/* 6. Footer - Issue Date */}
      <div style={{ position: 'absolute', bottom: `${114 * s}px`, right: `${390 * s}px`, textAlign: 'center' }}>
        <div style={{ fontSize: `${14 * s}px`, fontWeight: '' }}>{data.issueDate}</div>
      </div>
    </div>
  );
};

export default PedigreeCertificate;
