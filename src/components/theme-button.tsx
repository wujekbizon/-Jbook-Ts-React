interface ThemeButtonProps {
  icon: JSX.Element;
  onClick: () => void;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ icon, onClick }) => {
  return (
    <div className="toggle-icons-container">
      <button onClick={onClick}>{icon}</button>
    </div>
  );
};

export default ThemeButton;
