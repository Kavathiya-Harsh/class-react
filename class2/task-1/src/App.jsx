import { useReducer, useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export default function App() {
  const [formData, dispatch] = useReducer(reducer, initialState);
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmittedData((prev) => [...prev, formData]);

    dispatch({ type: "RESET" });
  };

  return (
    <div>
      <h2>User Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>

      <h3>All Submitted Users</h3>

      {submittedData.map((user, index) => (
        <div key={index}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}