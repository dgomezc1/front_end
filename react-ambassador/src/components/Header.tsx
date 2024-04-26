import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { User } from "../models/user";
import axios from "axios";

const Header = (props: { user: User }) => {
  const [title, setTitle] = useState("Welcome");
  const [description, setDescription] = useState("Share links to earn money");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (props.user?.id) {
      setTitle(`$${props.user.revenue}`);
      setDescription("You have earned this far");
    } else {
      setTitle("Welcome");
      setDescription("Share links to earn money");
    }
  }, [props.user]);

  let buttons;

  if (!props.user?.id) {
    buttons = (
      <p>
        <button
          onClick={async () => {
            await axios
              .get("http://localhost:8080/api/health_check")
              .then(() => {
                window.location.href = "http://localhost:8080/auth/google";
              })
              .catch(() => {
                setError(true);
              });
          }}
        >
          Login
        </button>
      </p>
    );
  }

  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light">{title}</h1>
          <p className="lead text-muted">{description}</p>
          {buttons}
        </div>
      </div>
    </section>
  );
};

export default connect((state: { user: User }) => ({
  user: state.user,
}))(Header);
