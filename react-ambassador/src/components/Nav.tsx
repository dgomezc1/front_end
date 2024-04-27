import React, { Dispatch, useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import { User } from "../models/user";
import axios from "axios";
import { setUser } from "../redux/actions/setUserAction";

const Nav = (props: any) => {
  const param = new URLSearchParams(window.location.search);
  const token = param.get("token");

  const logout = async () => {
    await axios.post("logout", {
      headers: {
        Authorization: `${token}`,
      },
    });
    props.setUser(null);
  };

  let menu;

  if (props.user?.id) {
    menu = (
      <div className="col-md-3 text-end">
        <Link to={"/rankings"} className="btn me-2">
          Rankings
        </Link>
        <Link to={`/stats?token=${token}`} className="btn me-2">
          Stats
        </Link>
        <a href="#" className="btn btn-outline-primary me-2" onClick={logout}>
          Logout
        </a>
        <Link to={`/profile?token=${token}`} className="btn btn-primary">
          {props.user.first_name} {props.user.last_name}
        </Link>
      </div>
    );
  } else {
    menu = <div className="col-md-3 text-end"></div>;
  }

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <NavLink
              to="/"
              activeClassName="link-dark"
              exact
              className="nav-link px-2 link-secondary"
            >
              Frontend
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/backend"}
              activeClassName="link-dark"
              className="nav-link px-2 link-secondary "
            >
              Backend
            </NavLink>
          </li>
        </ul>

        {menu}
      </header>
    </div>
  );
};

export default connect(
  (state: { user: User }) => ({
    user: state.user,
  }),
  (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user)),
  })
)(Nav);
