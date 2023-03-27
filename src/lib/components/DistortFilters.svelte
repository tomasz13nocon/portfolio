<svg width="0" height="0">
  <defs>
    <filter
      id="distort"
      color-interpolation-filters="sRGB"
      x="0%"
      y="0%"
      height="100%"
      width="100%"
    >
      <feTurbulence type="turbulence" baseFrequency=".105" numOctaves="5" seed="24" />

      <feColorMatrix type="hueRotate" values="0" />

      <feDisplacementMap in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G" />
    </filter>

    <filter
      id="distort-text"
      color-interpolation-filters="sRGB"
      x="0%"
      y="0%"
      height="100%"
      width="100%"
    >
      <feTurbulence type="turbulence" baseFrequency=".052" numOctaves="5" seed="24" />

      <feColorMatrix type="hueRotate" values="0">
        <animate attributeName="values" from="0" to="360" dur="5s" repeatCount="indefinite" />
      </feColorMatrix>

      <feColorMatrix type="matrix" values="3 0 0 0 -1 3 0 0 0 -1 3 0 0 0 -1 1 0 0 0 0" />

      <feGaussianBlur stdDeviation="3" />

      <feDisplacementMap in="SourceGraphic" scale="6" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>
