
import PCR_GOLD_BG from '@/assets/cert-design/PCR - gold certificate.svg';
import PCR_BLUE_BG from '@/assets/cert-design/PCR - Blue certificate.svg';

interface PCRCertificateProps {
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
  s?: number; // scale factor for PDF rendering
}

const PCRCertificate: React.FC<PCRCertificateProps> = ({ data, s = 1 }) => {
  // Tier wise background select
  const bgImage = data.tier === 'GOLD' ? PCR_GOLD_BG : PCR_BLUE_BG;

  return (
    <div
      id="certificate-pcr"
      style={{
        width: `${1123 * s}px`, // A4 Landscape width
        height: `${794 * s}px`,  // A4 Landscape height
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
      {/* 1. Main Title - Dog Name */}
      <div
        style={{
          position: 'absolute',
          top: `${295 * s}px`,
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

      {/* 2. PCR Canine ID */}
      <div
        style={{
          position: 'absolute',
          top: `${365 * s}px`,
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

      {/* 3. Left Info Column */}
      <div
        style={{
          position: 'absolute',
          top: `${455 * s}px`,
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
          top: `${455 * s}px`,
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

      {/* 5. Issue Date */}
      <div
        style={{
          position: 'absolute',
          bottom: `${195 * s}px`,
          width: '100%',
          textAlign: 'center',
          fontSize: `${16 * s}px`,
          fontStyle: 'italic',
        }}
      >
        Issue Date of Certificate: {data.issueDate}
      </div>


    </div>
  );
};

export default PCRCertificate;