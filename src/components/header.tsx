export default function Header() {
  return (
    <header className="bg-white px-8 py-4 ml-24 flex justify-between items-center">
      <nav className="space-x-8">
        <a href="/about" className="hover:underline">
          About
        </a>
        <a href="/events" className="hover:underline">
          Events
        </a>
        <a href="/sponsors" className="hover:underline">
          Sponsors
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
      </nav>
      <nav className="space-x-8">
        <button className="bg-orange py-2 px-4">
          Sign In
        </button>
        <button className="bg-yellow py-2 px-4">
          Join Us
        </button>
      </nav>
    </header>
  );
};