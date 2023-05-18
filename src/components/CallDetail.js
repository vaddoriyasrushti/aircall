//External Modules
import React from 'react';
import moment from 'moment';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import ArchiveIcon from "@mui/icons-material/Archive";
import IconButton from '@mui/material/IconButton';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import Tooltip from '@mui/material/Tooltip';
import {useDispatch} from "react-redux";
import {updateAirCallList} from "../action/airCall";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

// Component for call detail
const CallDetail = ({call, setSelectedCall}) => {
    const { id, from, to, direction, via, is_archived, created_at, call_type } = call;
    const dispatch = useDispatch();

    const date = call.created_at.split('T')[0];
    const formattedDate = moment(date, 'yyyy-MM-DD').format('MMM, DD yyyy');
    const time = moment(created_at).format('h:mm a');

    const handleClose = () => {
        setSelectedCall({});
    }

    //function for detail rendering
    return (
        <div className='call-detail-wrapper'>
            <div className='back-icon'><KeyboardBackspaceOutlinedIcon onClick={handleClose}/></div>
            <div className='card-detail'>
                <div className='icon-section'>
                    {call_type === 'answered' && <PhoneCallbackIcon className='icon-color' />}
                    {call_type === 'missed' && <PhoneMissedIcon className='missed-icon-color' />}
                    {call_type === 'voicemail' && <VoicemailIcon className='voice-icon-color' />}
                </div>
                <ul>
                    <li>{formattedDate}</li>
                    <li>{time} | {call_type}</li>
                </ul>
            </div>
            {
                [{name: 'Direction', value: direction}, {name: 'From', value: from}, {name: 'To', value: to}, {name: 'Via', value: via}]
                    .map((obj) => (
                    <div className='card-section'>
                        <ul>
                            <li>{obj.name}</li>
                            <li>{obj.value}</li>
                        </ul>
                    </div>
                ))
            }
        </div>
    );
};

export default CallDetail;
