import React, { Dispatch, useEffect, useState } from "react";
import Nav from "./Nav";
import Menu from "./Menu";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { User } from "../models/user";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/setUserAction";

const Layout = (props: any) => {
  const [redirect, setRedirect] = useState(false);

  const param = new URLSearchParams(window.location.search);
  const token = param.get("token");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("user", {
          headers: {
            Authorization: `${token}`,
          },
        });

        props.setUser(data);
      } catch (e) {
        setRedirect(true);
      }
    })();
  }, []);

  if (redirect) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div>
      <Nav />

      <div className="container-fluid">
        <div className="row">
          <Menu token={token} />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="table-responsive">{props.children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { user: User }) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
