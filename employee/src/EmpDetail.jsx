import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const EmpDetail = () => {
  const { empid } = useParams();
  const [empdata, empdatachange] = useState({});

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/users/${empid}`
      );
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
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <div className="container">
            <div className="card row px-5" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>User Details</h2>
              </div>
              <div className="card-body"></div>

              {empdata && (
                <div>
                  <h5>
                    Name : <b>{empdata.name}</b>
                  </h5>
                  <h5>ID Number : {empdata.user_id}</h5>
                  <h5>Email : {empdata.email}</h5>
                  <h5>User Type : {empdata.user_type}</h5>
                  <h5>Status : {empdata.status}</h5>
                  <Link className="btn btn-danger my-4" to="/">
                    Back to Listing
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpDetail;
