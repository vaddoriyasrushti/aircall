import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CallListItem from './CallListItem';
import moment from 'moment';


const CallList = (props) => {
    const { callList } = useSelector(state => state.airCall);

    const [groupByDate, setGroupByDate] = useState({});

    useEffect(() => {
        let groupCallByDate = {}, filteredCallList= [];

        if(props.type === 'allCall') {
            filteredCallList = callList.filter((call) => !call.is_archived);
        }
        else if(props.type === 'archived') {
            filteredCallList = callList.filter((call) => call.is_archived);
        }
        else if(props.type === 'missed') {
            filteredCallList = callList.filter((call) => call.call_type === 'missed');
        }

        filteredCallList.map((call) => {
            const date = call.created_at.split('T')[0];
            const formattedDate = moment(date, 'yyyy-MM-DD').format('MMM, DD yyyy');
            if(groupCallByDate[formattedDate]) {
                const calls = [...groupCallByDate[formattedDate] || []];
                calls.push(call);
                groupCallByDate = Object.assign({}, groupCallByDate, {[`${formattedDate}`]: calls});
            } else {
                groupCallByDate = Object.assign({}, groupCallByDate, {[`${formattedDate}`]: [call]});
            }
        })
        setGroupByDate(groupCallByDate);
    }, [callList, props.type])



    return (
        <div className='container-calls-list'>
            {
                Object.keys(groupByDate).map((date, index) => {
                    return (
                        <div key={index} className='call-card'>
                            <div className='date-format'>{date}</div>
                            {
                                groupByDate[date].map((call, index) => {
                                    return (
                                        <div key={index}>
                                            <CallListItem call={call}  setSelectedCall={props.setSelectedCall} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
};

export default CallList;
