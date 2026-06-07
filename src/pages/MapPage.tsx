import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Map, List, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import PropertyFilters, { Filters, DEFAULT_FILTERS } from '@/components/map/PropertyFilters';
import PropertyMap from '@/components/map/PropertyMap';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';
import { useSiteUser } from '@/hooks/useSiteUser';

const MapPage = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const { properties, isLoading } = useProperties({ limit: 100 });
  const { site } = useSiteUser();

  const mapboxToken = site?.platform_config?.mapbox_token ?? '';

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.priceRange[0] > 0 && p.precio < filters.priceRange[0]) return false;
      if (filters.priceRange[1] < 500_000_000 && p.precio > filters.priceRange[1]) return false;
      if (filters.types.length > 0) {
        const tipo = (p.tipo ?? '').toLowerCase();
        if (!filters.types.some((t) => tipo.includes(t))) return false;
      }
      if (filters.bedrooms !== null && (p.habitaciones ?? 0) < filters.bedrooms) return false;
      return true;
    });
  }, [properties, filters]);

  const mapProperties = useMemo(
    () =>
      filtered
        .filter((p) => p.latitud != null && p.longitud != null)
        .map((p) => ({
          id: p.id,
          title: p.nombre,
          location: p.colonia ?? '',
          area: p.colonia ?? '',
          price: new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            maximumFractionDigits: 0,
          }).format(p.precio),
          priceValue: p.precio,
          image: p.imagenes_propiedades?.[0]?.image_url ?? '',
          bedrooms: p.habitaciones ?? 0,
          bathrooms: p.banios ?? 0,
          sqm: p.area ?? 0,
          type: (p.tipo ?? 'casa') as 'casa' | 'departamento' | 'penthouse' | 'terreno',
          coordinates: { lat: p.latitud!, lng: p.longitud! },
        })),
    [filtered]
  );

  return (
    <>
      <Helmet>
        <title>Explorar Propiedades | Agencia</title>
        <meta
          name="description"
          content="Explora el mapa interactivo de Agencia para encontrar propiedades exclusivas en Querétaro Moderno."
        />
      </Helmet>

      <Navbar />

      <main className="pt-[72px] h-screen flex overflow-hidden bg-[#FAF6F0] dark:bg-[#09090B]">
        {/* Toggle mobile view (Map vs List) */}
        <div className="flex flex-1 flex-col lg:flex-row overflow-hidden relative">
          
          {/* MAP VIEW COLUMN */}
          <div 
            className={`relative flex-1 min-w-0 h-full ${
              viewMode === 'map' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            <div className="absolute top-4 left-4 z-10">
              <PropertyFilters
                filters={filters}
                onFiltersChange={setFilters}
                resultCount={filtered.length}
              />
            </div>
            
            <PropertyMap properties={mapProperties} mapboxToken={mapboxToken} />
          </div>

          {/* LIST VIEW (SIDEBAR ON DESKTOP, FULL VIEW ON MOBILE IF VIEWMODE = LIST) */}
          <aside 
            className={`flex flex-col w-full lg:w-[420px] border-t lg:border-t-0 lg:border-l border-black/5 dark:border-white/5 bg-[#FAF6F0] dark:bg-[#09090B] shrink-0 h-full ${
              viewMode === 'list' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            <div className="px-6 py-5 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-white/30 dark:bg-black/10 backdrop-blur-md">
              <div className="font-sans">
                <h1 className="font-black text-xl text-[#18181B] dark:text-[#FAF6F0]">Propiedades</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isLoading ? 'Cargando...' : `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''}`}
                </p>
              </div>
              
              {/* Quick filter count indicator for mobile */}
              <div className="lg:hidden">
                <PropertyFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  resultCount={filtered.length}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 hide-scrollbar">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-white dark:bg-black/20 p-4 border border-black/5 rounded-[24px] aspect-[16/10]" />
                ))
              ) : filtered.length === 0 ? (
                <div className="text-center py-20 font-sans">
                  <span className="text-4xl block mb-4">🔍</span>
                  <p className="text-lg font-bold text-[#18181B] dark:text-[#FAF6F0]">Sin resultados</p>
                  <p className="text-xs text-muted-foreground mt-2">Prueba ajustando los filtros de búsqueda</p>
                </div>
              ) : (
                filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} variant="compact" />
                ))
              )}
            </div>
          </aside>

        </div>

        {/* MOBILE FLOATING TOGGLE SWITCH BUTTON (ZILLOW/AIRBNB STYLE) */}
        <button
          onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 lg:hidden flex items-center gap-2 bg-[#18181B] text-white hover:bg-black font-sans font-black text-sm px-6 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/10"
        >
          {viewMode === 'map' ? (
            <>
              <List className="w-4 h-4" />
              <span>Ver Lista</span>
            </>
          ) : (
            <>
              <Map className="w-4 h-4" />
              <span>Ver Mapa</span>
            </>
          )}
        </button>
      </main>
    </>
  );
};

export default MapPage;
