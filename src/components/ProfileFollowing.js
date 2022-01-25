import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";

const ProfileFollowing = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    const fetchPosts = async () => {
      try {
        const response = await Axios.get(`/profile/${username}/following`, { cancelToken: ourRequest.token });
        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("There was an error!");
      }
    };
    fetchPosts();
    return () => {
      ourRequest.cancel();
    };
  }, [username]);

  if (isLoading) return <LoadingDotsIcon />;

  return (
    <div className="list-group">
      {posts.map((following, index) => {
        return (
          <div>
            <Link key={index} to={`/profile/${following.username}`} className="list-group-item list-group-item-action">
              <img className="avatar-tiny" src={following.avatar} alt="avatar" /> {following.username}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileFollowing;
