import React, { useState } from "react";
import "./styles.css";

function App() {
  const [habits, setHabits] = useState([]);
  const [archivedHabits, setArchivedHabits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [habitName, setHabitName] = useState("");
  const [habitDescription, setHabitDescription] = useState("");
  const [habitTime, setHabitTime] = useState("Morning");
  const [habitRepeat, setHabitRepeat] = useState("Daily");
  const [habitStartDate, setHabitStartDate] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setHabitName("");
    setHabitDescription("");
    setHabitTime("Morning");
    setHabitRepeat("Daily");
    setHabitStartDate("");
  };

  const handleAddHabit = () => {
    const newHabit = {
      name: habitName,
      description: habitDescription,
      time: habitTime,
      repeat: habitRepeat,
      startDate: habitStartDate
    };

    if (editingIndex !== null) {
      // Editing an existing habit
      setHabits((prevHabits) => {
        const updatedHabits = [...prevHabits];
        updatedHabits[editingIndex] = newHabit;
        return updatedHabits;
      });
    } else {
      // Adding a new habit
      setHabits((prevHabits) => [...prevHabits, newHabit]);
    }

    closeModal();
  };

  const handleEditHabit = (index) => {
    const habitToEdit = habits[index];
    setEditingIndex(index);
    setHabitName(habitToEdit.name);
    setHabitDescription(habitToEdit.description);
    setHabitTime(habitToEdit.time);
    setHabitRepeat(habitToEdit.repeat);
    setHabitStartDate(habitToEdit.startDate);
    openModal();
  };

  const handleArchiveHabit = (index) => {
    const habitToArchive = habits[index];
    setArchivedHabits((prevArchivedHabits) => [
      ...prevArchivedHabits,
      habitToArchive
    ]);
    setHabits((prevHabits) => {
      const updatedHabits = [...prevHabits];
      updatedHabits.splice(index, 1);
      return updatedHabits;
    });
  };

  return (
    <div>
      <div class="vertical-center">
        <button className="addbtn" onClick={openModal}>
          Add Habit +
        </button>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingIndex !== null ? "Edit Habit" : "Add New Habit"}</h2>
            <label htmlFor="habit-name">Habit Name:</label>
            <input
              id="habit-name"
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
            />
            <label htmlFor="habit-description">Habit Description:</label>
            <textarea
              id="habit-description"
              value={habitDescription}
              onChange={(e) => setHabitDescription(e.target.value)}
            ></textarea>
            <label htmlFor="habit-time">Time of the Day:</label>
            <select
              id="habit-time"
              value={habitTime}
              onChange={(e) => setHabitTime(e.target.value)}
            >
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
            <label htmlFor="habit-repeat">Repeat:</label>
            <select
              id="habit-repeat"
              value={habitRepeat}
              onChange={(e) => setHabitRepeat(e.target.value)}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <label htmlFor="habit-start-date">Start Date:</label>
            <input
              id="habit-start-date"
              type="date"
              value={habitStartDate}
              onChange={(e) => setHabitStartDate(e.target.value)}
            />
            <button onClick={handleAddHabit}>
              {editingIndex !== null ? "Update" : "Save"}
            </button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

      <h2>Habits:</h2>
      <div className="habit-cards">
        {habits.length === 0 ? (
          <p>No habits</p>
        ) : (
          habits.map((habit, index) => (
            <div className="habitlist" key={index}>
              <h4>{habit.name}</h4>
              <p>{habit.description}</p>
              <p>Time of the Day: {habit.time}</p>
              <p>Repeat: {habit.repeat}</p>
              <p>Start Date: {habit.startDate}</p>
              <button onClick={() => handleEditHabit(index)}>Edit</button>
              <button onClick={() => handleArchiveHabit(index)}>Archive</button>
            </div>
          ))
        )}
      </div>
      <div>
        <h2>Archived Habits</h2>
        <div className="habit-cards archived-list">
          {archivedHabits.length === 0 ? (
            <p>No archived habits</p>
          ) : (
            archivedHabits.map((habit, index) => (
              <div className="habitlist" key={index}>
                <h4>{habit.name}</h4>
                <p>{habit.description}</p>
                <p>Time of the Day: {habit.time}</p>
                <p>Repeat: {habit.repeat}</p>
                <p>Start Date: {habit.startDate}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
