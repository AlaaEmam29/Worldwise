import React, { memo } from 'react';
import BarLoader from 'react-spinners/BarLoader';

const Loading = () => {
  return <BarLoader color="#00c46a" />;
};

export default memo(Loading);
