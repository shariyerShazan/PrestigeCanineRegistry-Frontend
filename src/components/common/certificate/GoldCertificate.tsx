// import React from 'react'

const GoldCertificate = () => {
  return (
   <div className="w-full max-w-5xl mx-auto bg-gradient-to-b from-[#d4b46e] via-[#d4b46e] to-[#a68b4a] p-4 md:p-6 shadow-2xl">
      <div className="bg-[#faf8f3] p-5 md:p-8 relative">
        {/* Double border frame */}
        <div className="absolute inset-4 md:inset-6 border-2 border-[#c9a961]" />
        <div className="absolute inset-[26px] md:inset-[34px] border border-[#c9a961]">
          {/* Corner decorations */}
          <div className="absolute -top-px -left-px w-8 h-8 border-t-2 border-l-2 border-[#c9a961]" />
          <div className="absolute -top-px -right-px w-8 h-8 border-t-2 border-r-2 border-[#c9a961]" />
          <div className="absolute -bottom-px -left-px w-8 h-8 border-b-2 border-l-2 border-[#c9a961]" />
          <div className="absolute -bottom-px -right-px w-8 h-8 border-b-2 border-r-2 border-[#c9a961]" />
        </div>

        {/* Background watermark laurels */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            {/* Left laurel branch */}
            <g transform="translate(150, 300)">
              <ellipse cx="-20" cy="-60" rx="15" ry="30" fill="currentColor" transform="rotate(-30 -20 -60)" />
              <ellipse cx="-10" cy="-90" rx="15" ry="30" fill="currentColor" transform="rotate(-25 -10 -90)" />
              <ellipse cx="5" cy="-115" rx="15" ry="30" fill="currentColor" transform="rotate(-15 5 -115)" />
              <ellipse cx="25" cy="-135" rx="15" ry="30" fill="currentColor" transform="rotate(-5 25 -135)" />
              <ellipse cx="-30" cy="-30" rx="15" ry="30" fill="currentColor" transform="rotate(-35 -30 -30)" />
              <ellipse cx="-35" cy="0" rx="15" ry="30" fill="currentColor" transform="rotate(-40 -35 0)" />
              <ellipse cx="-30" cy="30" rx="15" ry="30" fill="currentColor" transform="rotate(-45 -30 30)" />
              <ellipse cx="-20" cy="60" rx="15" ry="30" fill="currentColor" transform="rotate(-50 -20 60)" />
              <ellipse cx="-10" cy="90" rx="15" ry="30" fill="currentColor" transform="rotate(-55 -10 90)" />
              <ellipse cx="5" cy="115" rx="15" ry="30" fill="currentColor" transform="rotate(-60 5 115)" />
            </g>

            {/* Right laurel branch */}
            <g transform="translate(650, 300)">
              <ellipse cx="20" cy="-60" rx="15" ry="30" fill="currentColor" transform="rotate(30 20 -60)" />
              <ellipse cx="10" cy="-90" rx="15" ry="30" fill="currentColor" transform="rotate(25 10 -90)" />
              <ellipse cx="-5" cy="-115" rx="15" ry="30" fill="currentColor" transform="rotate(15 -5 -115)" />
              <ellipse cx="-25" cy="-135" rx="15" ry="30" fill="currentColor" transform="rotate(5 -25 -135)" />
              <ellipse cx="30" cy="-30" rx="15" ry="30" fill="currentColor" transform="rotate(35 30 -30)" />
              <ellipse cx="35" cy="0" rx="15" ry="30" fill="currentColor" transform="rotate(40 35 0)" />
              <ellipse cx="30" cy="30" rx="15" ry="30" fill="currentColor" transform="rotate(45 30 30)" />
              <ellipse cx="20" cy="60" rx="15" ry="30" fill="currentColor" transform="rotate(50 20 60)" />
              <ellipse cx="10" cy="90" rx="15" ry="30" fill="currentColor" transform="rotate(55 10 90)" />
              <ellipse cx="-5" cy="115" rx="15" ry="30" fill="currentColor" transform="rotate(60 -5 115)" />
            </g>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 px-4 md:px-12 py-6 md:py-8">
          {/* Logo and Header */}
          <div className="flex flex-col items-center mb-6">
            {/* PCR Logo with crown and laurels */}
            <div className="relative mb-2">
              <div className="flex items-center justify-center gap-3">
                {/* Left laurel */}
                <svg className="w-8 h-10 text-[#a68b4a]" viewBox="0 0 30 40" fill="currentColor">
                  <ellipse cx="15" cy="5" rx="3" ry="6" transform="rotate(-20 15 5)" />
                  <ellipse cx="18" cy="12" rx="3" ry="6" transform="rotate(-15 18 12)" />
                  <ellipse cx="20" cy="19" rx="3" ry="6" transform="rotate(-10 20 19)" />
                  <ellipse cx="21" cy="26" rx="3" ry="6" transform="rotate(-5 21 26)" />
                  <ellipse cx="21" cy="33" rx="3" ry="6" transform="rotate(0 21 33)" />
                </svg>

                {/* Center with crown */}
                <div className="flex flex-col items-center">
                  {/* Crown */}
                  <svg className="w-10 h-8 text-[#a68b4a] mb-1" viewBox="0 0 40 32" fill="currentColor">
                    <path d="M20 8 L24 16 L20 14 L16 16 L20 8 Z" />
                    <circle cx="8" cy="16" r="3" />
                    <circle cx="20" cy="4" r="3" />
                    <circle cx="32" cy="16" r="3" />
                    <path d="M6 16 L8 24 L32 24 L34 16" />
                    <rect x="7" y="24" width="26" height="4" />
                  </svg>

                  {/* PCR Badge */}
                  <div className="bg-gradient-to-b from-[#c9a961] to-[#a68b4a] px-4 py-2 rounded-sm">
                    <div className="text-white font-bold text-2xl tracking-wider">PCR</div>
                  </div>
                  <div className="text-[#a68b4a] text-[10px] tracking-widest mt-1">Prestige Canine</div>
                </div>

                {/* Right laurel */}
                <svg className="w-8 h-10 text-[#a68b4a]" viewBox="0 0 30 40" fill="currentColor">
                  <ellipse cx="15" cy="5" rx="3" ry="6" transform="rotate(20 15 5)" />
                  <ellipse cx="12" cy="12" rx="3" ry="6" transform="rotate(15 12 12)" />
                  <ellipse cx="10" cy="19" rx="3" ry="6" transform="rotate(10 10 19)" />
                  <ellipse cx="9" cy="26" rx="3" ry="6" transform="rotate(5 9 26)" />
                  <ellipse cx="9" cy="33" rx="3" ry="6" transform="rotate(0 9 33)" />
                </svg>
              </div>
            </div>

            {/* Prestige Canine Registry text */}
            <div className="text-center mb-4">
              <span className="font-serif italic text-lg">Prestige Canine </span>
              <span className="font-sans tracking-[0.3em] text-sm">REGISTRY</span>
            </div>

            {/* Gold ribbon banner */}
            <div className="relative w-full max-w-xl">
              <div className="bg-gradient-to-r from-[#c9a961] via-[#d4b46e] to-[#c9a961] px-6 py-3 text-center shadow-md">
                <div className="text-white font-bold text-sm md:text-base tracking-[0.2em]">
                  OFFICIAL REGISTRATION CERTIFICATE
                </div>
              </div>
              {/* Ribbon tails */}
              <div className="absolute -left-3 top-0 w-0 h-0 border-t-[20px] border-t-transparent border-r-[12px] border-r-[#8b7340] border-b-[20px] border-b-transparent" />
              <div className="absolute -right-3 top-0 w-0 h-0 border-t-[20px] border-t-transparent border-l-[12px] border-l-[#8b7340] border-b-[20px] border-b-transparent" />
            </div>
          </div>

          {/* Main content */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">NAME</h1>

            <div className="text-xs tracking-wider mb-1">PCR CANINE ID</div>
            <div className="text-2xl font-bold tracking-wider mb-6">PCR-GXX-XXX-XXX</div>

            {/* Two column information */}
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 max-w-2xl mx-auto text-sm mb-6">
              <div className="text-right">Breed / Designer Cross:</div>
              <div className="text-left">Color / Markings:</div>

              <div className="text-right">Sex:</div>
              <div className="text-left">Microchip Number:</div>

              <div className="text-right">Date of Birth:</div>
              <div className="text-left">Tier:</div>

              <div className="text-right">Current Owner Name:</div>
              <div className="text-left">
                <span className="text-blue-600 underline">KENNEL/HOUSE NAME:</span>
              </div>
            </div>

            {/* Issue date and signature */}
            <div className="text-sm mb-2">Issue Date of Certificate:</div>
            <div className="font-serif italic text-2xl mb-1">Victor Peona</div>
            <div className="text-xs tracking-wider">Registrar / CEO</div>
            <div className="w-64 h-px bg-black mx-auto mt-2 mb-6" />

            {/* Footer text */}
            <div className="text-[10px] text-gray-400 tracking-wide max-w-3xl mx-auto leading-relaxed">
              THIS CERTIFICATE CERTIFIES THAT THE CANINE LISTED ABOVE HAS MET THE DNA, MICROCHIP AND HEALTH
              <br />
              REQUIREMENTS ESTABLISHED BY THE PRESTIGE CANINE REGISTRY.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoldCertificate