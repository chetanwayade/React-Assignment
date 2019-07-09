import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '../../node_modules/@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const AddressDetails = ({handleClick, address}) => {     
    const regex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    
    return (
    <Drawer anchor="right" open={true} onClose={() => handleClick(false)}>                
        <Card>
            <CardHeader title="Address Details " action={
            <IconButton aria-label="Settings" onClick={() => handleClick(false)}>   
                <ClearIcon />      
            </IconButton>
            }/>
            <CardContent>
            <Typography color="textSecondary">
                <strong>{address.name}</strong>
            </Typography>
            <Typography color="textSecondary">
                <strong>
                { address.address.street + ', ' + address.city + (regex.test(address.address.zipcode) ? (', ' + address.address.zipcode) : '.')}
                </strong>
            </Typography>
            </CardContent>
        </Card>
      </Drawer>        
    );
}

export default AddressDetails;