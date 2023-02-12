import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import noUserImg from "../assets/dashboard/noUser.png";
import axios from "axios";

function Reviews({ stars, children, id }) {
  const [reviewer, setReviewer] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchReviewer = async () => {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER}/user/id/${id}`
        );
        setReviewer(res.data);
      };
      fetchReviewer();
    }
  }, [id]);
  return (
    <>
      {id && (
        <div className="grid justify-items-center md:pr-4 border-y-2 w-full md:border-ivory-50 md:grid-cols-5">
          <div className="self-center">
            <img
              src={reviewer?.profilePic || noUserImg}
              alt=""
              width={39}
              height={42}
              className="h-14 w-14 my-4 rounded-full object-cover"
            />
          </div>
          <div className="md:col-span-4 md:my-4 md:w-full">
            <div className="flex items-center gap-4 px-4 md:p-0">
              <h3 className="font-bold md:my-2 md:text-lg text-primary md:text-start text-center text-xl capitalize">
                {reviewer
                  ? `${reviewer?.first_name} ${reviewer?.last_name}`
                  : ""}
              </h3>
              <div className="flex items-center gap-1">
                <span className="text">{stars && stars}</span>
                <BsFillStarFill color="#facc15" />
              </div>
            </div>

            <div className=" text-base md:font-semibold font-medium text-justify text-grotto-100 md:p-0 p-4 w-full">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Reviews;
