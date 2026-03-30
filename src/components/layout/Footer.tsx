export default function Footer() {
  return (
    <footer className="hidden lg:block border-t border-grey-200 bg-white py-6">
      <div className="container px-4 sm:px-6 flex items-center justify-between">
        <p className="text-sm text-brand-body-text">
          &copy; {new Date().getFullYear()} Checkedit.ai — All rights reserved.
        </p>
        <p className="text-sm text-gray-500">
          Powered by <a href="https://hiaitus.ai" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Hiaitus.ai</a>
        </p>
      </div>
    </footer>
  );
}
