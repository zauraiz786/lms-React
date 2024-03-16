import React, { useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";

const Admission = () => {
  useEffect(() => {
    getData();
  }, []);

  const [course, setCourse] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pic, setPic] = useState("");
  const storage = getStorage();

  const handleChange = (event) => {
    setCourse(event.target.value);
  };
  const genderChange = (event) => {
    setGender(event.target.value);
  };

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courseData = [];
    querySnapshot.forEach((doc) => {
      courseData.push(doc.data().courseName);
    });
    setCourses([...courseData]);
  }

  function logFun(event) {
    event.preventDefault();
    if (email === "" || password === "") {
      alert("Enter Valid Email And Password");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          try {
            uploadPhoto(user.uid);
            navigate("/studentDashboard");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
  }

  const uploadPhoto = (uid) => {
    const picRef = ref(storage, `images/${pic[0].name}`);
    setLoader(true);
    uploadBytes(picRef, pic[0]).then((snapshot) => {
      setLoader(false);
      const starsRef = ref(storage, `images/${pic[0].name}`);
      getDownloadURL(starsRef)
        .then(async (url) => {
          const docRef = await addDoc(collection(db, "students"), {
            name: name,
            email: email,
            gender: gender,
            course: course,
            url: url,
            uid: uid
          });
          console.log("document written with id: " + docRef.id);
        })
        .catch((error) => {
          switch (error.code) {
            case "storage/object-not-found":
              console.log("File Does't exit");
              break;
            case "storage/unauthorized":
              console.log("User doesn't have permission to access the object");
              break;
            case "storage/canceled":
              console.log("User canceled the upload");
              break;
            case "storage/unknown":
              break;
          }
        });
    });
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box
      sx={{
        marginTop: 18,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Registration for LMS</h1>
      <form onSubmit={logFun}>
        {/* //!Text Field */}

        <Box>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Full Name"
              variant="outlined"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <TextField label="Father Name" variant="outlined" />
            <br />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <Box>
              <TextField
                style={{ width: 447 }}
                label="Address"
                variant="outlined"
                required
              />
            </Box>
          </Box>

          {/* //!Select Text Field */}

          {/* //!Select Course */}
          <Box sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Course
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={course}
                label="Select Course"
                required
                onChange={handleChange}
              >
                {courses.map((items, index) => (
                  <MenuItem key={index} value={items}>
                    {items}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* //!Select Gender */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={genderChange}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
            <br />
          </Box>
          <Box
            style={{
              padding: 7,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{ width: 218 }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onChange={(e) => {
                setPic(e.target.files);
              }}
              required
            >
              Upload Photo
              <VisuallyHiddenInput type="file" />
            </Button>
            {loader ? (
              <Button style={{ width: 218 }} variant="outlined">
                <CircularProgress />
              </Button>
            ) : (
              <Button style={{ width: 218 }} variant="contained" type="submit">
                Register
              </Button>
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Admission;
