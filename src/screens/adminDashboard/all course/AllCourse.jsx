import React, { useEffect, useState } from "react";
import ResponsiveCard from "../../../components/ResponsiveCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig/firebaseConfig";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";

const AllCourse = () => {
  useEffect(() => {
    getData();
  }, []);

  const [course, setCourse] = useState([]);

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courseData = [];
    querySnapshot.forEach((doc) => {
      courseData.push(doc.data());
    });
    setCourse([...courseData]);
  }

  return (
    <>
      <Box display="flex" flexWrap="wrap" alignItems="center">
        {course.length > 0 ? course.map((items, index) => (
          <Box key={index} >
            <ResponsiveCard teacherName = {items.teacherName} courseName={items.courseName} days={items.days} iima/>
          </Box>
        )): <CircularProgress />}
      </Box>
    </>
  );
};

export default AllCourse;
