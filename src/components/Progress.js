import React, { useState, useEffect, useMemo } from 'react';
import * as Progress from 'react-native-progress';

const ProgressBar = ({ handleSuccess }) => {
  const [process, setProcess] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProcess((p) => p + 1);
    }, 300);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (process >= 10) handleSuccess();
  }, [process]);

  const percent = useMemo(() => {
    return process / 10;
  }, [process]);

  return <Progress.Pie progress={percent} size={200} />;
};

export default ProgressBar;
