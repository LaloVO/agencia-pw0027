import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Bed, Bath, Square, Car, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProperty, formatPrice, actionLabel } from '@/lib/cbf';
import { useSiteUser } from '@/hooks/useSiteUser';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useSiteUser();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id!),
    enabled: !!id,
  });

  const rawPhone = user?.telefono_usuario?.replace(/\D/g, '') || '5210000000000';
  const whatsappMsg = property
    ? encodeURIComponent(`¡Hola Asesor Demo! Me interesa conocer la propiedad: "${property.nombre}" (ID: ${property.id}). ¿Podríamos agendar una visita?`)
    : '';
  const whatsappUrl = `https://wa.me/${rawPhone}?text=${whatsappMsg}`;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen bg-[#FAF6F0] dark:bg-[#09090B] px-6 md:px-12 luxury-container animate-pulse">
          <div className="h-8 bg-muted rounded-full w-1/3 mb-8" />
          <div className="aspect-video bg-muted rounded-[32px] mb-8" />
          <div className="h-10 bg-muted rounded-full w-1/2 mb-4" />
          <div className="h-4 bg-muted rounded-full w-1/3" />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <main className="pt-24 min-h-screen bg-[#FAF6F0] dark:bg-[#09090B] flex items-center justify-center">
          <div className="text-center font-sans">
            <span className="text-4xl block mb-4">🔍</span>
            <p className="text-2xl font-black text-[#18181B] dark:text-[#FAF6F0] mb-4">Propiedad no encontrada</p>
            <Link to="/mapa" className="text-sm font-bold text-primary underline hover:text-primary/95 transition-colors">
              Ver todas las propiedades
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const images = property.imagenes_propiedades ?? [];
  const mainImage = images[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop';
  
  const actionLabelStr = actionLabel(property.id_tipo_accion);
  const badgeEmoji = property.id_tipo_accion === 2 ? '🔑' : '🏡';
  const badgeText = `${badgeEmoji} En ${actionLabelStr}`;

  const location = [property.colonia, property.direccion].filter(Boolean).join(', ') || 'Querétaro';

  return (
    <>
      <Helmet>
        <title>{property.nombre} | Agencia</title>
        <meta name="description" content={property.descripcion ?? property.nombre} />
      </Helmet>

      <Navbar />

      <main className="pt-24 min-h-screen bg-[#FAF6F0] dark:bg-[#09090B]">
        {/* Back Link */}
        <div className="px-5 py-4 luxury-container">
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors font-sans"
          >
            <ArrowLeft className="w-4 h-4 text-primary" />
            <span>Volver al inventario</span>
          </Link>
        </div>

        {/* Dynamic Image Collage */}
        <div className="px-5 luxury-container mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-[32px] overflow-hidden border-[6px] border-white dark:border-[#121214] shadow-card bg-white dark:bg-black/20">
            <div className="aspect-[4/3] md:aspect-auto md:col-span-2 overflow-hidden">
              <img src={mainImage} alt={property.nombre} className="w-full h-full object-cover hover:scale-103 transition-transform duration-500" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
              {images.slice(1, 3).map((img, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden rounded-[20px]">
                  <img src={img.image_url} alt={`${property.nombre} ${i + 2}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
              {images.length < 3 && (
                <div className="aspect-[4/3] bg-primary/10 dark:bg-primary/20 flex flex-col items-center justify-center text-center p-4 rounded-[20px] border border-dashed border-primary/30">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse mb-2" />
                  <span className="font-accent text-lg text-primary font-bold">Agencia</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-5 luxury-container pb-24 font-sans">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Details Side */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3.5 py-1 bg-primary text-white text-xs font-sans font-extrabold rounded-full shadow-sm">
                  {badgeText}
                </span>
                {property.tipo && (
                  <span className="px-3 py-1 bg-black/5 dark:bg-white/5 text-[#18181B] dark:text-[#FAF6F0] text-xs font-sans font-bold rounded-full capitalize">
                    {property.tipo}
                  </span>
                )}
              </div>

              <h1 className="font-black text-3xl sm:text-4xl text-[#18181B] dark:text-[#FAF6F0] mb-4 tracking-tight leading-snug">
                {property.nombre}
              </h1>

              {location && (
                <p className="flex items-center gap-1.5 text-muted-foreground text-sm mb-8">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span>{location}</span>
                </p>
              )}

              {/* Stats Bento Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {property.habitaciones != null && (
                  <div className="bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/5 rounded-3xl p-5 text-center shadow-card hover:scale-102 transition-transform duration-300">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="font-black text-xl text-[#18181B] dark:text-[#FAF6F0]">{property.habitaciones}</p>
                    <p className="text-xs text-muted-foreground font-bold">Recámaras</p>
                  </div>
                )}
                {property.banios != null && (
                  <div className="bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/5 rounded-3xl p-5 text-center shadow-card hover:scale-102 transition-transform duration-300">
                    <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="font-black text-xl text-[#18181B] dark:text-[#FAF6F0]">{property.banios}</p>
                    <p className="text-xs text-muted-foreground font-bold">Baños</p>
                  </div>
                )}
                {property.area != null && (
                  <div className="bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/5 rounded-3xl p-5 text-center shadow-card hover:scale-102 transition-transform duration-300">
                    <Square className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="font-black text-xl text-[#18181B] dark:text-[#FAF6F0]">{property.area}</p>
                    <p className="text-xs text-muted-foreground font-bold">m² de Terreno</p>
                  </div>
                )}
                {property.estacionamientos != null && (
                  <div className="bg-white/60 dark:bg-black/20 border border-black/5 dark:border-white/5 rounded-3xl p-5 text-center shadow-card hover:scale-102 transition-transform duration-300">
                    <Car className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="font-black text-xl text-[#18181B] dark:text-[#FAF6F0]">{property.estacionamientos}</p>
                    <p className="text-xs text-muted-foreground font-bold">Cochera</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {property.descripcion && (
                <div className="bg-white/50 dark:bg-black/10 backdrop-blur-sm p-6 sm:p-8 rounded-[32px] border border-black/5 dark:border-white/5">
                  <h2 className="font-black text-xl text-[#18181B] dark:text-[#FAF6F0] mb-4 uppercase tracking-wider">Descripción</h2>
                  <p className="text-sm text-[#18181B]/80 dark:text-[#FAF6F0]/80 leading-relaxed whitespace-pre-line">
                    {property.descripcion}
                  </p>
                </div>
              )}
            </div>

            {/* Sticky Lead Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white dark:bg-[#121214] border border-black/5 dark:border-white/10 rounded-[32px] p-6 shadow-elegant pt-8">
                <p className="font-black text-3xl text-[#18181B] dark:text-[#FAF6F0] mb-1">{formatPrice(property.precio)}</p>
                <p className="text-xs text-muted-foreground mb-6">
                  {property.id_tipo_accion === 2 ? 'Renta por mes' : 'Precio de venta'}
                </p>

                {/* Profile Card Integration */}
                <div className="flex items-center gap-3.5 mb-6 pb-6 border-b border-black/5 dark:border-white/10">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-primary">
                    <img
                      src={user?.imagen_perfil_usuario || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'}
                      alt={user?.nombre_usuario || 'Asesor Demo'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#18181B] dark:text-[#FAF6F0]">{user?.nombre_usuario || 'Asesor Demo'}</p>
                    <p className="text-xs text-muted-foreground">Tu Guía y Matchmaker Inmobiliaria</p>
                  </div>
                </div>

                {/* Contact Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full font-black text-sm shadow-[0_4px_14px_rgba(37,211,102,0.3)] transition-all duration-300 hover:scale-103 active:scale-97"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span>Contactar por WhatsApp</span>
                </a>

                <div className="my-6 border-t border-black/5 dark:border-white/10" />

                {/* Búsqueda Inteligente Redirect Funnel */}
                <div className="space-y-4">
                  <h4 className="font-black text-base text-[#18181B] dark:text-[#FAF6F0] tracking-tight">¿QUIERES ALGO DIFERENTE?</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Si esta opción no se adapta al 100% a tu rutina diaria o etapa de vida, hagamos una búsqueda inteligente en 6 pasos.
                  </p>
                  
                  <Link
                    to="/solicita-inmueble"
                    className="flex items-center justify-center gap-1.5 w-full py-3.5 bg-primary/10 hover:bg-primary/20 text-primary border-2 border-primary/25 rounded-full font-black text-xs transition-all duration-300 hover:scale-103"
                  >
                    <Sparkles className="w-4 h-4 shrink-0 fill-primary/30" />
                    <span>Iniciar Búsqueda Inteligente</span>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PropertyDetail;
