import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAirCallList} from '../action/airCall';

const Header = () => {
    const dispatch = useDispatch();

    const { callList } = useSelector(state => state.airCall)

    useEffect(() => {
        dispatch(getAirCallList());
    }, [])

  return (
      <div className='wrapper-header'>
          <div>
          {
              ['red', 'yellow', 'green'].map((color, index) => {
                  return (<span className="dot" key={index} style={{backgroundColor: color}}></span>)
              })
          }
          </div>
          <div className='header-text'>{`(${callList.length || 0}) Aircall phone`}</div>
      </div>
  );
};

export default Header;
