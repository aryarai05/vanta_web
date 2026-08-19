import { useCustomCursor } from '@/hooks';

export default function CustomCursor() {
  const { outerCursorRef, innerCursorRef, labelRef } = useCustomCursor();

  return (
    <>
      <div
        ref={outerCursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 flex items-center justify-center rounded-full border border-vanta-bone/50 mix-blend-difference transition-[transform,background-color,border-radius,width,height,padding] duration-300 ease-out md:flex opacity-0"
        style={{ willChange: 'transform' }}
      >
        <span
          ref={labelRef}
          className="text-[0.5rem] font-medium uppercase tracking-widest2 text-vanta-bone empty:hidden"
        />
      </div>
      <div
        ref={innerCursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden h-2 w-2 rounded-full bg-vanta-bone mix-blend-difference transition-[transform,opacity] duration-200 ease-out md:block opacity-0"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
