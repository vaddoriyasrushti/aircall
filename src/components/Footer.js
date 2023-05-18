//External Modules
import React, {useEffect, useState} from 'react';
import CallIcon from '@mui/icons-material/Call';
import ArchiveIcon from '@mui/icons-material/Archive';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import Badge from '@mui/material/Badge';

//Internal Modules
import {useSelector} from 'react-redux';

const Footer = ({type}) => {
    const [footer, setFooter] = useState({count: 0, name:'', icon:''});
    const { callList } = useSelector(state => state.airCall);

    useEffect(() => {
        let filteredCallList= [];

        if(type === 'allCall') {
            filteredCallList = callList.filter((call) => !call.is_archived);
            setFooter({count: filteredCallList.length, name: 'All Calls', icon: <CallIcon/>});
        }
        else if(type === 'archived') {
            filteredCallList = callList.filter((call) => call.is_archived);
            setFooter({count: filteredCallList.length, name: 'Archived Calls', icon: <ArchiveIcon/>});
        }
        else if(type === 'missed') {
            filteredCallList = callList.filter((call) => call.call_type === 'missed');
            setFooter({count: filteredCallList.length, name: 'Missed Calls', icon: <PhoneMissedIcon/>})
        }
    }, [type, JSON.stringify(callList)])

    return (
        <footer>
            <div>{footer.icon}</div>
            <div className='wrap-count'>
                <Badge badgeContent={footer.count} color="primary">
                    <div className='footer-text'>{footer.name}</div>
                </Badge>
            </div>
        </footer>
    );
};
export default Footer;

