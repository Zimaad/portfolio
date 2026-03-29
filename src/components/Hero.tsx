export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center px-6 md:px-12"
      style={{ minHeight: '100dvh', background: 'transparent' }}
    >
      <div className="max-w-6xl mx-auto w-full pt-24">
        {/* Eyebrow */}
        <p
          className="text-muted mb-6 font-sans font-medium"
          style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
        >
          {/* EYEBROW — e.g. "Designer & Developer" or "Creative Engineer" */}
          Designer &amp; Developer
        </p>

        {/* Main heading */}
        <h1 className="font-serif text-ink leading-none tracking-tight mb-8 text-5xl sm:text-7xl md:text-8xl lg:text-[7rem]">
          {/* NAME — Replace with your name */}
          Zimaad Azhari
          <br />
          {/* TAGLINE — Replace with your tagline */}
          <span className="text-muted italic">Architecting and building scalable software.</span>
        </h1>

        {/* Short intro */}
        <p className="text-muted text-lg md:text-xl max-w-xl leading-relaxed font-light">
          I'm Zimaad, a Fullstack and AI developer building AI code visualization tools and high-performance applications that bridge software and finance.
        </p>
      </div>


    </section>
  );
}
