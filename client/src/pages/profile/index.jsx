import { useSelector } from "react-redux";
import CurrentUser from "./CurrentUser";
import ViewUser from "./ViewUser";
import { useParams } from "react-router-dom";

function Profile() {
  const user = useSelector(state => state.user);
  const { id } = useParams();
  return <>{user && user.id === id ? <CurrentUser /> : <ViewUser id={id} />}</>;
}

export default Profile;
