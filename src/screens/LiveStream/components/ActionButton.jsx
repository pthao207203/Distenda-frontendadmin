const ActionButton = ({ label, bgColor, icon, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex gap-3 justify-center items-center px-3 py-3 text-[1.25rem] max-md:text-[1rem] font-medium text-white rounded-lg ${bgColor} min-w-[15rem]`}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          className="object-contain w-6 aspect-square"
        />
      )}
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
