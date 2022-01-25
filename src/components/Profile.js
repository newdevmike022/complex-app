import React, { useEffect, useContext } from "react";
import Page from "./Page";
import { useParams, NavLink, Routes, Route } from "react-router-dom";
import Axios from "axios";
import StateContext from "../StateContext";
import ProfilePosts from "./ProfilePosts";
import ProfileFollowers from "./ProfileFollowers";
import ProfileFollowing from "./ProfileFollowing";
import { useImmer } from "use-immer";

function Profile() {
  const { username } = useParams();
  const appState = useContext(StateContext);
  const [state, setState] = useImmer({
    followActionLoading: false,
    startFollowingRequestCount: 0,
    stopFollowingRequestCount: 0,
    profileData: {
      profileUsername: "...",
      profileAvatar: "https://bbts1.azureedge.net/images/p/full/2021/03/be38a97c-9e0f-4f1e-9e79-33f47e4f7cd9.jpg",
      isFollowing: false,
      counts: { postCount: "", followerCount: "", followingCount: "" },
    },
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token }, { cancelToken: ourRequest.token });
        setState((draft) => {
          draft.profileData = response.data;
        });
      } catch (e) {
        console.log("There was an error!");
      }
    };
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, [appState, username, setState]);

  useEffect(() => {
    if (state.startFollowingRequestCount) {
      setState((draft) => {
        draft.followActionLoading = true;
      });

      const ourRequest = Axios.CancelToken.source();

      const fetchData = async () => {
        try {
          const response = await Axios.post(`/addFollow/${state.profileData.profileUsername}`, { token: appState.user.token }, { cancelToken: ourRequest.token });
          setState((draft) => {
            draft.profileData.isFollowing = true;
            draft.profileData.counts.followerCount++;
            draft.followActionLoading = false;
          });
        } catch (e) {
          console.log("There was an error!");
        }
      };
      fetchData();
      return () => {
        ourRequest.cancel();
      };
    }
  }, [appState, username, setState, state.profileData.profileUsername, state.startFollowingRequestCount]);

  useEffect(() => {
    if (state.stopFollowingRequestCount) {
      setState((draft) => {
        draft.followActionLoading = true;
      });

      const ourRequest = Axios.CancelToken.source();

      const fetchData = async () => {
        try {
          const response = await Axios.post(`/removeFollow/${state.profileData.profileUsername}`, { token: appState.user.token }, { cancelToken: ourRequest.token });
          setState((draft) => {
            draft.profileData.isFollowing = false;
            draft.profileData.counts.followerCount--;
            draft.followActionLoading = false;
          });
        } catch (e) {
          console.log("There was an error!");
        }
      };
      fetchData();
      return () => {
        ourRequest.cancel();
      };
    }
  }, [appState, username, setState, state.profileData.profileUsername, state.stopFollowingRequestCount]);

  const startFollowing = () => {
    setState((draft) => {
      draft.startFollowingRequestCount++;
    });
  };

  const stopFollowing = () => {
    setState((draft) => {
      draft.stopFollowingRequestCount++;
    });
  };

  return (
    <Page title="Profile Screen">
      <div>
        <h2>
          <img className="avatar-small" src={state.profileData.profileAvatar} alt="avatar" /> {state.profileData.profileUsername}
          {appState.loggedIn && !state.profileData.isFollowing && appState.user.username !== state.profileData.profileUsername && state.profileData.profileUsername !== "..." && (
            <button onClick={startFollowing} disabled={state.followActionLoading} className="btn btn-primary btn-sm ml-2">
              Follow <i className="fas fa-user-plus"></i>
            </button>
          )}
          {appState.loggedIn && state.profileData.isFollowing && appState.user.username !== state.profileData.profileUsername && state.profileData.profileUsername !== "..." && (
            <button onClick={stopFollowing} disabled={state.followActionLoading} className="btn btn-danger btn-sm ml-2">
              Stop Following <i className="fas fa-user-times"></i>
            </button>
          )}
        </h2>

        <div className="profile-nav nav nav-tabs pt-2 mb-4">
          <NavLink to="" end className="nav-item nav-link">
            Posts: {state.profileData.counts.postCount}
          </NavLink>
          <NavLink to="followers" className="nav-item nav-link">
            Followers: {state.profileData.counts.followerCount}
          </NavLink>
          <NavLink to="following" className="nav-item nav-link">
            Following: {state.profileData.counts.followingCount}
          </NavLink>
        </div>

        <Routes>
          <Route path="" element={<ProfilePosts />} />
          <Route path="followers" element={<ProfileFollowers />} />
          <Route path="following" element={<ProfileFollowing />} />
        </Routes>
      </div>
    </Page>
  );
}

export default Profile;
