import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ResponsiveCard({teacherName , courseName, days}) {
  return (
    <Card sx={{ width: 400, backgroundColor: "rgb(229 231 235)", marginBottom: 3 , marginRight: 3}}>
      <CardActionArea>
        <CardContent>
          <Typography  gutterBottom variant="h4" component="div">
            {courseName}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Teacher: {teacherName} <br />
            Days: {days}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}