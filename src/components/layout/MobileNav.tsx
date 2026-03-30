import { House, Zap, Shield } from 'lucide-react';

export default function MobileNav() {
  return (
    <nav className="fixed lg:hidden bottom-0 left-0 right-0 bg-brand-white border-t border-grey-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] p-4 z-50">
      <div className="container px-4 sm:px-6 flex items-center justify-around gap-6">
        <a href="#" className="text-brand-body-text hover:text-brand-primary transition-colors duration-200 flex items-center justify-center">
          <House className="w-6 h-6" />
        </a>
        <a href="/intel" className="text-brand-primary transition-colors duration-200 flex items-center justify-center">
          <Zap className="w-6 h-6" />
        </a>
        <a href="#" className="text-brand-body-text hover:text-brand-primary transition-colors duration-200 flex items-center justify-center">
          <Shield className="w-6 h-6" />
        </a>
      </div>
    </nav>
  );
}
