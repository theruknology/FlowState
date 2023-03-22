import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FullModal } from "../UI/Modals/Modal";
import StatView from "./StatView";

const Stats = (props) => {
  const allSessions = useSelector((state) => state.sessionsList);
  const [view, setView] = useState("All");
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2023);
  const [data, setData] = useState([]);

  const today = new Date();

  const recentYears = (() => {
    const thisYear = today.getFullYear();
    const recents = [];
    recents.push({ year: thisYear });
    recents.push({ year: thisYear - 1 });
    recents.push({ year: thisYear - 2 });
    recents.push({ year: thisYear - 3 });

    return recents;
  })();

  const months = [
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  useEffect(() => {
    if (view === "All") {
      setData(allSessions);
    }
    if (view === "Monthly") {
      const updatedSelection = allSessions.filter((itm) => {
        const date = new Date(itm.date);
        console.log(date.getMonth()+1);
        console.log(date.getFullYear());
        console.log("here in the montly")
        return date.getMonth() + 1 === month && date.getFullYear() === year;
      });
      setData(updatedSelection);
    }
    if (view === "Yearly") {
      const updatedSelection = allSessions.filter((itm) => {
        const date = new Date(itm.date);
        console.log(date.getFullYear());
        return date.getFullYear() === year;
      });
      setData(updatedSelection);
    }
  }, [view, month, year, allSessions]);

  return (
    <FullModal>
      <div className="font-Inter text-white flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="text-[2rem] font-medium">My Stats</h2>
          <button className="underline py-2 px-4 bg-[#494949] rounded-lg" onClick={props.onClose}>Close</button>
        </div>
        <div className="flex gap-8 border-[#494949] rounded-lg border-2 py-4 px-6">
          <button
            className="text-[1.1rem] underline"
            onClick={() => {
              setView("All");
            }}
          >
            All
          </button>
          <button
            onClick={() => {
              setView("Monthly");
            }}
            className="text-[1.1rem] underline"
          >
            Monthly
          </button>
          <button
            onClick={() => {
              setView("Yearly");
            }}
            className="text-[1.1rem] underline"
          >
            Yearly
          </button>
        </div>

        {view !== "All" && (
          <div className="flex gap-4 self-end">
            {view === "Monthly" && (
              <select
                className="w-fit bg-[#494949] py-1 px-2 rounded-lg"
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                }}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.name}
                  </option>
                ))}
              </select>
            )}

            <select
              className="w-fit bg-[#494949] py-1 px-2 rounded-lg"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                console.log(year)
                console.log(month)
              }}
            >
              {recentYears.map((year) => (
                <option key={year.year} value={year.year}>
                  {year.year}
                </option>
              ))}
            </select>
          </div>
        )}

        <StatView data={data} />
      </div>
    </FullModal>
  );
};

export default Stats;
