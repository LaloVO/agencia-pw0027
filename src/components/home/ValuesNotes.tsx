import { useEffect, useRef, useState } from 'react';
import { Sparkles, HelpCircle, HeartHandshake, Eye } from 'lucide-react';

const ValuesNotes = () => {
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

  const values = [
    {
      icon: <HeartHandshake className="w-8 h-8 text-primary" />,
      title: "Te escucho (de verdad)",
      desc: "Antes de hablar de propiedades, quiero entender qué etapa estás viviendo y qué tipo de espacio realmente necesitas. Esta base nos permite tomar decisiones más rápidas, más acertadas y sin perder tu tiempo.",
      rotate: "rotate-[-1.5deg] hover:rotate-[1deg]",
      color: "bg-white/80 dark:bg-black/35",
      sticker: "💡",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-[#EAB308]" />,
      title: "Solo lo que importa",
      desc: "No trabajo con volumen, trabajo con intención. Cada opción que te comparto ha sido cuidadosamente filtrada para asegurarnos de que podría ser para ti, evitando mostrarte opciones sin sentido.",
      rotate: "rotate-[2deg] hover:rotate-[-0.5deg]",
      color: "bg-white/80 dark:bg-black/35",
      sticker: "⚡",
    },
    {
      icon: <Eye className="w-8 h-8 text-[#3B82F6]" />,
      title: "Claridad, no solo opciones",
      desc: "Te diré lo que sí conviene... y lo que no. Comparto contigo el panorama completo: desde el valor real hasta su proyección, ubicación y potencial. Así, puedes elegir con certeza y total confianza.",
      rotate: "rotate-[-1deg] hover:rotate-[-2.5deg]",
      color: "bg-white/80 dark:bg-black/35",
      sticker: "🎯",
    },
  ];

  return (
    <section className="relative py-24 bg-[#FAF6F0] dark:bg-[#09090B] overflow-hidden border-t border-black/5 dark:border-white/5">
      {/* Decorative dots grid representing corkboard */}
      <div className="absolute inset-0 bg-[radial-gradient(#18181b_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="luxury-container">
        
        {/* Editorial Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 font-sans">
          <h2 className="text-3xl sm:text-4xl font-black text-[#18181B] dark:text-[#FAF6F0] tracking-tight leading-tight pt-4">
            NUESTRA FILOSOFÍA DE MATCHMAKING
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* 3-Column Note Grid */}
        <div 
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-6 transition-all duration-[1000ms] ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {values.map((val, idx) => (
            <div
              key={idx}
              className={`tape-3d ${val.rotate} ${val.color} backdrop-blur-md p-8 rounded-3xl border border-black/5 dark:border-white/10 shadow-card hover:shadow-elegant transition-all duration-500 hover:scale-[1.03] flex flex-col justify-between aspect-[1/1.05] relative`}
            >
              {/* Paper sticker pin */}
              <div className="absolute top-4 right-4 text-2xl select-none filter drop-shadow-sm">
                {val.sticker}
              </div>

              <div className="flex flex-col gap-5 pt-2">
                <div className="p-3 bg-primary/10 dark:bg-primary/20 rounded-2xl w-fit">
                  {val.icon}
                </div>
                <h3 className="font-sans font-black text-xl text-[#18181B] dark:text-[#FAF6F0] tracking-tight">
                  {val.title}
                </h3>
                <p className="font-sans text-sm text-[#18181B]/75 dark:text-[#FAF6F0]/75 leading-relaxed">
                  {val.desc}
                </p>
              </div>

              {/* Handwriting index marker */}
              <span className="font-accent text-3xl text-[#18181B]/20 dark:text-white/10 font-bold self-end select-none">
                0{idx + 1}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ValuesNotes;
