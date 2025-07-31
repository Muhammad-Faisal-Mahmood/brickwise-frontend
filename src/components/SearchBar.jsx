import { Input } from "antd";

const SearchBar = ({ onSearch, placeholder, alignment = "center" }) => {
  // Determine the Tailwind CSS class for alignment
  let alignmentClass = "";
  switch (alignment) {
    case "left":
      alignmentClass = "justify-start";
      break;
    case "right":
      alignmentClass = "justify-end";
      break;
    case "center":
    default:
      alignmentClass = "justify-center";
      break;
  }

  return (
    <div className={`flex ${alignmentClass} pb-8`}>
      <div className="w-full md:w-1/2 ">
        <Input.Search
          placeholder={placeholder}
          onSearch={onSearch}
          className="custom-search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
