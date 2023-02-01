import { AiFillStar, AiOutlineStar } from "react-icons/ai";
const Stars = ({ setSelectStar, selectStar }) => {
  const handleClick = (e, i) => {
    e.preventDefault();
    setSelectStar(i);
  };

  const starElements = [...Array(5)].map((star, i) => (
    <div onClick={e => handleClick(e, i)} key={i}>
      {i <= selectStar ? (
        <AiFillStar color="#facc15" size={30} />
      ) : (
        <AiOutlineStar color="#DCDBDB" size={30} />
      )}
    </div>
  ));
  return <div className="flex">{starElements}</div>;
};

export default Stars;
