import axios from "axios";
import React, { useEffect, useState } from "react";
import { BackendUrl } from "../Utils/Contants";
import { useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Dashboard() {
  const [usersList, setUsersList] = useState([]);
  const [userDetail, setUserDetail] = useState({
    name: "",
    city: "",
    email: "",
  });
  const { token } = useSelector((store) => store);

  const getData = () => {
    try {
      let url = BackendUrl + "users";
      console.log("Network calling to url", url);
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("res:", res);
          setUsersList(res.data);
        })
        .catch((error) => {
          console.log("Error in getData:", error);
          let message = error.response?.data?.message;
          alert(message);
        });
    } catch (error) {
      console.log("Error in handleSubmit", error);
    }
  };

  const handleSubmit = () => {
    try {
      let url = BackendUrl + "users";
      console.log("Network calling to url", url);
      axios
        .post(url, userDetail, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("res:", res);
          setUserDetail({
            name: "",
            city: "",
            email: "",
          });
        })
        .catch((error) => {
          console.log("Error in handleSubmit:", error);
          let message = error.response?.data?.message;
          alert(message);
        });
    } catch (error) {
      console.log("Error in handleSubmit", error);
    }
    getData();
  };

  const handleChange = (event) => {
    setUserDetail({ ...userDetail, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="user_detail_form">
        <input
          onChange={handleChange}
          value={userDetail.email}
          type="email"
          name="email"
          placeholder="Email"
        />{" "}
        <input
          onChange={handleChange}
          value={userDetail.name}
          type="text"
          name="name"
          placeholder="Name"
          id=""
        />
        <input
          onChange={handleChange}
          value={userDetail.city}
          type="text"
          name="city"
          placeholder="City"
        />
      </div>
      <div >
        <button className="submit" onClick={handleSubmit}>Add</button>
      </div>
      <div className="table_div">

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((el, i) => (
                <TableRow
                  key={i}
                >
                  <TableCell component="th" scope="row">
                    {el.name}
                  </TableCell>
                  <TableCell align="right">{el.email}</TableCell>
                  <TableCell align="right">{el.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
