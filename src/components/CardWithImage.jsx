import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function CardWithImage({ name, course, image, gender }) {
  return (
    <Card sx={{ width: 300, marginBottom: 3, marginRight: 3 }}>
      <CardActionArea>
        <CardMedia component="img" height="450" image={image} alt="image" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name: {name}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Course: {course} <br />
            Gender: {gender}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
