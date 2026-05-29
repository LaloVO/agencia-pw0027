import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const SkeletonCard = () => (
  <div className="min-w-[85vw] md:min-w-[40vw] animate-pulse snap-center bg-white/40 dark:bg-black/20 p-4 border border-black/5 rounded-[32px]">
    <div className="aspect-[4/3] mb-5 rounded-[24px] bg-muted" />
    <div className="h-6 bg-muted rounded-full w-3/4 mb-2" />
    <div className="h-4 bg-muted rounded-full w-1/2" />
  </div>
);

const PropertiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { properties, isLoading } = useProperties({ limit: 8 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#FAF6F0] dark:bg-[#09090B] overflow-hidden">
      <div className="px-5 mb-14 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 luxury-container font-sans">
        <div>
          <span className="font-accent text-3xl text-primary font-bold inline-block mb-2 rotate-[-2deg]">
            Mis Recomendaciones
          </span>
          <h2
            className={`font-black text-3xl sm:text-4xl text-[#18181B] dark:text-[#FAF6F0] transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            PROPIEDADES QUE HACEN MATCH
          </h2>
        </div>
        <Link
          to="/mapa"
          className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#18181B] dark:text-[#FAF6F0] border-b-2 border-primary pb-1 hover:text-primary transition-all ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span>Ver todo el Inventario</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-6 px-5 pb-10 snap-x hide-scrollbar luxury-container">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : properties.length === 0 ? (
              <div className="w-full text-center py-10 font-sans text-muted-foreground text-sm">
                No se encontraron propiedades en Querétaro en este momento.
              </div>
            ) : (
              properties.map((property, index) => (
                <div
                  key={property.id}
                  className={`min-w-[80vw] sm:min-w-[45vw] lg:min-w-[32vw] snap-center transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))
            )}
      </div>

      <div className="px-5 md:hidden mt-4 text-center">
        <Link
          to="/mapa"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#18181B] dark:text-[#FAF6F0] border-b-2 border-primary pb-1"
        >
          <span>Ver todo el Inventario</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default PropertiesSection;
