import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const AnnouncementCard = ({ title, message, onApply }) => {
  return (
    <Card sx={{ width: 800, marginBottom: '30px', height: 400, backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #ccc', borderRadius: '5px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">{message}</Typography>
      </CardContent>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <Button variant="contained" onClick={onApply}style={{ backgroundColor: '#196F3D' }}>
          Apply
        </Button>
      </div>
    </Card>
  );
};

export default AnnouncementCard;