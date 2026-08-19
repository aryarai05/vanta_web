type HeroFallbackProps = {
  easterEgg: boolean;
};

export default function HeroFallback({ easterEgg }: HeroFallbackProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* central abstract shape */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-all duration-700"
        style={{
          width: 320,
          height: 320,
          background: easterEgg
            ? 'radial-gradient(circle, rgba(138,123,214,0.4) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(201,199,193,0.15) 0%, transparent 70%)',
        }}
      />
      {/* floating panel outlines */}
      <div className="absolute left-[15%] top-[25%] h-24 w-40 border border-vanta-border bg-vanta-surface/40 backdrop-blur-sm" />
      <div className="absolute right-[12%] top-[35%] h-32 w-28 border border-vanta-border bg-vanta-surface/40 backdrop-blur-sm" />
      <div className="absolute left-[22%] bottom-[20%] h-28 w-44 border border-vanta-border bg-vanta-surface/40 backdrop-blur-sm" />
      <div className="absolute right-[20%] bottom-[28%] h-20 w-36 border border-vanta-border bg-vanta-surface/40 backdrop-blur-sm" />
      <div className="absolute left-1/2 top-[12%] h-16 w-64 -translate-x-1/2 border border-vanta-border bg-vanta-surface/40 backdrop-blur-sm" />
    </div>
  );
}
