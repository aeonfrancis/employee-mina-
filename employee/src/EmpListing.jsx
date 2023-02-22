import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const EmpListing = () => {
  const [empdata, empdatachange] = useState([]);
  const navigate = useNavigate();
  const empdataArray = Object.values(empdata);

  const LoadDetail = (user_id) => {
    navigate("/employee/detail/" + user_id);
  };
  const LoadEdit = (user_id) => {
    navigate("/employee/edit/" + user_id);
  };
  const Removefunction = async (user_id) => {
    if (window.confirm("Do you want to remove?")) {
      try {
        const res = await axios.delete(
          `http://localhost:3001/api/users/${user_id}`
        );

        alert("Removed successfully.");
        window.location.reload();
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  // useEffect((resp) => {
    
  //   fetch("http://localhost:3001/api/users")
  //     .then((res) => {
  //       return res.json(resp.empdata);
  //     })
  //     .then((resp) => {
  //       empdatachange(resp.empdata);
  //       console.log(resp.empdata);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/users");
      empdatachange(data.users);
      console.log(data.users);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="employee/create" className="btn btn-success">
              Add New (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>User Type</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdataArray &&
                empdataArray.map((item) => (
                  <tr key={item.user_id}>
                    <td>{item.user_id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.user_type}</td>
                    <td>{item.status}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item.user_id);
                        }}
                        className="btn btn-success"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          Removefunction(item.user_id);
                        }}
                        className="btn btn-danger"
                      >
                        Remove
                      </a>
                      <a
                        onClick={() => {
                          LoadDetail(item.user_id);
                        }}
                        className="btn btn-primary"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
