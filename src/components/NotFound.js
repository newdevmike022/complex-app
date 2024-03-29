import React from "react";
import Page from "./Page";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Page title="Not Found">
      <div className="text-center">
        <h2>Uh oh. We cannot find that page!</h2>
        <p className="lead text-muted">
          Please visit the <Link to="/">homepage</Link> to get a fresh start.
        </p>
      </div>
    </Page>
  );
};
export default NotFound;
