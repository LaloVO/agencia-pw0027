import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="relative w-full h-screen overflow-hidden flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-[120%] bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop')`,
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        />
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full luxury-container">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-luxury-white leading-[1.1] mb-8 md:mb-12 drop-shadow-lg">
          <span
            className={`block transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            Inteligencia
          </span>
          <span
            className={`block italic font-light ml-0 md:ml-20 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            que habita.
          </span>
        </h1>

        {/* Search Bar */}
        <div
          className={`bg-luxury-white/10 backdrop-blur-md border border-luxury-white/20 p-2 md:p-3 rounded-full flex flex-col md:flex-row gap-2 max-w-3xl transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          <div className="flex-1 flex items-center bg-luxury-white rounded-full px-6 py-4 md:py-3">
            <Search className="w-5 h-5 text-muted-foreground mr-3" />
            <input
              type="text"
              placeholder="Ciudad, Zona o Código Postal"
              className="bg-transparent w-full outline-none text-foreground placeholder-muted-foreground font-sans text-sm md:text-base"
            />
          </div>
          <button className="px-8 py-3 rounded-full bg-foreground text-background font-sans uppercase text-xs tracking-widest hover:bg-primary transition-colors duration-300">
            Buscar
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
