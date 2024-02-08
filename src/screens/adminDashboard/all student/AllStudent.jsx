import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig/firebaseConfig";
import CardWithImage from "../../../components/CardWithImage";
import { Box } from "@mui/material";

const AllStudent = () => {
  useEffect(() => {
    getStudentData();
  }, []);
  const [data, setData] = useState([]);

  //!Get Student Data:

  async function getStudentData() {
    const querySnapshot = await getDocs(collection(db, "students"));
    const arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    setData([...arr]);
  }
  
  return (
    <Box display="flex" flexWrap="wrap" alignItems="center">
      {data.length > 0 ? (
        data.map((item, index) => (
          <Box key={index}>
            <CardWithImage
              name={item.name}
              course={item.course}
              image={item.url}
              gender={item.gender}
            />
          </Box>
        ))
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default AllStudent;
