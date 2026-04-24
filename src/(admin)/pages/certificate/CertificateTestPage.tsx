

import { useState } from 'react';
import PCRCertificate from './PCRCertificate';
import PrestigeAmbassador from './PrestigeAmbassador';
import PedigreeCertificate from './PedigreeCertificate';

const CertificateTestPage = () => {
  const [tier, setTier] = useState<'GOLD' | 'BLUE'>('GOLD');
  const [type, setType] = useState<'PCR' | 'AMBASSADOR' | 'PEDIGREE'>('PCR');

  // Updated Dummy Data with Family Tree (Sire, Dam, Grandparents)
  const dummyData = {
    name: "MAX THUNDER",
    pcrId: "PCR-G252-004",
    breed: "GOLDEN RETRIEVER",
    sex: "MALE",
    dateOfBirth: "2025 JAN 16",
    owner: "MICHAEL CHEN",
    color: "GOLD/BLACK",
    microchip: "348938XXXX",
    tier: tier,
    issueDate: "2025 DEC 06",
    
    // Family Tree Data for Pedigree
    sire: { name: "JOKER (DBR)", pcrId: "PCR-G001-343", kennel: "SAMPLE KENNEL LLC" },
    dam: { name: "DWEETIE (DBR)", pcrId: "PCR-G001-523", kennel: "SAMPLE KENNEL LLC" },
    
    // Paternal Side (Father's parents) - 2 candidates
    paternalGrandSire: { name: "MAX (DBR) BLK/RST", pcrId: "PCR-G001-297", kennel: "SAMPLE KENNEL LLC" },
    paternalGrandDam: { name: "ROXIE (DBR) BLK/RST", pcrId: "PCR-G001-103", kennel: "SAMPLE KENNEL LLC" },
    
    // Maternal Side (Mother's parents) - 2 candidates
    maternalGrandSire: { name: "CHARLIE (DBR) RD/RST", pcrId: "PCR-G001-053", kennel: "SAMPLE KENNEL LLC" },
    maternalGrandDam: { name: "ROSIE (DBR) RD/RST", pcrId: "PCR-G25-200-014", kennel: "SAMPLE KENNEL LLC" },

    // Fallback for previous version
    children: [] 
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ 
        marginBottom: "30px", 
        padding: "20px", 
        backgroundColor: "#fff", 
        borderRadius: "8px",
        display: "flex",
        gap: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <div>
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>Select Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value as any)}>
            <option value="PCR">PCR Certificate</option>
            <option value="AMBASSADOR">Prestige Ambassador</option>
            <option value="PEDIGREE">Pedigree Certificate</option>
          </select>
        </div>

        <div>
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>Select Tier:</label>
          <select value={tier} onChange={(e) => setTier(e.target.value as any)}>
            <option value="GOLD">GOLD</option>
            <option value="BLUE">BLUE</option>
          </select>
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        backgroundColor: "#ddd", 
        padding: "20px",
        borderRadius: "10px",
        overflowX: "auto"
      }}>
        {type === 'PCR' && <PCRCertificate data={dummyData} s={0.8} />}
        {type === 'AMBASSADOR' && <PrestigeAmbassador data={dummyData} s={0.8} />}
        {type === 'PEDIGREE' && <PedigreeCertificate data={dummyData} s={0.8} />}
      </div>
    </div>
  );
};

export default CertificateTestPage;