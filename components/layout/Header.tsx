const Header = () => {
  return (
    <header className="bg-white shadow p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="text-xl font-bold">ALX Listing</div>
      <nav className="flex flex-wrap gap-4 mt-2 md:mt-0">
        {["Rooms", "Mansion", "Countryside", "Beachfront"].map((type) => (
          <button key={type} className="text-gray-700 hover:text-blue-600">
            {type}
          </button>
        ))}
      </nav>
      <div className="flex gap-2 mt-2 md:mt-0">
        <input
          type="text"
          placeholder="Search"
          className="border rounded px-2 py-1"
        />
        <button className="text-blue-600">Sign In</button>
        <button className="bg-blue-600 text-white px-3 py-1 rounded">
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
