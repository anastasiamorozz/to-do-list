import React, { useState } from 'react';
import List from '../List/List';
import '../pages/MainPage.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../Header/Header'

const MainPage = () => {
    const tasks = [
        { id: 1, title: "Buy groceries", day: "Monday", completed: false },
        { id: 2, title: "Clean the house", day: "Monday", completed: true }

    ];

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    return(
        
        <div className='mainPage'>
            <Header></Header>
            <div className="dateContainer">
                <h3>Day</h3>
                <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy" 
                className="date"
                />
            </div>
            
            <div className="container">
                <List tasks={tasks}></List>
            </div>
        </div>
    );
}

export default MainPage;