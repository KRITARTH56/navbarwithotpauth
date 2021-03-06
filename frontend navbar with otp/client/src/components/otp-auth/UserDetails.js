import React, { useState, useEffect, useContext } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Users.css";
import { Store } from "./store";

const UserDetails = (props) => {
  //initial state
  const [values, setValues] = useState({});
  const [userStatus, setUserStatus] = useState(false);
  const [errors, setErrors] = useState({});
  const [modal, setmodal] = useState(false);
  const [name, setName] = useState("");
  const [{ user }, dispatch] = useContext(Store);
  const enteredNumber = props.location.state.message;
  const history = useHistory();

  const namehandler = (e) => {
    setName(e.target.value);
  };

  const change = () => {
    dispatch({
      type: "Register",
      name: name,
    });
  };

  //after form submit
  const formSubmit = () => {
    console.log("Data pushed to DB");
  };

  //validate input field
  const validate = (values) => {
    let errors = {};
    if (!values.mobile) {
      errors.mobile = "mobile is required";
    } else if (!/^[6-9]\d{9}$/.test(values.mobile)) {
      errors.mobile = "mobile is invalid";
    }

    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.name) {
      errors.name = "name is required";
    } else if (!/[a-zA-Z]/.test(values.name)) {
      errors.name = "name is not valid";
    }

    return errors;
  };

  //for formsubmit called
  useEffect(() => {
    if (Object.keys(errors).length === 0 && userStatus) {
      formSubmit();
    }
  }, [errors]);

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setUserStatus(true);

    const newUser = {
      user_name: values.name,
      user_email: values.email,
      user_mobile: values.mobile,
      user_status: userStatus,
    };
    //POST request
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    if (values.id) {
      fetch(
        "http://localhost:5000/users/update/" + values.id,
        requestOptions
      ).then((res) => console.log(res.data));
    } else {
      fetch("http://localhost:5000/users/add", requestOptions).then((res) =>
        console.log(res.data)
      );
    }
    //after submitting mange state
    setValues({});
  };

  //handle input change
  const onChangeInput = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  //Check if mobile number already registared
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch("http://localhost:5000/users/" + enteredNumber)
      .then((res) => res.json())
      .then((res) => {
        console.log("res==>", res);
        setValues({
          id: res[0]._id || null,
          name: res[0].user_name,
          email: res[0].user_email,
          mobile: res[0].user_mobile,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  const togglemodal = () => {
    setmodal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const cssstyle = {
    color: "blue",
  };

  return (
    <>
      <div className="form_container">
        <h2>Welcome you are registared user you can edit your details</h2>
        <input
          type="text"
          style={{ padding: "0rem" }}
          onChange={namehandler}
          className="form-controlv"
          value={name}
          name="name"
        />
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            fontSize: "1.4rem",
            padding: ".5rem 1.3rem",
            border: ".1rem solid blue",
            margin: "0 2rem",
          }}
          onClick={change}
        >
          submit
        </button>
        <h1 style={{ color: "black", fontSize: "2rem", marginTop: "2rem" }}>
          {" "}
          {`your name is ${user} `}{" "}
        </h1>
        <div className="wrap">
          <Container>
            <Row>
              {values.id && <p></p>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="formset">
                  <div class="tasksInput">
                    <Form.Control
                      name="name"
                      onChange={namehandler}
                      type="text"
                      placeholder="Name"
                      className="form-control "
                      value={name}
                      value={values.name || ""}
                      onChange={onChangeInput}
                      autocomplete="off"
                    />
                  </div>
                  {errors.name && (
                    <p className="help is-danger">{errors.name}</p>
                  )}
                  <div class="tasksInput">
                    <Form.Control
                      name="email"
                      type="email"
                      className="form-control "
                      placeholder="Enter Email"
                      value={values.email || ""}
                      onChange={onChangeInput}
                      autocomplete="off"
                    />
                  </div>
                  {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
                  <div class="tasksInput">
                    <Form.Control
                      name="mobile"
                      type="text"
                      className="form-control "
                      placeholder="Mobile"
                      value={(values.mobile = enteredNumber || "")}
                      onChange={onChangeInput}
                      autocomplete="off"
                    />
                  </div>
                  {errors.mobile && (
                    <p className="help is-danger">{errors.mobile}</p>
                  )}

                  <Button
                    className="verify_btn1"
                    variant="primary"
                    type="submit"
                    onClick={togglemodal}
                    onClick={change}
                  >
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
