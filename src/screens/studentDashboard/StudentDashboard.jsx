import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  React.useEffect(() => {
    function onAuth() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          getStudentData(user.uid);
        } else {
          navigate("/");
        }
      });
    }
    onAuth();
  }, []);

  const [data, setData] = React.useState([]);
  const navigate = useNavigate();

  //!SignOut User
  function signOutUser() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  //!Get Student Data:
  async function getStudentData(uid) {
    const q = query(
      collection(db, "students"),
      where("uid", "==", uid)
    );
    const arr = [];
    const arr2 = [];
    const querySnapshot2 = await getDocs(collection(db, "courses"));
    querySnapshot2.forEach((doc) => {
      arr2.push(doc.data());
    });
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    const dataWithCourses = arr.map((items) => {
      const matchingCourse = arr2.find(
        (item) => item.courseName === items.course
      );
      return {
        ...items,
        teacherName: matchingCourse?.teacherName || "", // Add teacherName to the student data
        days: matchingCourse?.days || "", // Add days to the student data
      };
    });

    setData([...dataWithCourses]);
    console.log(dataWithCourses);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
          <Button onClick={signOutUser} color="inherit">
            LogOut
          </Button>
        </Toolbar>
      </AppBar>

      {/* //!Card */}
      {data.map((item, index) => (
        <Box align="center" marginTop={5} key={index}>
          <Card sx={{ width: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="600"
                image={item.url}
                alt="profile Photo"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  Name: {item.name}
                </Typography>
                <Typography variant="h5" component="div">
                  Course: {item.course}
                </Typography>
                <Typography variant="h5" component="div">
                  Teacher Name: {item.teacherName}
                </Typography>
                <Typography variant="h5" component="div">
                  Days: {item.days}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ))}
    </Box>
  );
}
