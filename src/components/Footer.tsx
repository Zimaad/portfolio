export default function Footer() {
  return (
    <footer className="w-full px-10 py-12 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-neutral-800/20 bg-[#131313]">
      <div className="flex flex-col items-center md:items-start gap-4">
        <div className="text-lg font-bold cormorant text-neutral-50 uppercase tracking-widest">ZIMAAD</div>
        <p className="manrope text-[11px] text-neutral-500 geist text-center md:text-left">© 2026 ZIMAAD — CRAFTED WITH INTENT</p>
      </div>
      <div className="flex gap-12 mt-8 md:mt-0 justify-center">
        <a className="geist text-[10px] tracking-[0.2em] text-neutral-500 hover:underline hover:decoration-4 transition-all duration-300" href="https://github.com/Zimaad">GITHUB</a>
        <a className="geist text-[10px] tracking-[0.2em] text-neutral-500 hover:underline hover:decoration-4 transition-all duration-300" href="https://linkedin.com/in/zimaad">LINKEDIN</a>
        <a className="geist text-[10px] tracking-[0.2em] text-neutral-500 hover:underline hover:decoration-4 transition-all duration-300" href="/resume.pdf" target="_blank" rel="noopener noreferrer">READCV</a>
      </div>
    </footer>
  );
}
