import { useState } from "react";
import styles from "./ExamCalendar.module.css";
import Portal from "./Portal";

export default function ExamCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [exams, setExams] = useState([]);
  const [newExamName, setNewExamName] = useState("");
  const [newExamHour, setNewExamHour] = useState("");
  const [showModal, setShowModal] = useState(false);


  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDay = (startOfMonth.getDay() + 6) % 7;
  const daysInMonth = endOfMonth.getDate();

  const handleDayClick = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDay(date);
    setShowModal(true);
  };

  const handleAddExam = () => {
    if (!newExamName || !newExamHour || !selectedDay) return;

    setExams([
      ...exams,
      {
        date: selectedDay.toDateString(),
        name: newExamName,
        hour: newExamHour,
      },
    ]);
    setNewExamName("");
    setNewExamHour("");
    setSelectedDay(null);
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < startDay; i++) {
        days.push(
        <div key={`empty-${i}`} className={`${styles.examDay} ${styles.examOtherMonth}`}></div>
        );
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const isToday = date.toDateString() === new Date().toDateString();
        const dailyExams = exams.filter((e) => e.date === date.toDateString()).sort((a, b) => a.hour.localeCompare(b.hour));

        days.push(
        <div
            key={day}
            className={`${styles.examDay} ${isToday ? styles.examToday : ""}`}
            onClick={() => handleDayClick(day)}
        >
            <div className={styles.examDayNumber}>{day}</div>
            <div className={styles.examEvents}>
            {dailyExams.map((exam, i) => (
                <div key={i} className={styles.examEvent}>
                {exam.name} <span className={styles.examHour}> {exam.hour}</span>
                </div>
            ))}
            </div>
        </div>
        );
    }

    return days;
  };

  return (
    <div className={styles.examCalendarWrapper}>
      <div className={styles.examTitle}>Exam Calendar</div>

      <div className={styles.examMain}>
        <div className={styles.examLeft}>
          <div className={styles.examHeader}>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>←</button>
            <h3>{currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h3>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>→</button>
          </div>

          <div className={styles.examDayNames}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>

          <div className={styles.examCalendar}>
            <div className={styles.examWeek}>{renderDays()}</div>
          </div>
        </div>

        <div className={styles.examRight}>
          <h4>All Exams</h4>
          {exams.length === 0 ? (
            <p className={styles.noExams}>No exams yet. Add one by clicking a day</p>
          ) : (
            <ul className={styles.examList}>
              {exams
                .slice()
                .sort((a, b) => {
                  const dateA = new Date(`${a.date} ${a.hour}`);
                  const dateB = new Date(`${b.date} ${b.hour}`);
                  return dateA - dateB;
                })
                .map((exam, i) => (
                  <li key={i} className={styles.examListItem}>
                    <strong>{exam.name}</strong>
                    <br />
                    <span className={styles.examDate}>{exam.date}</span> at{" "}
                    <span className={styles.examHour}>{exam.hour}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      {showModal && (
        <Portal>
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h4>Add Exam on {selectedDay?.toDateString()}</h4>
              <input
                type="text"
                placeholder="Exam name"
                value={newExamName}
                onChange={(e) => setNewExamName(e.target.value)}
              />
              <input
                type="time"
                value={newExamHour}
                onChange={(e) => setNewExamHour(e.target.value)}
              />
              <div className={styles.modalButtons}>
                <button onClick={() => {
                  handleAddExam();
                  setShowModal(false);
                }}>
                  Add
                </button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
