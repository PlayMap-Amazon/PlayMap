import React, { useState } from "react";
import styles from "./StreakCalendar.module.css";
import { Link } from 'react-router-dom';


const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

const getStartDay = (month, year) => {
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};


export default function StreakCalendar({ studyDates = [] }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const startDay = getStartDay(currentMonth, currentYear);
  

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const weeks = [];
  let dayCounter = 1 - startDay;

  for (let week = 0; week < 6; week++) {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentYear, currentMonth, dayCounter);
      const formatted = formatDate(date);

      const isCurrentMonth = date.getMonth() === currentMonth;
      const isStreak = studyDates.includes(formatted);
      const isToday = formatDate(date) === formatDate(new Date());


      days.push(
        <div
          key={formatted}
          className={`${styles.day} ${isCurrentMonth ? styles.current : styles.otherMonth} ${isStreak ? styles.active : ""} ${isToday ? styles.today : ""}`}
          title={formatted}
        >
          {isCurrentMonth ? date.getDate() : ""}
        </div>
      );
      dayCounter++;
    }
    weeks.push(<div key={week} className={styles.week}>{days}</div>);
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.header}>
        <button onClick={prevMonth}>←</button>
        <h3>{monthNames[currentMonth]} {currentYear}</h3>
        <button onClick={nextMonth}>→</button>
      </div>

      <div className={styles.dayNames}>
        <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
      </div>

      <div className={styles.calendar}>
        {weeks}
      </div>
    </div>
  );
}
