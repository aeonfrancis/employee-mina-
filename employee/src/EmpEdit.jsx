import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EmpEdit = () => {
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

  const [user_id, idchange] = useState("");
  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [user_type, phonechange] = useState("");
  const [status, activechange] = useState("");
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { name, email,  user_type, status };

    fetch("http:localhost:3001/api/users/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Employee Edit</h2>
              </div>
              <div className="card-body p-5">
                <div className="row">
                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label className="px-2">Name</label>
                      <input
                        required
                        value={empdata.name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {name.length == 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label className="px-2">Email</label>
                      <input
                        value={empdata.email}
                        onChange={(e) => emailchange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label className="px-2">User Type</label>
                      <input
                        value={empdata.user_type}
                        onChange={(e) => phonechange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-5">
                    <div className="form-group">
                      <label className="px-2">Status</label>
                      <input
                        value={empdata.status}
                        onChange={(e) => activechange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;
