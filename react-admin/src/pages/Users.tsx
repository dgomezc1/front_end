import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { User } from "../models/user";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);

  const perPage = 10;
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:8081/api/users")
        .then((res) => {
          setUsers(res.data);
        })
        .catch(() => {
          setUsers([]);
        });
    })();
  }, [updated]);

  console.log(document.cookie);

  return (
    <Layout>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(page * perPage, (page + 1) * perPage).map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    href={`users/${user.id}/links`}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                      await axios
                        .delete(`http://localhost:8080/api/user/${user.id}`)
                        .then(() => {
                          setUpdated((prevState) => !prevState);
                        });
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TablePagination
            count={users.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={perPage}
            rowsPerPageOptions={[]}
          />
        </TableFooter>
      </Table>
    </Layout>
  );
};

export default Users;