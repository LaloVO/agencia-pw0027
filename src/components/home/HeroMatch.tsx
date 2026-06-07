import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Heart, X, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/lib/cbf';

const HeroMatch = () => {
  const navigate = useNavigate();
  const { user, site } = useSiteUser();
  const { properties, isLoading } = useProperties({ limit: 12 });
  const mapboxToken = (site?.platform_config?.mapbox_token ?? '').trim();

  // Search States
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [operationType, setOperationType] = useState('venta');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Swipe Deck States
  const [deckIndex, setDeckIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const operacionMap: Record<string, string> = {
    venta: 'venta',
    renta: 'renta',
    preventa: 'preventa',
  };

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mapbox Geocoding Debounce (300ms)
  useEffect(() => {
    if (!location.trim() || !mapboxToken) {
      setSuggestions([]);
      return;
    }
    if (selectedCoords && location === selectedCoords.name) return;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxToken}&limit=5&types=neighborhood,locality,place,address&country=mx,us`
        );
        if (res.ok) {
          const d = await res.json();
          setSuggestions(d.features ?? []);
          setShowSuggestions(true);
        }
      } catch (_) {}
    }, 300);

    return () => clearTimeout(timer);
  }, [location, mapboxToken, selectedCoords]);

  const handleSuggestionClick = (feat: any) => {
    const [lng, lat] = feat.center;
    const name = feat.place_name;
    setLocation(name);
    setSelectedCoords({ lat, lng, name });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (location) params.set('ubicacion', location);
    if (propertyType) params.set('tipo', propertyType);
    params.set('operacion', operacionMap[operationType] || 'venta');

    if (selectedCoords) {
      params.set('lat', String(selectedCoords.lat));
      params.set('lng', String(selectedCoords.lng));
    } else if (location.trim() && mapboxToken) {
      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${mapboxToken}&limit=1&country=mx,us`
        );
        if (res.ok) {
          const d = await res.json();
          const f = d.features?.[0];
          if (f) {
            const [lng, lat] = f.center;
            params.set('lat', String(lat));
            params.set('lng', String(lng));
          }
        }
      } catch (_) {}
    }
    navigate(`/mapa?${params.toString()}`);
  };

  // Tinder Swipe Handlers
  const handleSwipe = (direction: 'left' | 'right') => {
    if (isLoading || properties.length === 0) return;
    setSwipeDirection(direction);

    setTimeout(() => {
      if (direction === 'right') {
        // Redirige a SolicitaInmueble con datos prellenados de la propiedad
        const currentProp = properties[deckIndex % properties.length];
        navigate(`/solicita-inmueble?prop_id=${currentProp.id}&tipo_prop=${currentProp.tipo?.toLowerCase()}`);
      } else {
        // Pasa a la siguiente tarjeta en el deck
        setDeckIndex((prev) => prev + 1);
        setSwipeDirection(null);
      }
    }, 450);
  };

  const activeProperty = properties && properties.length > 0 ? properties[deckIndex % properties.length] : null;
  const nextProperty = properties && properties.length > 0 ? properties[(deckIndex + 1) % properties.length] : null;

  // Fallback Profile Pic (elegant caricature/pop-art look)
  const profilePic = user?.imagen_perfil_usuario || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop';

  return (
    <section className="relative min-h-screen w-full pt-[88px] pb-16 flex flex-col justify-between overflow-hidden bg-[#FAF6F0] dark:bg-[#09090B]">
      {/* Background Decorative Emojis & Light Auras */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#EAB308]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Floating Emojis */}
      <div className="absolute top-24 left-[15%] text-4xl animate-float select-none opacity-40 pointer-events-none hidden lg:block">🏡</div>
      <div className="absolute top-[40%] right-[10%] text-4xl animate-float select-none opacity-40 pointer-events-none hidden lg:block" style={{ animationDelay: '2s' }}>🔑</div>
      <div className="absolute bottom-36 left-[8%] text-4xl animate-float select-none opacity-40 pointer-events-none hidden lg:block" style={{ animationDelay: '4s' }}>✨</div>

      <div className="luxury-container flex-1 flex flex-col justify-center gap-12 lg:gap-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* LADO IZQUIERDO: POP-ART BRANDING STICKER */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start text-left relative pt-4">
            <h1 className="font-sans font-black text-4xl sm:text-5xl xl:text-6xl tracking-tight leading-[1.05] text-[#18181B] dark:text-[#FAF6F0] mb-6">
              ¿SWIPE RIGHT <br />
              A UNA CASA QUE SE <br />
              <span className="relative inline-block text-primary italic transform rotate-[-1.5deg]">
                SIENTE COMO TÚ?
                {/* Yellow CSS under-brush line */}
                <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-[#EAB308]/40 -z-10 rounded-full" />
              </span>
            </h1>

            <p className="font-sans text-base md:text-lg text-[#18181B]/80 dark:text-[#FAF6F0]/80 leading-relaxed max-w-lg mb-8">
              No todo lo que se ve bien en fotos hace match contigo. Por eso estoy aquí: para ayudarte a encontrar ese lugar único donde sí haces clic. Sin volumen de opciones, solo <span className="font-bold underline decoration-primary decoration-2 underline-offset-4">decisiones con intención</span>.
            </p>

            {/* Sticker portrait overlap */}
            <div className="flex items-center gap-4 bg-white/80 dark:bg-black/40 backdrop-blur-md p-3.5 rounded-3xl border border-black/5 shadow-card hover:scale-102 transition-transform duration-300">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-primary">
                <img src={profilePic} alt="Asesor Demo" className="w-full h-full object-cover" />
              </div>
              <div className="font-sans">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#18181B] dark:text-[#FAF6F0] text-sm">Asesor Demo</span>
                  <CheckCircle2 className="w-3.5 h-3.5 fill-primary text-white" />
                </div>
                <span className="text-xs text-muted-foreground">Tu Guía y Estratega Inmobiliario</span>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: INTERACTIVE TINDER-STYLE SWIPE DECK */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[340px] aspect-[3/4] flex items-center justify-center">
              {isLoading ? (
                <div className="w-full h-full bg-white/50 dark:bg-black/30 border border-black/5 backdrop-blur-md rounded-[32px] flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="font-sans text-xs text-muted-foreground">Buscando casas ideales...</span>
                </div>
              ) : activeProperty ? (
                <>
                  {/* NEXT CARD (Background visual element) */}
                  {nextProperty && (
                    <div className="absolute inset-0 w-full h-full bg-white dark:bg-[#121214] border border-black/5 dark:border-white/5 rounded-[32px] shadow-card scale-93 translate-y-3 opacity-60 -z-10 pointer-events-none overflow-hidden">
                      <img 
                        src={nextProperty.imagenes_propiedades?.[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop'} 
                        alt="Siguiente propiedad" 
                        className="w-full h-48 object-cover opacity-80"
                      />
                      <div className="p-5 font-sans">
                        <div className="w-24 h-4 bg-muted rounded-full mb-3" />
                        <div className="w-full h-6 bg-muted rounded-full" />
                      </div>
                    </div>
                  )}

                  {/* ACTIVE CARD */}
                  <div 
                    className={`absolute inset-0 w-full h-full bg-white dark:bg-[#121214] border border-black/5 dark:border-white/10 rounded-[32px] shadow-elegant overflow-hidden flex flex-col justify-between transition-all duration-500 ease-out select-none ${
                      swipeDirection === 'left' 
                        ? 'translate-x-[-150%] rotate-[-20deg] opacity-0 scale-90' 
                        : swipeDirection === 'right' 
                        ? 'translate-x-[150%] rotate-[20deg] opacity-0 scale-90' 
                        : 'scale-100 rotate-0'
                    }`}
                  >
                    {/* Visual swipe indicator overlays */}
                    {swipeDirection === 'right' && (
                      <div className="absolute inset-0 bg-[#25D366]/20 backdrop-blur-xs flex items-center justify-center z-20 transition-all duration-300">
                        <div className="border-[6px] border-[#25D366] text-[#25D366] font-sans font-black text-4xl px-8 py-3 rounded-2xl transform rotate-[12deg] uppercase">
                          MATCH ❤️
                        </div>
                      </div>
                    )}
                    {swipeDirection === 'left' && (
                      <div className="absolute inset-0 bg-red-500/20 backdrop-blur-xs flex items-center justify-center z-20 transition-all duration-300">
                        <div className="border-[6px] border-red-500 text-red-500 font-sans font-black text-4xl px-8 py-3 rounded-2xl transform rotate-[-12deg] uppercase">
                          NEXT 🚫
                        </div>
                      </div>
                    )}

                    <div className="relative w-full h-56 overflow-hidden">
                      <img 
                        src={activeProperty.imagenes_propiedades?.[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop'} 
                        alt={activeProperty.nombre} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1 bg-white/95 dark:bg-[#18181B]/95 text-[#18181B] dark:text-white font-sans font-extrabold text-xs rounded-full shadow-md border border-black/5">
                          {activeProperty.id_tipo_accion === 2 ? '🔑 RENTA' : '🏡 VENTA'}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-primary text-white font-sans font-black text-base px-3.5 py-1 rounded-full shadow-md">
                        {formatPrice(activeProperty.precio)}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between font-sans">
                      <div>
                        <h3 className="font-extrabold text-lg text-[#18181B] dark:text-[#FAF6F0] tracking-tight leading-snug line-clamp-1 mb-1.5">
                          {activeProperty.nombre}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-3">
                          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate">{location}</span>
                        </p>
                      </div>

                      {/* Compact Stats */}
                      <div className="flex gap-3 text-[11px] font-bold text-[#18181B]/80 dark:text-[#FAF6F0]/80 bg-black/5 dark:bg-white/5 p-2 rounded-2xl w-full justify-around mb-4">
                        {activeProperty.habitaciones != null && (
                          <span>🛏️ {activeProperty.habitaciones} {activeProperty.habitaciones === 1 ? 'Hab' : 'Habs'}</span>
                        )}
                        {activeProperty.banios != null && (
                          <span>🚿 {activeProperty.banios} {activeProperty.banios === 1 ? 'Baño' : 'Baños'}</span>
                        )}
                        {activeProperty.area != null && (
                          <span>📐 {activeProperty.area}m²</span>
                        )}
                      </div>

                      {/* Tinder Swipe Buttons */}
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleSwipe('left')}
                          className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-[#1C1917] flex items-center justify-center hover:bg-red-500 hover:text-white dark:hover:bg-red-950 transition-all duration-300 shadow-sm hover:scale-110"
                          aria-label="Dislike"
                        >
                          <X className="w-5 h-5 text-red-500 hover:text-white" />
                        </button>
                        
                        <button
                          onClick={() => handleSwipe('right')}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white font-extrabold text-sm py-3 rounded-full hover:bg-primary/95 transition-all duration-300 shadow-md hover:scale-105"
                          aria-label="Like"
                        >
                          <Heart className="w-4 h-4 fill-white animate-pulse" />
                          <span>Me interesa</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-white dark:bg-black/30 border border-black/5 backdrop-blur-md rounded-[32px] flex items-center justify-center">
                  <span className="font-sans text-xs text-muted-foreground">No hay propiedades disponibles.</span>
                </div>
              )}
            </div>
            
            <p className="text-[11px] text-muted-foreground italic font-sans mt-3.5">
              💡 Desliza para recibir opciones a tu medida.
            </p>
          </div>

        </div>
      </div>

      {/* SEARCH BAR (Buscador horizontal inferior) */}
      <div className="w-full max-w-5xl mx-auto px-5 mt-10 md:mt-6 z-30">
        <div className="bg-white dark:bg-[#121214] border border-black/5 dark:border-white/10 shadow-elegant rounded-[32px] p-3 md:p-2.5 flex flex-col md:flex-row items-center gap-3 w-full">
          
          {/* Autocomplete Input */}
          <div className="relative flex-1 w-full flex items-center gap-2 px-3 border-b md:border-b-0 md:border-r border-black/5 dark:border-white/10" ref={suggestionsRef}>
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setSelectedCoords(null);
              }}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              placeholder="Ubicación (ej. Querétaro)..."
              autoComplete="off"
              className="w-full py-3 bg-transparent text-sm text-[#18181B] dark:text-[#FAF6F0] focus:outline-none placeholder:text-muted-foreground"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute top-[110%] left-0 right-0 mt-1 bg-white dark:bg-[#121214] border border-black/5 dark:border-white/10 rounded-2xl z-55 shadow-2xl overflow-hidden">
                {suggestions.map((feat) => (
                  <li
                    key={feat.id}
                    onMouseDown={() => handleSuggestionClick(feat)}
                    className="px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-xs sm:text-sm text-[#18181B] dark:text-[#FAF6F0] truncate border-b border-black/5 last:border-b-0"
                  >
                    {feat.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Select Tipo de Propiedad */}
          <div className="w-full md:w-48 px-3 border-b md:border-b-0 md:border-r border-black/5 dark:border-white/10">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full py-3 bg-transparent text-sm text-[#18181B] dark:text-[#FAF6F0] focus:outline-none cursor-pointer"
            >
              <option value="">Tipo de Propiedad</option>
              <option value="casa">Casa 🏡</option>
              <option value="departamento">Departamento 🏢</option>
              <option value="terreno">Terreno 🏞️</option>
              <option value="oficina">Oficina 💼</option>
              <option value="local">Local Comercial 🏪</option>
            </select>
          </div>

          {/* Select Operación */}
          <div className="w-full md:w-40 px-3">
            <select
              value={operationType}
              onChange={(e) => setOperationType(e.target.value)}
              className="w-full py-3 bg-transparent text-sm text-[#18181B] dark:text-[#FAF6F0] focus:outline-none cursor-pointer"
            >
              <option value="venta">Comprar</option>
              <option value="renta">Rentar</option>
              <option value="preventa">Pre-Venta</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-white font-extrabold text-sm px-8 py-3.5 md:py-3.5 rounded-full hover:bg-primary/95 shadow-md hover:scale-103 transition-all duration-300"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span>Buscar</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroMatch;
