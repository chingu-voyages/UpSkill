import { useState, useEffect } from "react";
import { BsFillStarFill } from "react-icons/bs";
import axios from "axios";

function Reviews({ reviewers, stars, children }) {
  const [ users, setUsers ] = useState(null);

  // Limit only three reviewers from Profile page
  const reviewerList = [];
  const reviewerEndPoints = [];
  for (let i = 0; i < 3; i++) {
    reviewers[i] &&
      reviewerList.push(reviewers[i]) &&
      reviewers[i] &&
      reviewerEndPoints.push(
        `${import.meta.env.VITE_SERVER}user/id/${reviewers[i].reviewerId}`
      );
  }

  /** Get request - the three users passing in their id's
   * in sequence to receive their info
  ** Then store in "users" state **/
  useEffect(() => {
    async function getUser() {
      axios
        .all(reviewerEndPoints.map(endpoint => axios.get(endpoint)))
        .then(user => setUsers(user));
    }
    getUser();
  }, []);

  console.log(users);

  return (
    <div className="grid justify-items-center md:pr-4 md:border-y-2 md:w-full md:border-ivory-50 md:grid-cols-5">
      <div className="bg-ivory-75 h-14 w-14 my-4 rounded-full flex justify-center relative">
        <img
          className="rounded-full w-full object-cover"
          src={users}
          alt=""
          width={39}
          height={42}
        />
      </div>
      <div className="md:col-span-4 md:my-4 md:w-full">
        <div className="flex items-center gap-4 px-4 md:p-0">
          <h3 className="font-bold md:my-2 md:text-lg text-primary md:text-start text-center text-xl capitalize" />
          <div className="flex items-center gap-1">
            <span className="text">{stars}</span>
            <BsFillStarFill color="#facc15" />
          </div>
        </div>

        <div className=" text-base md:font-semibold font-medium text-justify text-grotto-100 md:p-0 p-4 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
