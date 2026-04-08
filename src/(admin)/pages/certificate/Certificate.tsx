/* eslint-disable @typescript-eslint/no-explicit-any */
import thickBorderSvg from "@/assets/certificate/THICK BORDER.svg";
import thinBorderSvg from "@/assets/certificate/THIN BORDER.svg";
import vectorBorder from "@/assets/certificate/Vector (2).svg";
import officialBg from "@/assets/certificate/official-bg.svg";
import signature from "@/assets/certificate/signature.svg";
import logo from "@/assets/certificate/logo.png";
import ConponentLogoBg from "@/assets/certificate/logo.png";

const PrestigeCertificate = ({
  width = 1200,
  data = {
    name: "GHOST FACE KILLAH",
    pcrId: "PCR-G22-485-102",
    breed: "American Bully (Exotic)",
    color: "Lilac Tri Merle",
    sex: "Male",
    microchip: "985112345678901",
    dob: "October 12, 2023",
    tier: "Gold",
    owner: "Julian Thompson",
    kennel: "IRON CLAD KENNELS",
    issueDate: "December 30, 2025",
  },
}) => {
  const height = width * (650 / 900);

  const s = width / 900; 

  const containerStyle: any = {
    position: "relative",
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: "transparent",
    fontFamily: "'Times New Roman', serif",
    color: "#000",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const fieldLabelStyle = {
    fontWeight: "normal",
    fontSize: `${13 * s}px`,
    color: "#333",
  };
  const fieldValueStyle = { fontWeight: "bold", fontSize: `${13 * s}px` };

  return (
    <div style={containerStyle}>
      <img
        src={thinBorderSvg}
        alt="Border"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <img
        src={thickBorderSvg}
        alt="Border"
        style={{
          position: "absolute",
          top: 35 * s,
          left: 35 * s,
          width: `calc(100% - ${70 * s}px)`,
          height: `calc(100% - ${70 * s}px)`,
        }}
      />
      <img
        src={vectorBorder}
        alt="Border"
        style={{
          position: "absolute",
          top: 50 * s,
          left: 50 * s,
          width: `calc(100% - ${100 * s}px)`,
          height: `calc(100% - ${100 * s}px)`,
        }}
      />

      <img
        src={ConponentLogoBg}
        alt="Watermark"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.9)",
          width: "80%",
          opacity: 0.12,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          width: "78%",
          height: "81%",
          marginTop: `${45 * s}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginBottom: "0" }}>
          <div
            style={{
              width: `${120 * s}px`,
              height: `${120 * s}px`,
              margin: "0 auto",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={logo}
              alt="PCR Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform: "scale(2)",
              }}
            />
          </div>

          <h2
            className={`flex justify-center items-center `}
            style={{
              margin: "0",
              lineHeight: 1,
              textAlign: "center",
              textTransform: "uppercase",
              gap: `${12 * s}px`,
            }}
          >
            <span
              style={{
                display: "block",
                color: "#1C1C1C",
                fontSize: `${28 * s}px`,
                fontFamily: "'SignPainter', 'Brush Script MT', cursive",
                fontWeight: "550",
                lineHeight: `${36 * s}px`,
                textTransform: "none",
                marginBottom: `${8 * s}px`,
              }}
            >
              Prestige Canine
            </span>

            {/* REGISTRY - Serif Style */}
            <span
              style={{
                display: "block",
                color: "#1C1C1C",
                fontSize: `${24 * s}px`,
                fontFamily:
                  "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
                fontWeight: "400",
                lineHeight: `${36 * s}px`,
                letterSpacing: `${8 * s}px`,
              }}
            >
              REGISTRY
            </span>
          </h2>
        </div>

        {/* Banner */}
        <div
          style={{
            position: "relative",
            width: `${520 * s}px`,
            height: `${45 * s}px`,
            margin: "6px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={officialBg}
            alt="Banner"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
          <span
            style={{
              position: "relative",
              zIndex: 2,
              color: "white",
              fontSize: `${17 * s}px`,
              fontWeight: "bold",
              letterSpacing: `${1 * s}px`,
            }}
          >
            OFFICIAL REGISTRATION CERTIFICATE
          </span>
        </div>

        {/* Dog Info Main: Reduced Gaps */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          <h1
            style={{
              fontSize: `${40 * s}px`,
              margin: "0",
              textTransform: "uppercase",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            {data.name}
          </h1>
          <p
            style={{
              margin: `${4 * s}px 0`,
              fontSize: `${13 * s}px`,
              fontWeight: "bold",
            }}
          >
            PCR CANINE ID
          </p>
          <p
            style={{
              margin: `${4 * s}px 0`,
              fontSize: `${26 * s}px`,
              fontWeight: "bold",
              letterSpacing: `${1 * s}px`,
              lineHeight: 1,
            }}
          >
            {data.pcrId}
          </p>
        </div>

        {/* Full Data Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: `${4 * s}px ${15 * s}px`,
            textAlign: "center",
            padding: `0 ${30 * s}px`,
            marginTop: "5px",
          }}
        >
          <div>
            <span style={fieldLabelStyle}>Breed / Designer Cross: </span>
            <span style={fieldValueStyle}>{data.breed}</span>
          </div>
          <div>
            <span style={fieldLabelStyle}>Color / Markings: </span>
            <span style={fieldValueStyle}>{data.color}</span>
          </div>
          <div>
            <span style={fieldLabelStyle}>Sex: </span>
            <span style={fieldValueStyle}>{data.sex}</span>
          </div>
          <div>
            <span style={fieldLabelStyle}>Microchip Number: </span>
            <span style={fieldValueStyle}>{data.microchip}</span>
          </div>
          <div>
            <span style={fieldLabelStyle}>Date of Birth: </span>
            <span style={fieldValueStyle}>{data.dob}</span>
          </div>
          <div>
            <span style={fieldLabelStyle}>Tier: </span>
            <span style={fieldValueStyle}>{data.tier}</span>
          </div>
          <div>
            <span style={fieldLabelStyle}>Current Owner Name: </span>
            <span style={fieldValueStyle}>{data.owner}</span>
          </div>
          <div>
            <span style={fieldLabelStyle}>KENNEL/HOUSE NAME: </span>
            <span style={fieldValueStyle}>{data.kennel}</span>
          </div>
        </div>

        <p style={{ fontSize: `${11 * s}px`, marginBottom: `${17 * s}px` }}>
          Issue Date of Certificate: <strong>{data.issueDate}</strong>
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: `${2 * s}px`,
            marginTop: "6px",
          }}
        >
          <div
            style={{
              width: `${180 * s}px`,
              textAlign: "center",
              position: "relative",
            }}
          >
            <img
              src={signature}
              alt="Signature"
              style={{
                width: `${100 * s}px`,
                position: "absolute",
                bottom: `${22 * s}px`,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 2,
              }}
            />
            <div
              style={{
                borderTop: `${1.5 * s}px solid #000`,
                paddingTop: `${4 * s}px`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: `${11 * s}px`,
                  letterSpacing: `${1 * s}px`,
                }}
              >
                Registrar / CEO
              </p>
            </div>
          </div>
        </div>
        <p
          style={{
            fontSize: `${9 * s}px`,
            color: "#C0C0C0",
            textTransform: "uppercase",
            padding: `0 ${40 * s}px`,
            lineHeight: "1.2",
            margin: "0 auto",
            width: "90%",
          }}
        >
          This certificate certifies that the canine listed above has met the
          DNA, Microchip and Health requirements established by the Prestige
          Canine Registry.
        </p>
      </div>
    </div>
  );
};

export default PrestigeCertificate;
