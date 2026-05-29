import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { site } = useSiteUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/mapa', label: 'Propiedades' },
    { href: '/solicita-inmueble', label: 'Búsqueda Inteligente' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full h-[72px] z-50 px-6 md:px-12 flex justify-between items-center transition-all duration-500 ${
          isScrolled || !isHomePage
            ? 'bg-[#FAF6F0]/85 dark:bg-[#09090B]/85 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-md'
            : 'bg-transparent'
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-1.5 z-50 group"
        >
          <span className="font-sans font-extrabold text-xl md:text-2xl tracking-tighter text-[#18181B] dark:text-[#FAF6F0] transition-colors">
            MATCH
          </span>
          <span className="font-accent text-3xl md:text-4xl text-primary font-bold rotate-[-6deg] inline-block tracking-tight transition-transform duration-300 group-hover:scale-110">
            Houses
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-sans font-semibold text-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`relative py-1 transition-colors hover:text-primary ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-[#18181B]/80 dark:text-[#FAF6F0]/80'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}

          <Link
            to="/solicita-inmueble"
            className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90 px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
            <span>Hagamos Match</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-55 p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/10 text-[#18181B] dark:text-[#FAF6F0]"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile slide-out glass drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-[280px] h-full bg-[#FAF6F0]/95 dark:bg-[#09090B]/95 backdrop-blur-2xl border-l border-black/5 dark:border-white/5 shadow-2xl p-8 flex flex-col justify-between transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-8 pt-16">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-1"
            >
              <span className="font-sans font-black text-2xl tracking-tighter text-[#18181B] dark:text-[#FAF6F0]">MATCH</span>
              <span className="font-accent text-4xl text-primary font-bold rotate-[-6deg]">Houses</span>
            </Link>

            <div className="flex flex-col gap-5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-sans font-bold text-lg py-2 border-b border-black/5 dark:border-white/5 transition-colors ${
                      isActive ? 'text-primary pl-2' : 'text-[#18181B]/80 dark:text-[#FAF6F0]/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              to="/solicita-inmueble"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 py-3.5 rounded-full font-bold shadow-[0_4px_14px_rgba(249,115,22,0.3)] transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300 animate-pulse" />
              <span>Hagamos Match</span>
            </Link>
            <p className="text-[11px] text-center text-muted-foreground">
              © {new Date().getFullYear()} Match Houses
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
