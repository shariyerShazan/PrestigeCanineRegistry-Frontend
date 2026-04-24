
import AMB_GOLD_BG from '@/assets/cert-design/Prestige Ambassador - gold.svg';
import AMB_BLUE_BG from '@/assets/cert-design/Prestige Ambassador - blue.svg';

interface AmbassadorCertificateProps {
  data: {
    name: string;
    pcrId: string;
    breed: string;
    sex: string;
    dateOfBirth: string;
    owner: string;
    color: string;
    microchip: string;
    tier: 'GOLD' | 'BLUE';
    kennel?: string;
    issueDate: string;
  };
  s?: number; // Scale factor
}

const PrestigeAmbassador: React.FC<AmbassadorCertificateProps> = ({ data, s = 1 }) => {
  const bgImage = data.tier === 'GOLD' ? AMB_GOLD_BG : AMB_BLUE_BG;

  return (
    <div
      id="certificate-ambassador"
      style={{
        width: `${1123 * s}px`,
        height: `${794 * s}px`,
        position: 'relative',
        backgroundImage: `url(${(bgImage as any).src || bgImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        fontFamily: 'Arial, sans-serif',
        color: '#1C1C1C',
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      {/* 1. Ambassador Main Title - Dog Name */}
      <div
        style={{
          position: 'absolute',
          top: `${335 * s}px`,
          width: '100%',
          textAlign: 'center',
          fontSize: `${48 * s}px`,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: `${2 * s}px`,
          fontFamily: "'STIX Two Text', serif"
        }}
      >
        {data.name}
      </div>

      {/* 2. PCR Canine ID Section */}
      <div
        style={{
          position: 'absolute',
          top: `${400 * s}px`,
          width: '100%',
          textAlign: 'center',
          fontSize: `${32 * s}px`,
          fontWeight: 'bold',
          fontFamily: "'STIX Two Text', serif"
        }}
      >
        <span style={{ display: 'block', fontSize: `${20 * s}px`, fontWeight: 'bold' }}>
          PCR CANINE ID
        </span>
        {data.pcrId}
      </div>

      {/* 3. Detailed Information Grid */}
      <div
        style={{
          position: 'absolute',
          top: `${485 * s}px`,
          left: `${180 * s}px`,
          fontSize: `${16 * s}px`,
          lineHeight: `${24 * s}px`,
          textAlign: 'left',
        }}
      >
        <p><strong>BREED:</strong> {data.breed.toUpperCase()}</p>
        <p><strong>SEX:</strong> {data.sex.toUpperCase()}</p>
        <p><strong>DATE OF BIRTH:</strong> {data.dateOfBirth.toUpperCase()}</p>
        <p><strong>OWNER:</strong> {data.owner.toUpperCase()}</p>
      </div>

      {/* 4. Right Info Column */}
      <div
        style={{
          position: 'absolute',
          top: `${485 * s}px`,
          right: `${180 * s}px`,
          fontSize: `${16 * s}px`,
          lineHeight: `${24 * s}px`,
          textAlign: 'left',
        }}
      >
        <p><strong>COLOR:</strong> {data.color.toUpperCase()}</p>
        <p><strong>MICROCHIP #:</strong> {data.microchip}</p>
        <p><strong>TIER:</strong> {data.tier}</p>
        <p><strong>KENNEL:</strong> {data.kennel || 'N/A'}</p>
      </div>

      {/* 4. Footer Issue Date */}
      <div
        style={{
          position: 'absolute',
          bottom: `${175 * s}px`,
          width: '100%',
          textAlign: 'center',
          fontSize: `${16 * s}px`,
          fontStyle: 'italic',
        }}
      >
        Issue Date of Certificate: {data.issueDate}
      </div>

      {/* 5. Signature Section */}
      {/* <div
        style={{
          position: 'absolute',
          bottom: `${110 * s}px`,
          width: '100%',
          textAlign: 'center',
          fontSize: `${18 * s}px`,
          fontFamily: "'SignPainter', cursive",
        }}
      >
        Victor Pecina
      </div> */}
    </div>
  );
};

export default PrestigeAmbassador;