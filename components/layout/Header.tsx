import Image from 'next/image';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex flex-col md:flex-row justify-between items-center rounded-b-2xl">
      <div className="flex items-center gap-2">
  <Image src="/assets/logos/vacations 1.svg" alt="Logo" width={32} height={32} className="h-8 w-8 rounded-full shadow" />
        <span className="text-2xl font-bold tracking-tight text-primary">ALXbnb</span>
      </div>
      <nav className="flex flex-wrap gap-4 mt-2 md:mt-0">
        {["Rooms", "Mansion", "Countryside", "Beachfront"].map((type) => (
          <button key={type} className="text-gray-700 hover:text-primary font-medium px-3 py-1 rounded-full transition-colors">
            {type}
          </button>
        ))}
      </nav>
      <div className="flex gap-2 mt-2 md:mt-0 items-center">
        <input
          type="text"
          placeholder="Search destinations"
          className="border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary w-40 md:w-64"
        />
        <button className="text-primary font-semibold px-4 py-2 rounded-full hover:bg-primary/10 transition">Sign In</button>
        <button className="bg-primary text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-primary-dark transition">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
