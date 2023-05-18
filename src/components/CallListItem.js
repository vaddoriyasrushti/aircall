import React from 'react';
import moment from 'moment';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import VoicemailIcon from '@mui/icons-material/Voicemail';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import {Tooltip, IconButton} from '@mui/material';
import {useDispatch} from 'react-redux';
import {updateAirCallList} from '../action/airCall';


// Component for call card
const CallListItem = ({call, setSelectedCall}) => {
    const { id, from, to, is_archived, created_at, call_type } = call;
    const dispatch = useDispatch();

    const time = moment(created_at).format('h:mm a');

    //Function to handle the button that sends patch request to unarchive calls
    const handleUnarchive = () => {
        const data = { ...call, is_archived: false };
        dispatch(updateAirCallList(id, data));
    };

    //Function to handle the button that sends patch request to archive calls
    const handleArchive = () => {
        const data = { ...call, is_archived: true };
        dispatch(updateAirCallList(id, data));
    };

    const renderDetailPage = () => {
        setSelectedCall(call);
    }

    //function for call card rendering
    return (
        <div className='call-container' onClick={renderDetailPage}>
            <div className='phone-icon-section'>
                {call_type === 'answered' && <Tooltip title='answered' placement='top'><PhoneCallbackIcon className='icon-color' /></Tooltip>}
                {call_type === 'missed' && <Tooltip title='missed' placement='top'><PhoneMissedIcon className='missed-icon-color' /></Tooltip>}
                {call_type === 'voicemail' && <Tooltip title='voice mail' placement='top'><VoicemailIcon className='voice-icon-color' /></Tooltip>}
            </div>
            <ul>
                <li>
                    <span>From :{from}</span>
                </li>
                <li>
                    <span>Tried to call {to}</span>
                </li>
            </ul>
            <div className='time-section'>
                <div className='time'>
                    <span>{time}</span>
                </div>
            </div>
            <div className='archive-section'>
                {
                    is_archived ?
                    <Tooltip title='Unarchive' placement='top'>
                        <IconButton onClick={handleUnarchive}>
                            <UnarchiveIcon className='archive-icon' />
                        </IconButton>
                    </Tooltip>
                    :
                    <Tooltip title='Archive' placement='top'>
                        <IconButton onClick={handleArchive}>
                            <ArchiveIcon className='archive-icon' />
                        </IconButton>
                    </Tooltip>
                }
            </div>
        </div>
    );
};

export default CallListItem;
