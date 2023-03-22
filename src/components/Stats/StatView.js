import React, { useEffect, useState } from "react";

const StatView = (props) => {
  const [flairData, setFlairData] = useState({});
  const [count, setCount] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const flairData = {};
    let count = 0;
    let minutes = 0;

    props.data.map((itm) => {
      if (flairData[itm.flair] === undefined) {
        flairData[itm.flair] = itm.duration;
        console.log(itm.duration);
        count++;
        minutes += itm.duration;
      } else {
        flairData[itm.flair] += itm.duration;
        count++;
        minutes += itm.duration;
      }
    });

    setFlairData(flairData);
    setCount(count);
    setMinutes(minutes);
  }, [props.data]);

  console.log(flairData);

  return (
    <div>
      <p>Total Sessions: {count}</p>
      <p>Total Time Spent: {minutes}</p>
    </div>
  );
};

export default StatView;
