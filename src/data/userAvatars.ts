// High-Fidelity SVG Avatars accurately depicting the 5 personas:
// 1. Institution Admin: Brajesh Resume.png (Charcoal blazer, white open-collar shirt, beard/mustache, office setting)
// 2. Industry Recruiter: 1000386103.jpg (Black shirt, wavy styled hair, mustache, sunset beach background)
// 3. Student: Kartik.jpg (Sage green t-shirt, textured short hair, friendly smile, clean ambient backdrop)
// 4. Faculty / Academician: koushik bgmi.jpeg (Black & grey striped collared shirt, mustache, outdoor campus backdrop)
// 5. Alumni / Industry Leader: Priya Sharma (Staff AI Architect, navy blazer, modern glasses, tech campus background)

export const ALUMNI_PRIYA_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <!-- Background Gradient (Tech Campus & Innovation Hub) -->
    <linearGradient id="alumni-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="50%" stop-color="#CBD5E1"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <linearGradient id="alumni-glass-glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#6366F1" stop-opacity="0.1"/>
    </linearGradient>

    <!-- Skin Gradients -->
    <linearGradient id="alumni-skin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2C79D"/>
      <stop offset="50%" stop-color="#E0A878"/>
      <stop offset="100%" stop-color="#C68A57"/>
    </linearGradient>
    
    <!-- Hair & Outfit -->
    <linearGradient id="alumni-hair" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#262626"/>
      <stop offset="60%" stop-color="#171717"/>
      <stop offset="100%" stop-color="#0A0A0A"/>
    </linearGradient>
    <linearGradient id="alumni-blazer" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A"/>
      <stop offset="50%" stop-color="#172554"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="alumni-silk" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </linearGradient>

    <clipPath id="alumni-circle">
      <circle cx="250" cy="250" r="250"/>
    </clipPath>
  </defs>

  <g clip-path="url(#alumni-circle)">
    <!-- 1. Background Campus Tech Architecture -->
    <rect width="500" height="500" fill="url(#alumni-bg)"/>
    <rect x="280" y="0" width="220" height="500" fill="url(#alumni-glass-glow)"/>
    <line x1="280" y1="0" x2="280" y2="500" stroke="#CBD5E1" stroke-width="4"/>
    <line x1="380" y1="0" x2="380" y2="500" stroke="#E2E8F0" stroke-width="3"/>
    
    <!-- Ambient architectural plants -->
    <path d="M 0 400 Q 50 340 110 370 Q 170 330 220 380 L 220 500 L 0 500 Z" fill="#0D9488" opacity="0.3"/>
    <path d="M 320 390 Q 380 340 440 370 L 500 500 L 320 500 Z" fill="#059669" opacity="0.35"/>

    <!-- 2. Dark Navy Executive Tailored Blazer & Sapphire Silk Inner -->
    <path d="M 60 500 C 60 380 130 330 250 330 C 370 330 440 380 440 500 Z" fill="url(#alumni-blazer)"/>
    <path d="M 195 330 L 250 435 L 305 330 Z" fill="url(#alumni-silk)"/>
    
    <!-- Lapels -->
    <path d="M 150 340 L 220 445 L 195 500 L 90 500 Z" fill="#172554"/>
    <path d="M 350 340 L 280 445 L 305 500 L 410 500 Z" fill="#172554"/>
    
    <!-- Subtle Gold Alumni Lapel Pin -->
    <polygon points="175,375 180,385 192,385 182,392 185,404 175,396 165,404 168,392 158,385 170,385" fill="#F59E0B"/>

    <!-- 3. Neck & Throat -->
    <path d="M 215 260 L 215 340 Q 250 355 285 340 L 285 260 Z" fill="url(#alumni-skin)"/>
    <path d="M 225 285 Q 250 315 275 285 Z" fill="#B87A46" opacity="0.4"/>

    <!-- 4. Head & Face -->
    <ellipse cx="250" cy="220" rx="78" ry="94" fill="url(#alumni-skin)"/>
    
    <!-- Ears -->
    <ellipse cx="172" cy="225" rx="10" ry="18" fill="#E0A878"/>
    <ellipse cx="328" cy="225" rx="10" ry="18" fill="#E0A878"/>
    <!-- Pearl Earrings -->
    <circle cx="172" cy="236" r="4.5" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
    <circle cx="328" cy="236" r="4.5" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>

    <!-- 5. Long Flowing Dark Hair with Highlights -->
    <path d="M 160 210 C 150 120 190 95 250 95 C 310 95 350 120 340 210 C 355 280 345 380 320 420 C 310 340 330 250 320 200 C 310 135 280 120 250 120 C 220 120 190 135 180 200 C 170 250 190 340 180 420 C 155 380 145 280 160 210 Z" fill="url(#alumni-hair)"/>
    <path d="M 180 145 C 210 110 290 110 320 145 C 290 125 210 125 180 145 Z" fill="#383330"/>

    <!-- 6. Eyebrows -->
    <path d="M 195 185 Q 220 176 235 185" stroke="#1A1A1A" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M 265 185 Q 280 176 305 185" stroke="#1A1A1A" stroke-width="4" stroke-linecap="round" fill="none"/>

    <!-- 7. Warm Confident Eyes -->
    <ellipse cx="216" cy="202" rx="11" ry="8" fill="#FFFFFF"/>
    <circle cx="217" cy="202" r="5.5" fill="#2E1B10"/>
    <circle cx="219" cy="200" r="1.8" fill="#FFFFFF"/>
    
    <ellipse cx="284" cy="202" rx="11" ry="8" fill="#FFFFFF"/>
    <circle cx="283" cy="202" r="5.5" fill="#2E1B10"/>
    <circle cx="285" cy="200" r="1.8" fill="#FFFFFF"/>

    <!-- 8. Modern Sleek Wireframe Glasses -->
    <rect x="198" y="190" width="38" height="24" rx="8" fill="none" stroke="#64748B" stroke-width="2.2"/>
    <rect x="264" y="190" width="38" height="24" rx="8" fill="none" stroke="#64748B" stroke-width="2.2"/>
    <line x1="236" y1="200" x2="264" y2="200" stroke="#64748B" stroke-width="2.2"/>
    <line x1="198" y1="198" x2="175" y2="192" stroke="#64748B" stroke-width="1.8"/>
    <line x1="302" y1="198" x2="325" y2="192" stroke="#64748B" stroke-width="1.8"/>

    <!-- 9. Nose & Smile -->
    <path d="M 250 196 L 252 228 Q 254 235 248 237 Q 242 235 244 228 Z" fill="none"/>
    <path d="M 248 200 Q 253 226 256 232 Q 248 237 242 232" stroke="#A86A38" stroke-width="2.2" fill="none" stroke-linecap="round"/>

    <!-- Cheerful Inspiring Smile -->
    <path d="M 226 256 Q 250 278 274 256" stroke="#991B1B" stroke-width="2.2" fill="none"/>
    <path d="M 228 256 Q 250 274 272 256 Z" fill="#FFFFFF"/>
    <path d="M 226 256 Q 250 262 274 256" stroke="#991B1B" stroke-width="1" fill="none"/>
  </g>
</svg>
`)}`;

export const ADMIN_BRAJESH_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <!-- Background Office Gradients -->
    <linearGradient id="office-wall" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D6D3D1"/>
      <stop offset="40%" stop-color="#E7E5E4"/>
      <stop offset="80%" stop-color="#CBD5E1"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <linearGradient id="window-light" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#E2E8F0" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="wood-panel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A8A29E"/>
      <stop offset="50%" stop-color="#D6D3D1"/>
      <stop offset="100%" stop-color="#78716C"/>
    </linearGradient>
    
    <!-- Realistic Skin Gradient -->
    <linearGradient id="skin-base" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8B582"/>
      <stop offset="45%" stop-color="#D49B6A"/>
      <stop offset="100%" stop-color="#B87A46"/>
    </linearGradient>
    <radialGradient id="cheek-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#C27A4B" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#C27A4B" stop-opacity="0"/>
    </radialGradient>
    
    <!-- Charcoal Blazer Texture & Shading -->
    <linearGradient id="blazer-heather" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3F444E"/>
      <stop offset="35%" stop-color="#2D3139"/>
      <stop offset="75%" stop-color="#1F232B"/>
      <stop offset="100%" stop-color="#14171E"/>
    </linearGradient>
    <linearGradient id="blazer-lapel" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A4F5B"/>
      <stop offset="100%" stop-color="#1E2129"/>
    </linearGradient>
    <pattern id="blazer-weave" width="4" height="4" patternUnits="userSpaceOnUse">
      <rect width="2" height="2" fill="#383D47"/>
      <rect x="2" width="2" height="2" fill="#252932"/>
      <rect y="2" width="2" height="2" fill="#292D37"/>
      <rect x="2" y="2" width="2" height="2" fill="#3E434F"/>
    </pattern>

    <!-- Hair Gradient -->
    <linearGradient id="hair-specular" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2D2825"/>
      <stop offset="25%" stop-color="#1A1816"/>
      <stop offset="100%" stop-color="#0B0A09"/>
    </linearGradient>

    <clipPath id="admin-circle">
      <circle cx="250" cy="250" r="250"/>
    </clipPath>
  </defs>

  <g clip-path="url(#admin-circle)">
    <!-- 1. Realistic Office Backdrop with Windows & Soft Foliage -->
    <rect width="500" height="500" fill="url(#office-wall)"/>
    <!-- Office vertical column & window frame -->
    <rect x="360" y="0" width="140" height="500" fill="url(#window-light)"/>
    <rect x="0" y="40" width="130" height="460" fill="url(#wood-panel)" opacity="0.65"/>
    <line x1="360" y1="0" x2="360" y2="500" stroke="#CBD5E1" stroke-width="6"/>
    <line x1="430" y1="0" x2="430" y2="500" stroke="#E2E8F0" stroke-width="4"/>
    
    <!-- Indoor office planter greenery blurred in background -->
    <path d="M 0 380 Q 40 330 90 350 Q 140 330 180 370 L 180 500 L 0 500 Z" fill="#15803D" opacity="0.4"/>
    <path d="M 10 395 Q 60 355 110 375 Q 160 350 200 390 L 200 500 L 0 500 Z" fill="#4ADE80" opacity="0.3"/>
    <path d="M 330 380 Q 380 340 430 360 Q 470 330 500 365 L 500 500 L 330 500 Z" fill="#16A34A" opacity="0.35"/>

    <!-- 2. Dark Charcoal Tailored Blazer -->
    <!-- Torso silhouette -->
    <path d="M 50 500 C 50 385 120 335 250 335 C 380 335 450 385 450 500 Z" fill="url(#blazer-heather)"/>
    <path d="M 50 500 C 50 385 120 335 250 335 C 380 335 450 385 450 500 Z" fill="url(#blazer-weave)" opacity="0.6"/>

    <!-- Crisp White Button-Down Shirt (Open Collar) -->
    <path d="M 200 335 L 250 440 L 300 335 Z" fill="#FFFFFF"/>
    <path d="M 246 390 L 254 390 L 254 500 L 246 500 Z" fill="#F1F5F9"/>
    <!-- Mother of pearl shirt buttons -->
    <circle cx="250" cy="425" r="3" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="0.8"/>
    <circle cx="250" cy="470" r="3" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="0.8"/>

    <!-- Shirt Collars (Wings spread open) -->
    <path d="M 195 330 L 230 405 L 210 415 L 175 342 Z" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <path d="M 305 330 L 270 405 L 290 415 L 325 342 Z" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <!-- Collar shadow on neck -->
    <path d="M 205 335 Q 250 355 295 335 L 250 375 Z" fill="#B87A46" opacity="0.35"/>

    <!-- Tailored Blazer Lapels & Seams -->
    <!-- Left Lapel -->
    <path d="M 145 345 L 218 450 L 200 500 L 100 500 Z" fill="url(#blazer-lapel)"/>
    <path d="M 145 345 L 180 375 L 218 450 L 214 455 L 138 350 Z" stroke="#525866" stroke-width="1.5" fill="none"/>
    <!-- Right Lapel -->
    <path d="M 355 345 L 282 450 L 300 500 L 400 500 Z" fill="url(#blazer-lapel)"/>
    <path d="M 355 345 L 320 375 L 282 450 L 286 455 L 362 350 Z" stroke="#525866" stroke-width="1.5" fill="none"/>
    <!-- Blazer button -->
    <circle cx="240" cy="475" r="5" fill="#18181B" stroke="#3F3F46" stroke-width="1"/>

    <!-- 3. Neck & Throat -->
    <path d="M 215 265 L 215 345 Q 250 365 285 345 L 285 265 Z" fill="url(#skin-base)"/>
    <path d="M 225 295 Q 250 325 275 295 Z" fill="#A86B38" opacity="0.45"/>

    <!-- 4. Head & Facial Structure (Handsome, well proportioned) -->
    <ellipse cx="250" cy="225" rx="82" ry="98" fill="url(#skin-base)"/>
    <circle cx="195" cy="235" r="28" fill="url(#cheek-glow)"/>
    <circle cx="305" cy="235" r="28" fill="url(#cheek-glow)"/>

    <!-- Ears -->
    <ellipse cx="168" cy="232" rx="12" ry="22" fill="#D49B6A"/>
    <ellipse cx="170" cy="232" rx="7" ry="14" fill="#B87A46"/>
    <ellipse cx="332" cy="232" rx="12" ry="22" fill="#D49B6A"/>
    <ellipse cx="330" cy="232" rx="7" ry="14" fill="#B87A46"/>

    <!-- 5. Voluminous Dark Styled Hair (Textured top with neat sides) -->
    <path d="M 166 215 C 160 135 195 105 250 102 C 310 105 340 135 334 215 C 322 150 295 125 250 125 C 205 125 178 150 166 215 Z" fill="url(#hair-specular)"/>
    <!-- Wavy texture on top -->
    <path d="M 175 160 C 200 115 285 110 325 155 C 305 125 255 118 200 130 Z" fill="#383330"/>
    <path d="M 190 135 C 220 108 280 112 310 140 C 275 120 225 120 190 135 Z" fill="#4B443F" opacity="0.7"/>

    <!-- Sideburns -->
    <path d="M 167 205 L 173 245 L 178 245 L 174 205 Z" fill="#1A1816"/>
    <path d="M 333 205 L 327 245 L 322 245 L 326 205 Z" fill="#1A1816"/>

    <!-- 6. Expressive Eyebrows -->
    <path d="M 190 190 Q 218 180 236 190" stroke="#141210" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M 264 190 Q 282 180 310 190" stroke="#141210" stroke-width="6" stroke-linecap="round" fill="none"/>

    <!-- 7. Warm Almond-Shaped Brown Eyes -->
    <!-- Left Eye -->
    <ellipse cx="214" cy="208" rx="12.5" ry="9" fill="#FFFFFF"/>
    <circle cx="215" cy="208" r="6.2" fill="#2E1B10"/>
    <circle cx="215" cy="208" r="3.2" fill="#0F0804"/>
    <circle cx="217.5" cy="205.5" r="2" fill="#FFFFFF"/>
    <path d="M 201 206 Q 214 199 227 206" stroke="#1A1816" stroke-width="2.5" fill="none"/>
    <path d="M 203 211 Q 214 217 225 211" stroke="#8A5832" stroke-width="1.2" fill="none"/>
    <!-- Eye wrinkle / smile crease -->
    <path d="M 229 207 Q 235 209 233 214" stroke="#9A6137" stroke-width="1.2" fill="none"/>

    <!-- Right Eye -->
    <ellipse cx="286" cy="208" rx="12.5" ry="9" fill="#FFFFFF"/>
    <circle cx="285" cy="208" r="6.2" fill="#2E1B10"/>
    <circle cx="285" cy="208" r="3.2" fill="#0F0804"/>
    <circle cx="287.5" cy="205.5" r="2" fill="#FFFFFF"/>
    <path d="M 273 206 Q 286 199 299 206" stroke="#1A1816" stroke-width="2.5" fill="none"/>
    <path d="M 275 211 Q 286 217 297 211" stroke="#8A5832" stroke-width="1.2" fill="none"/>
    <!-- Eye wrinkle / smile crease -->
    <path d="M 267 207 Q 262 209 264 214" stroke="#9A6137" stroke-width="1.2" fill="none"/>

    <!-- 8. Well-Defined Nose -->
    <path d="M 250 196 L 253 234 Q 256 242 249 245 Q 242 242 245 234 Z" fill="none"/>
    <path d="M 248 198 Q 253 230 258 238 Q 248 244 240 238" stroke="#945323" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    <circle cx="238" cy="237" r="3.5" fill="#A86230" opacity="0.6"/>
    <circle cx="262" cy="237" r="3.5" fill="#A86230" opacity="0.6"/>

    <!-- 9. Neatly Groomed Mustache & Stubble Beard -->
    <!-- Full mustache -->
    <path d="M 224 254 Q 250 246 276 254 Q 250 266 224 254 Z" fill="#171513"/>
    <!-- Beard along jawline & chin -->
    <path d="M 195 240 C 190 280 220 310 250 312 C 280 310 310 280 305 240 C 300 285 275 304 250 304 C 225 304 200 285 195 240 Z" fill="#171513" opacity="0.82"/>
    <!-- Soul patch under lower lip -->
    <path d="M 243 285 Q 250 295 257 285 Q 250 299 243 285 Z" fill="#171513"/>

    <!-- 10. Broad Genuine Smile with Clean Teeth -->
    <path d="M 228 268 Q 250 290 272 268 Q 250 296 228 268 Z" fill="#881337"/>
    <!-- Upper white teeth row -->
    <path d="M 231 269 Q 250 282 269 269 Q 250 273 231 269 Z" fill="#FFFFFF"/>
    <!-- Subtle smile lines -->
    <path d="M 218 250 Q 212 265 220 278" stroke="#9A6137" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M 282 250 Q 288 265 280 278" stroke="#9A6137" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  </g>
</svg>
`)}`;

export const RECRUITER_AAKASH_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="sunset-sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FB923C"/>
      <stop offset="35%" stop-color="#F472B6"/>
      <stop offset="70%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
    <linearGradient id="ocean-wave" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0369A1"/>
      <stop offset="50%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
    <linearGradient id="skin-rec" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2B77D"/>
      <stop offset="100%" stop-color="#D98E4B"/>
    </linearGradient>
    <clipPath id="circle-clip-rec">
      <circle cx="200" cy="200" r="200"/>
    </clipPath>
  </defs>

  <g clip-path="url(#circle-clip-rec)">
    <!-- Sunset Beach Background -->
    <rect width="400" height="400" fill="url(#sunset-sky)"/>
    <circle cx="200" cy="180" r="80" fill="#FDE047" opacity="0.35"/>
    <path d="M 0 250 Q 120 230 240 255 T 400 240 L 400 400 L 0 400 Z" fill="url(#ocean-wave)"/>
    <path d="M 0 270 Q 90 260 200 275 T 400 265 L 400 400 L 0 400 Z" fill="#0284C7" opacity="0.8"/>
    <path d="M 0 310 Q 150 290 280 320 T 400 300 L 400 400 L 0 400 Z" fill="#075985" opacity="0.9"/>
    
    <!-- Body in Black Shirt with relaxed outdoor posture -->
    <path d="M 50 400 C 50 310 110 270 200 270 C 290 270 350 310 350 400 Z" fill="#18181B"/>
    <path d="M 160 270 Q 200 290 240 270 Z" fill="#D98E4B"/>

    <!-- Neck -->
    <path d="M 172 220 L 172 275 Q 200 288 228 275 L 228 220 Z" fill="#D98E4B"/>

    <!-- Head & Face (Slight angle / energetic smile) -->
    <ellipse cx="200" cy="185" rx="63" ry="76" fill="url(#skin-rec)"/>

    <!-- Ears -->
    <ellipse cx="135" cy="190" rx="9" ry="17" fill="#D98E4B"/>
    <ellipse cx="265" cy="190" rx="9" ry="17" fill="#D98E4B"/>

    <!-- Stylish Wavy Dark Hair -->
    <path d="M 130 170 C 125 105 155 85 205 85 C 255 85 275 105 270 170 C 260 120 240 100 200 100 C 160 100 140 120 130 170 Z" fill="#18181B"/>
    <!-- Wavy volume on top -->
    <path d="M 145 120 Q 170 80 215 88 Q 255 92 268 130 C 250 105 220 95 180 102 Z" fill="#27272A"/>

    <!-- Eyebrows -->
    <path d="M 155 158 Q 175 150 188 156" stroke="#18181B" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M 212 156 Q 225 150 245 158" stroke="#18181B" stroke-width="4" stroke-linecap="round" fill="none"/>

    <!-- Cheerful Eyes looking towards viewer/side -->
    <ellipse cx="173" cy="172" rx="9" ry="6.5" fill="#FFFFFF"/>
    <circle cx="175" cy="172" r="4.2" fill="#1C1917"/>
    <circle cx="177" cy="170" r="1.5" fill="#FFFFFF"/>
    
    <ellipse cx="227" cy="172" rx="9" ry="6.5" fill="#FFFFFF"/>
    <circle cx="229" cy="172" r="4.2" fill="#1C1917"/>
    <circle cx="231" cy="170" r="1.5" fill="#FFFFFF"/>

    <!-- Nose -->
    <path d="M 202 165 Q 207 190 209 196 Q 202 200 195 196" stroke="#B45309" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Neat Mustache -->
    <path d="M 182 210 Q 200 204 218 210 Q 200 218 182 210 Z" fill="#18181B"/>

    <!-- Broad Happy Smile with Teeth -->
    <path d="M 180 220 Q 200 242 222 220 Z" fill="#991B1B"/>
    <path d="M 183 221 Q 200 234 219 221 Z" fill="#FFFFFF"/>
  </g>
</svg>
`)}`;

export const STUDENT_KARTIK_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="student-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="60%" stop-color="#CBD5E1"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <linearGradient id="sage-shirt" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A7C4AC"/>
      <stop offset="50%" stop-color="#88AC90"/>
      <stop offset="100%" stop-color="#6E9476"/>
    </linearGradient>
    <linearGradient id="skin-kartik" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7CFA0"/>
      <stop offset="100%" stop-color="#DEA568"/>
    </linearGradient>
    <clipPath id="circle-clip-kartik">
      <circle cx="200" cy="200" r="200"/>
    </clipPath>
  </defs>

  <g clip-path="url(#circle-clip-kartik)">
    <!-- Clean Modern Campus / Hall Background -->
    <rect width="400" height="400" fill="url(#student-bg)"/>
    <rect x="50" y="80" width="100" height="240" rx="8" fill="#F1F5F9" opacity="0.5"/>
    <rect x="250" y="60" width="120" height="260" rx="8" fill="#F8FAFC" opacity="0.4"/>
    <circle cx="340" cy="120" r="60" fill="#3B82F6" opacity="0.1"/>

    <!-- Shoulders with Sage Green Crewneck T-Shirt -->
    <path d="M 55 400 C 55 315 110 275 200 275 C 290 275 345 315 345 400 Z" fill="url(#sage-shirt)"/>
    <path d="M 160 275 Q 200 295 240 275 Z" fill="#DEA568"/>
    <path d="M 162 276 Q 200 298 238 276" stroke="#5E8366" stroke-width="4" fill="none"/>

    <!-- Neck -->
    <path d="M 174 220 L 174 280 Q 200 292 226 280 L 226 220 Z" fill="#DEA568"/>

    <!-- Head & Face (Youthful, friendly expression) -->
    <ellipse cx="200" cy="184" rx="63" ry="76" fill="url(#skin-kartik)"/>

    <!-- Ears -->
    <ellipse cx="135" cy="188" rx="9" ry="17" fill="#DEA568"/>
    <ellipse cx="265" cy="188" rx="9" ry="17" fill="#DEA568"/>

    <!-- Short Textured Dark Hair -->
    <path d="M 132 165 C 128 115 155 92 200 90 C 245 92 272 115 268 165 C 255 125 235 105 200 105 C 165 105 145 125 132 165 Z" fill="#1C1917"/>
    <path d="M 140 135 C 160 100 240 100 260 135 C 240 112 160 112 140 135 Z" fill="#292524"/>

    <!-- Soft Eyebrows -->
    <path d="M 158 158 Q 175 152 188 158" stroke="#1C1917" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M 212 158 Q 225 152 242 158" stroke="#1C1917" stroke-width="4" stroke-linecap="round" fill="none"/>

    <!-- Friendly Brown Eyes -->
    <ellipse cx="173" cy="172" rx="8.5" ry="6.5" fill="#FFFFFF"/>
    <circle cx="174" cy="172" r="4.2" fill="#27180D"/>
    <circle cx="176" cy="170" r="1.5" fill="#FFFFFF"/>
    
    <ellipse cx="227" cy="172" rx="8.5" ry="6.5" fill="#FFFFFF"/>
    <circle cx="226" cy="172" r="4.2" fill="#27180D"/>
    <circle cx="228" cy="170" r="1.5" fill="#FFFFFF"/>

    <!-- Nose -->
    <path d="M 200 166 Q 204 190 206 195 Q 200 199 194 195" stroke="#B45309" stroke-width="2.3" fill="none" stroke-linecap="round"/>

    <!-- Warm Genuine Student Smile -->
    <path d="M 180 216 Q 200 236 220 216 Z" fill="#991B1B"/>
    <path d="M 183 217 Q 200 228 217 217 Z" fill="#FFFFFF"/>
  </g>
</svg>
`)}`;

export const FACULTY_KOUSHIK_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="faculty-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D1FAE5"/>
      <stop offset="40%" stop-color="#A7F3D0"/>
      <stop offset="80%" stop-color="#6EE7B7"/>
      <stop offset="100%" stop-color="#34D399"/>
    </linearGradient>
    <pattern id="stripes" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
      <rect width="10" height="20" fill="#27272A"/>
      <rect x="10" width="10" height="20" fill="#71717A"/>
    </pattern>
    <linearGradient id="skin-koushik" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DEB07E"/>
      <stop offset="100%" stop-color="#C28B54"/>
    </linearGradient>
    <clipPath id="circle-clip-koushik">
      <circle cx="200" cy="200" r="200"/>
    </clipPath>
  </defs>

  <g clip-path="url(#circle-clip-koushik)">
    <!-- Outdoor Campus & Foliage Background -->
    <rect width="400" height="400" fill="url(#faculty-bg)"/>
    <!-- Soft blurred trees & architecture -->
    <circle cx="80" cy="140" r="90" fill="#059669" opacity="0.3"/>
    <circle cx="320" cy="120" r="110" fill="#047857" opacity="0.25"/>
    <rect x="120" y="60" width="160" height="200" fill="#F8FAFC" opacity="0.3" rx="10"/>

    <!-- Shoulders with Black & Grey Striped Collared Shirt -->
    <path d="M 50 400 C 50 315 110 270 200 270 C 290 270 350 315 350 400 Z" fill="url(#stripes)"/>
    
    <!-- Collar -->
    <path d="M 155 268 L 185 310 L 200 290 L 215 310 L 245 268 Z" fill="#27272A" stroke="#52525B" stroke-width="1.5"/>
    <path d="M 185 310 L 200 340 L 215 310 Z" fill="#C28B54"/>

    <!-- Neck -->
    <path d="M 172 215 L 172 275 Q 200 288 228 275 L 228 215 Z" fill="#C28B54"/>

    <!-- Head & Face -->
    <ellipse cx="200" cy="182" rx="63" ry="76" fill="url(#skin-koushik)"/>

    <!-- Ears -->
    <ellipse cx="134" cy="186" rx="9" ry="17" fill="#C28B54"/>
    <ellipse cx="266" cy="186" rx="9" ry="17" fill="#C28B54"/>

    <!-- Styled Dark Hair -->
    <path d="M 132 165 C 128 112 155 88 200 86 C 245 88 272 112 268 165 C 255 122 235 102 200 102 C 165 102 145 122 132 165 Z" fill="#18181B"/>
    <path d="M 142 130 C 160 95 240 95 258 130 C 238 110 162 110 142 130 Z" fill="#27272A"/>

    <!-- Defined Eyebrows -->
    <path d="M 156 156 Q 175 148 188 155" stroke="#18181B" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <path d="M 212 155 Q 225 148 244 156" stroke="#18181B" stroke-width="4.5" stroke-linecap="round" fill="none"/>

    <!-- Direct Confident Eyes -->
    <ellipse cx="173" cy="170" rx="9" ry="6.8" fill="#FFFFFF"/>
    <circle cx="174" cy="170" r="4.3" fill="#1C1917"/>
    <circle cx="176" cy="168" r="1.5" fill="#FFFFFF"/>
    
    <ellipse cx="227" cy="170" rx="9" ry="6.8" fill="#FFFFFF"/>
    <circle cx="226" cy="170" r="4.3" fill="#1C1917"/>
    <circle cx="228" cy="168" r="1.5" fill="#FFFFFF"/>

    <!-- Nose -->
    <path d="M 200 165 Q 205 188 207 194 Q 200 198 193 194" stroke="#9A3412" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <!-- Mustache & Light Stubble -->
    <path d="M 180 208 Q 200 202 220 208 Q 200 216 180 208 Z" fill="#18181B"/>
    <path d="M 188 232 Q 200 238 212 232 Q 200 242 188 232 Z" fill="#18181B" opacity="0.75"/>

    <!-- Gentle Academic Smile -->
    <path d="M 182 218 Q 200 232 218 218" stroke="#7C2D12" stroke-width="2.5" fill="none"/>
    <path d="M 185 218 Q 200 227 215 218 Z" fill="#FFFFFF"/>
  </g>
</svg>
`)}`;
