// src/components/LogoNRC.jsx
import React from 'react';

/**
 * LogoNRC
 * SVG-based logo built to visually match the provided image.
 *
 * - Colors:
 *   gold:   #C9A04F
 *   cyan:   #6DEAFF
 *   black:  #0b0b0b
 *
 * - If you want exact font matching:
 *   Add the Arabic font (e.g. 'Tajawal' or the specific font used in the image)
 *   and a custom italic font for 'NRC'. See notes below.
 */
export default function LogoNRC({ className = '', size = 220 }) {
  const gold = '#C9A04F';
  const cyan = '#6DEAFF';
  const black = '#0b0b0b';

  // SVG scales with `size` prop, default 220 (px)
  return (
    <div className={className} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 500 500"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="NRC Logo"
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="8"
              floodColor="#000"
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        {/* White background is intentionally omitted so SVG is transparent by default */}
        <g transform="translate(40,40)">
          {/* ---- Building stripes - layered from top to bottom ---- */}
          {/* For each stripe we draw two strokes:
                - a thicker gold stroke (rounded joins)
                - an inner thinner cyan stroke with a small gap to create the look */}

          {/* stripe 1 (top) */}
          <g strokeLinecap="butt" strokeLinejoin="round" filter="url(#shadow)">
            <path
              d="M10 10 L120 0 L240 10 L360 0"
              fill="none"
              stroke={gold}
              strokeWidth="16"
            />
            <path
              d="M22 16 L120 8 L230 16 L348 8"
              fill="none"
              stroke={cyan}
              strokeWidth="10"
            />
          </g>

          {/* stripe 2 */}
          <g strokeLinecap="butt" strokeLinejoin="round">
            <path
              d="M10 44 L120 34 L240 44 L360 34"
              fill="none"
              stroke={gold}
              strokeWidth="16"
            />
            <path
              d="M22 50 L120 40 L230 50 L348 40"
              fill="none"
              stroke={cyan}
              strokeWidth="10"
            />
          </g>

          {/* stripe 3 */}
          <g strokeLinecap="butt" strokeLinejoin="round">
            <path
              d="M10 88 L120 68 L240 88 L360 68"
              fill="none"
              stroke={gold}
              strokeWidth="16"
            />
            <path
              d="M22 96 L120 78 L230 96 L348 78"
              fill="none"
              stroke={cyan}
              strokeWidth="10"
            />
          </g>

          {/* stripe 4 */}
          <g strokeLinecap="butt" strokeLinejoin="round">
            <path
              d="M10 124 L120 104 L240 124 L360 104"
              fill="none"
              stroke={gold}
              strokeWidth="16"
            />
            <path
              d="M22 132 L120 112 L230 132 L348 112"
              fill="none"
              stroke={cyan}
              strokeWidth="10"
            />
          </g>

          {/* stripe 5 */}
          <g strokeLinecap="butt" strokeLinejoin="round">
            <path
              d="M10 168 L120 148 L240 168 L360 148"
              fill="none"
              stroke={gold}
              strokeWidth="16"
            />
            <path
              d="M22 176 L120 156 L230 176 L348 156"
              fill="none"
              stroke={cyan}
              strokeWidth="10"
            />
          </g>

          {/* bottom solid gold base */}
          <rect x="8" y="196" width="352" height="12" fill={gold} rx="2" />

          {/* slight inner gold detail under base to match original */}
          <rect x="40" y="212" width="268" height="8" fill={gold} rx="2" />
        </g>

        {/* ---- "N R C" text in italic gold (centered) ---- */}
        <g transform="translate(0,270)">
          <text
            x="50%"
            y="30"
            textAnchor="middle"
            style={{
              fontFamily: "'Trebuchet MS', 'Segoe UI', Tahoma, sans-serif",
              fontWeight: 800,
              fontStyle: 'italic',
              fontSize: 56,
              letterSpacing: 6,
              fill: gold,
            }}
          >
            NRC
          </text>
        </g>

        {/* ---- Arabic company name + cyan vertical bar on the right ---- */}
        <g transform="translate(0,330)">
          {/* Arabic text */}
          <text
            x="50%"
            y="38"
            textAnchor="middle"
            style={{
              fontFamily:
                "'Tajawal', 'Noto Naskh Arabic', 'Segoe UI', sans-serif",
              fontWeight: 600,
              fontSize: 28,
              fill: black,
            }}
          >
            شركة نجم راش
          </text>

          {/* cyan vertical bar to the right */}
          <rect x="380" y="4" width="12" height="36" rx="2" fill={cyan} />
        </g>
      </svg>
    </div>
  );
}
