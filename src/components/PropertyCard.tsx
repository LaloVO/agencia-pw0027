import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { CBFProperty, formatPrice, actionLabel } from '@/lib/cbf';

interface PropertyCardProps {
  property: CBFProperty;
  variant?: 'default' | 'compact' | 'bento';
}

const PropertyCard = ({ property, variant = 'default' }: PropertyCardProps) => {
  const image = property.imagenes_propiedades?.[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop';
  
  // Custom badges using clean emojis
  const actionLabelStr = actionLabel(property.id_tipo_accion);
  const isRent = property.id_tipo_accion === 2;
  const isPreSale = property.id_tipo_accion === 4;
  
  const badgeEmoji = isRent ? '🔑' : (isPreSale ? '✨' : '🏡');
  const badgeText = `${badgeEmoji} ${actionLabelStr}`;

  const location = [property.colonia, property.direccion].filter(Boolean).join(', ') || 'Querétaro';

  if (variant === 'compact') {
    return (
      <Link 
        to={`/properties/${property.id}`} 
        className="group block overflow-hidden backdrop-blur-md bg-white/60 dark:bg-black/40 border border-black/5 dark:border-white/10 shadow-card hover:shadow-elegant rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[22px]">
          <img src={image} alt={property.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/70 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/95 dark:bg-black/90 backdrop-blur-md text-[#18181B] dark:text-[#FAF6F0] text-xs font-sans font-bold rounded-full shadow-sm border border-black/5">
              {badgeText}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <span className="text-white font-sans font-extrabold text-xl tracking-tight">
              {formatPrice(property.precio)}
            </span>
          </div>
        </div>
        <div className="p-5 font-sans">
          <h3 className="font-bold text-lg text-[#18181B] dark:text-[#FAF6F0] group-hover:text-primary transition-colors mb-1.5 truncate">
            {property.nombre}
          </h3>
          <p className="text-xs text-muted-foreground mb-4 truncate flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{location}</span>
          </p>
          <div className="flex gap-4 text-xs font-semibold text-[#18181B]/75 dark:text-[#FAF6F0]/75 bg-black/5 dark:bg-white/5 px-3 py-2 rounded-2xl w-fit">
            {property.habitaciones != null && (
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-primary" />
                {property.habitaciones} {property.habitaciones === 1 ? 'Hab' : 'Habs'}
              </span>
            )}
            {property.banios != null && (
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-primary" />
                {property.banios} {property.banios === 1 ? 'Baño' : 'Baños'}
              </span>
            )}
            {property.area != null && (
              <span className="flex items-center gap-1">
                <Square className="w-3.5 h-3.5 text-primary" />
                {property.area}m²
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Default card for carousel / listings
  return (
    <Link 
      to={`/properties/${property.id}`} 
      className="group block overflow-hidden backdrop-blur-md bg-white/70 dark:bg-black/35 border border-black/5 dark:border-white/10 shadow-card hover:shadow-elegant rounded-[32px] p-4 transition-all duration-500 hover:scale-[1.02]"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] mb-5">
        <img src={image} alt={property.nombre} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
        <div className="absolute top-4 left-4">
          <span className="px-3.5 py-1.5 bg-[#FAF6F0]/95 dark:bg-[#18181B]/95 backdrop-blur-md text-[#18181B] dark:text-[#FAF6F0] text-xs font-sans font-extrabold rounded-full shadow-md border border-black/5">
            {badgeText}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-primary text-white font-sans font-extrabold text-lg px-4 py-1.5 rounded-full shadow-md">
          {formatPrice(property.precio)}
        </div>
      </div>
      <div className="px-2 pb-2 font-sans">
        <h3 className="font-extrabold text-xl md:text-2xl text-[#18181B] dark:text-[#FAF6F0] mb-2 group-hover:text-primary transition-colors truncate">
          {property.nombre}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 truncate flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          <span>{location}</span>
        </p>
        
        <div className="flex gap-4 text-xs font-bold text-[#18181B]/80 dark:text-[#FAF6F0]/80">
          {property.habitaciones != null && (
            <span className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-xl">
              <Bed className="w-3.5 h-3.5 text-primary" />
              {property.habitaciones} {property.habitaciones === 1 ? 'Hab' : 'Habs'}
            </span>
          )}
          {property.banios != null && (
            <span className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-xl">
              <Bath className="w-3.5 h-3.5 text-primary" />
              {property.banios} {property.banios === 1 ? 'Baño' : 'Baños'}
            </span>
          )}
          {property.area != null && (
            <span className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-xl">
              <Square className="w-3.5 h-3.5 text-primary" />
              {property.area} m²
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
