import React, { useEffect, useContext, useState } from "react";
import Page from "./Page";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import StateContext from "../StateContext";
import ProfilePosts from "./ProfilePosts";

function Profile() {
  const { username } = useParams();
  const appState = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://bbts1.azureedge.net/images/p/full/2021/03/be38a97c-9e0f-4f1e-9e79-33f47e4f7cd9.jpg",
    isFollowing: false,
    counts: { postCount: "", followerCount: "", followingCount: "" },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token });
        setProfileData(response.data);
      } catch (e) {
        console.log("There was an error!");
      }
    };
    fetchData();
  }, [appState, username]);

  return (
    <Page title="Profile">
      <div>
        <h2>
          <img className="avatar-small" src={profileData.profileAvatar} alt="avatar" /> {profileData.profileUsername}
          <button className="btn btn-primary btn-sm ml-2">
            Follow <i className="fas fa-user-plus"></i>
          </button>
        </h2>

        <div className="profile-nav nav nav-tabs pt-2 mb-4">
          <Link to="#" className="active nav-item nav-link">
            Posts: {profileData.counts.postCount}
          </Link>
          <Link to="#" className="nav-item nav-link">
            Followers: {profileData.counts.followerCount}
          </Link>
          <Link to="#" className="nav-item nav-link">
            Following: {profileData.counts.followingCount}
          </Link>
        </div>
        <ProfilePosts />
      </div>
    </Page>
  );
}

export default Profile;
