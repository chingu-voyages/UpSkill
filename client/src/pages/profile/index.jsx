import { useSelector } from "react-redux";
import CurrentUser from "./CurrentUser";
import ViewUser from "./ViewUser";
import { useParams } from "react-router-dom";

function Profile() {
  const user = useSelector(state => state.user);
  const { id } = useParams();
  console.log(id);
  console.log(user.id);
  return (
    <>
      {/* TODO: Render the user is logged in and params math userId, else render user with params */}
      {user && user.id === id ? <CurrentUser /> : <ViewUser id={id} />}
    </>
  );
}

export default Profile;
