interface InputProps {
  inputValue: string;
  onChange: (value: string) => void;
}

const NavBar = ({ inputValue, onChange }: InputProps) => {
  return (
    <>
      <nav className="navbar navbar-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Movies</span>
          <input
            className="input-search"
            type="text"
            id="inputField"
            placeholder="Titles and genres..."
            value={inputValue}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
