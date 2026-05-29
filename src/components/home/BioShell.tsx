import { useEffect, useRef, useState } from 'react';
import { useSiteUser } from '@/hooks/useSiteUser';
import { MessageCircle, Heart, CheckCircle2 } from 'lucide-react';

const BioShell = () => {
  const { user } = useSiteUser();
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

  const rawPhone = user?.telefono_usuario?.replace(/\D/g, '') || '4461017693';
  const whatsappMsg = encodeURIComponent("¡Hola Martha! Vi tu perfil de Matchmaker y me gustaría agendar un recorrido personalizado.");
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${whatsappMsg}`;

  // Real profile pic from CRM or Unsplash fallback
  const profilePic = user?.imagen_perfil_usuario || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop';

  return (
    <section className="relative py-24 bg-[#FAF6F0] dark:bg-[#09090B] overflow-hidden border-t border-black/5 dark:border-white/5">
      {/* Decorative auras */}
      <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#EAB308]/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse" />

      <div className="luxury-container" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LADO IZQUIERDO: STICKER CUTOUT RETRATO */}
          <div 
            className={`lg:col-span-5 flex justify-center relative transition-all duration-[1000ms] ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            {/* White-border popart-sticker container */}
            <div className="relative w-full max-w-[340px] aspect-[4/5] popart-sticker overflow-hidden bg-gradient-to-tr from-primary/20 via-transparent to-[#EAB308]/20">
              <img 
                src={profilePic} 
                alt="Martha Match en Sillón Naranja" 
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" 
              />
              {/* Sticker overlay hearts badge */}
              <div className="absolute bottom-5 left-5 bg-white dark:bg-[#18181B] px-3.5 py-1.5 rounded-2xl shadow-md border border-black/5 flex items-center gap-1">
                <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" />
                <span className="font-sans font-bold text-xs text-[#18181B] dark:text-[#FAF6F0]">Matchmaker</span>
              </div>
            </div>

            {/* Behind sticker decor element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#EAB308]/20 rounded-full -z-10 blur-xl animate-pulse" />
          </div>

          {/* LADO DERECHO: TEXTO EDITORIAL POP-ART */}
          <div 
            className={`lg:col-span-7 flex flex-col justify-center items-start text-left transition-all duration-[1000ms] delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-2 mb-6 pt-4">
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#18181B] dark:text-[#FAF6F0] tracking-tight leading-none">
                SOY MARTHA MATCH
              </h2>
              <CheckCircle2 className="w-6 h-6 fill-primary text-white shrink-0" />
            </div>

            <h3 className="font-sans font-bold text-lg text-primary uppercase tracking-widest mb-6">
              Guía, Matchmaker y Estratega Inmobiliaria
            </h3>

            <div className="font-sans text-base text-[#18181B]/80 dark:text-[#FAF6F0]/80 leading-relaxed mb-6 space-y-4">
              <p>
                Asesora inmobiliaria en Querétaro y tu aliada perfecta para encontrar la casa que realmente hace match contigo. ¿Mi especialidad? Traducir lo que quieres (aunque aún no lo sepas) en espacios que sí se sienten como tú.
              </p>
              <p>
                Desde el *“¿y ahora qué hago?”* hasta el *“aquí quiero vivir”*, te acompaño paso a paso, de forma honesta, cercana, sin presiones ni discursos corporativos complicados.
              </p>
              <p className="font-bold text-[#18181B] dark:text-[#FAF6F0] italic">
                “Encontrar el lugar correcto no se trata solo de elegir… se trata de sentir seguridad en cada paso.”
              </p>
            </div>

            {/* Handwritten Caveat highlight */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white hover:bg-[#20ba5a] font-extrabold text-sm px-6 py-3.5 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.3)] hover:scale-103 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span>Agendar Recorrido con Martha</span>
              </a>

              <div className="font-sans">
                <span className="block text-xs text-muted-foreground uppercase tracking-widest font-semibold">Firma del Matchmaker</span>
                <span className="font-accent text-3xl text-primary font-bold inline-block rotate-[-5deg] ml-1">
                  Martha Match
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BioShell;
