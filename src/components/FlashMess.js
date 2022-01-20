import React from "react";

function FlashMess(props) {
  return (
    <div className="floating-alerts">
      {props.messages.map((msg, index) => {
        return (
          <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
            <h3>{msg}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default FlashMess;
