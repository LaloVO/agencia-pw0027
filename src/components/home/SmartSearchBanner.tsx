import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const SmartSearchBanner = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-20 px-5 bg-[#FAF6F0] dark:bg-[#09090B] overflow-hidden border-t border-black/5 dark:border-white/5">
      <div className="luxury-container" ref={ref}>
        
        {/* Banner container with liquid-glass popart framing */}
        <div 
          className={`relative overflow-hidden rounded-[36px] bg-gradient-to-r from-primary via-primary/90 to-[#EAB308]/90 text-white p-8 md:p-16 text-center shadow-elegant border-[6px] border-white dark:border-[#121214] transition-all duration-[1000ms] ${
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Radial light glows inside the card */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/10 rounded-full blur-3xl -z-10" />

          {/* 3D-feeling absolute elements */}
          <div className="absolute top-6 left-6 text-3xl select-none opacity-20 pointer-events-none animate-bounce hidden sm:block">🏡</div>
          <div className="absolute bottom-6 right-6 text-3xl select-none opacity-20 pointer-events-none animate-bounce hidden sm:block" style={{ animationDelay: '1s' }}>💖</div>

          <div className="max-w-3xl mx-auto flex flex-col items-center justify-center font-sans">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white mb-6 pt-4">
              ¡HAZ MATCH CON TU NUEVO HOGAR!
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-10 max-w-2xl">
              Completa nuestro formulario inteligente de 6 pasos. Cuéntame tu estilo de vida y subiré tus documentos directo al CRM para agilizar el proceso de compra o renta. Sin coincidencias al azar, solo opciones que te van a enamorar.
            </p>

            <Link
              to="/solicita-inmueble"
              className="flex items-center gap-2 bg-[#18181B] text-white hover:bg-black font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-[0_10px_20px_-5px_rgba(24,24,27,0.4)] hover:shadow-[0_15px_25px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Comenzar Búsqueda Inteligente</span>
              <ArrowRight className="w-5 h-5 shrink-0 animate-pulse" />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SmartSearchBanner;
