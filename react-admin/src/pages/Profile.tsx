import { Button, TextField } from "@material-ui/core";
import React, { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { connect } from "react-redux";
import { User } from "../models/user";
import { setUser } from "../redux/actions/setUserAction";

const Profile = (props: any) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    setEmail(props.user.email);
  }, [props.user]);

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { data } = await axios.patch(
      `http://localhost:8081/api/admin/ms/user/${props.user.email}`,
      {
        first_name,
        last_name,
        email,
      }
    );

    props.setUser(data);
  };

  console.log(props);

  return (
    <Layout>
      <h3>Account Information</h3>
      <form onSubmit={infoSubmit}>
        <div className="mb-3">
          <TextField
            label="First Name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            label="Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField
            inputProps={{
              readOnly: true,
            }}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Layout>
  );
};

export default connect(
  (state: { user: User }) => ({
    user: state.user,
  }),
  (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user)),
  })
)(Profile);
