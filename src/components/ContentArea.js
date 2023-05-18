import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Tabs, Tab, Box, CircularProgress} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import CallList from './CallList';
import Footer from './Footer';
import {updateAirCallList} from '../action/airCall';
import CallDetail from './CallDetail';
import _ from 'lodash';

const TabPanel = (props) => {
    const { children, value, index } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

const a11yProps = (index) =>  {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ContentArea = () => {
    const dispatch = useDispatch();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [selectedCall, setSelectedCall] = useState({});

    const { callList, isLoading } = useSelector(state => state.airCall);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleArchiveAll = () => {
       callList.map((call) => {
           const data = { ...call, is_archived: true };
           dispatch(updateAirCallList(call.id, data));
       })
    }

    const handleUnArchiveAll = () => {
        callList.map((call) => {
            const data = { ...call, is_archived: false };
            dispatch(updateAirCallList(call.id, data));
        })
    }
    console.log("callList--", selectedCall);

    return (
        <div>
            {_.isEmpty(selectedCall) ?
                <div>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={selectedTab} onChange={handleChange}>
                                <Tab
                                    label={<span className='activity-tab'><CallIcon /><span>&nbsp;All Calls</span></span>}
                                    {...a11yProps(0)}
                                />
                                <Tab
                                    label={<span className='activity-tab'><ArchiveIcon /><span>&nbsp;Archive</span></span>}
                                    {...a11yProps(1)}
                                />
                                <Tab
                                    label={<span className='activity-tab'><PhoneMissedIcon /><span>&nbsp;Missed</span></span>}
                                    {...a11yProps(2)}
                                />
                            </Tabs>
                        </Box>
                        <div className={'listing-area'}>
                            {
                                isLoading
                                    ? <div className='loader-area'><CircularProgress /></div>
                                    : <div>
                                        <TabPanel value={selectedTab} index={0}>
                                            <div>
                                                <div className='archive-all-calls' onClick={handleArchiveAll}>
                                                    <ArchiveIcon />&nbsp; Archive all calls
                                                </div>
                                            </div>
                                            <div className="scrollbar" id="scroll">
                                                <CallList type={'allCall'} setSelectedCall={setSelectedCall}/>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={selectedTab} index={1}>
                                            <div>
                                                <div className='unarchive-all-calls' onClick={handleUnArchiveAll}>
                                                    <UnarchiveIcon /> &nbsp; Unarchive all calls
                                                </div>
                                            </div>
                                            <div className="scrollbar" id="scroll">
                                                <CallList type={'archived'} setSelectedCall={setSelectedCall}/>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={selectedTab} index={2}>
                                            <div className="scrollbar" id="scroll">
                                                <CallList type={'missed'} setSelectedCall={setSelectedCall}/>
                                            </div>
                                        </TabPanel>
                                    </div>
                            }
                            </div>
                    </Box>
                    <Footer type={selectedTab === 1 ? 'archived' : selectedTab === 2 ? 'missed' : 'allCall'}/>
                </div>
            :   <CallDetail call={selectedCall} setSelectedCall={setSelectedCall}/>
            }
        </div>
    );
};

export default ContentArea;
