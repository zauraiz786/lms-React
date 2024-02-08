import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig/firebaseConfig";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const [days, setDays] = useState("");
  const [courseName, setCourseName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const navigate = useNavigate()

  async function logFun(e) {
    e.preventDefault();
    if (days === "" || courseName === "" || teacherName === "") {
      alert("Enter Valid course value");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "courses"), {
        days: days,
        courseName: courseName,
        teacherName: teacherName,
      });
      setDays('')
      setCourseName('')
      setTeacherName('')
      console.log("Document written with ID: ", docRef.id);
      navigate('/admin/allCourse')
    }catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const daysChange = (event) => {
    setDays(event.target.value);
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={logFun}
      >
        <TextField
          label="Course Name"
          variant="outlined"
          sx={{ fontSize: "20px" }}
          onChange={(e) => {
            setCourseName(e.currentTarget.value);
          }}
          value={courseName}
          required
        />
        <TextField
          label="Teacher Name"
          variant="outlined"
          sx={{ fontSize: "20px" }}
          onChange={(e) => {
            setTeacherName(e.currentTarget.value);
          }}
          value={teacherName}
          required
        />

        <Box>
          <FormControl style={{ width: 577 }}>
            <InputLabel>Days</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={days}
              label="Gender"
              sx={{ fontSize: "20px" }}
              onChange={daysChange}
            >
              <MenuItem value={"MWF"}>MWF</MenuItem>
              <MenuItem value={"TTS"}>TTS</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          style={{ width: 577 }}
          onClick={handleClick({ vertical: "top", horizontal: "right" })}
          variant="contained"
          sx={{ fontSize: "20px" }}
          type="Submit"
        >
          Create Course
        </Button>
        {!(days === "" || courseName === "" || teacherName === "") ? (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="Course Created Successfully"
            key={vertical + horizontal}
          />
        ) : (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="Couldn't Added course "
            key={vertical + horizontal}
          />
        )}
      </Box>
    </>
  );
}

export default AddCourse;
