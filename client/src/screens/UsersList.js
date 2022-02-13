import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TrashIcon from "@material-ui/icons/Delete";
import { deleteUser, getAllUsers } from "../actions/userActions";
import Error from "../components/Error";
import { Loading } from "../components/Loading";
import { Link } from "react-router-dom";

export default function UsersList() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.getAllUsersReducers);
  const { error, loading, users } = userState;

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="table-responsive-md">
      <h1>Users List</h1>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link>
                      <i
                        className="m-1"
                        onClick={() => {
                          dispatch(deleteUser(user._id));
                        }}
                      >
                        <TrashIcon color="secondary" />
                      </i>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
