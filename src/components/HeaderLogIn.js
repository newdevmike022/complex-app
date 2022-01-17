import React from "react";
import { Link } from "react-router-dom";

function HeaderLogIn(props) {
  return (
    <div className="flex-row my-3 my-md-0">
      <Link to="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </Link>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span class="chat-count-badge text-white"> </span>
      </span>
      <Link to="#" className="mr-2">
        <img className="small-header-avatar" src="https://steamuserimages-a.akamaihd.net/ugc/937206718582447090/916790A87ACC524FC5818B400AE683EF426ACCB9/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" alt="avatar" />
      </Link>
      <a className="btn btn-sm btn-success mr-2" href="/create-post">
        Create Post
      </a>
      <button onClick={() => props.setLoggedIn(false)} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLogIn;
