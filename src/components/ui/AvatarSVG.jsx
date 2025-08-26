const AvatarSVG = ({ name, size = 40 }) => {
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-full shadow-md"
    >
      <defs>
        <linearGradient id="avatar-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#avatar-gradient)" />
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="42"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
      >
        {firstLetter}
      </text>
    </svg>
  );
};

export default AvatarSVG;
