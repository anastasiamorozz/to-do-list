import React, { useState } from 'react';
import List from '../List/List';
import '../pages/MainPage.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CustomModal from '../Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const MainPage = () => {
    const tasks = [
        { id: 1, title: "Buy groceries", day: "Monday", completed: false },
        { id: 2, title: "Clean the house", day: "Monday", completed: true }

    ];

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };


    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    return(
        
        <div className='mainPage'>
            <Header></Header>
            <div className="topElements">
                <div className="dateContainer">
                    <h3>Day</h3>
                    <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy" 
                    className="date"
                    />
                </div>

                <button onClick={openModal}><FontAwesomeIcon icon={faPlus} /> Add</button>
                <CustomModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >
                    <h2>Modal Content</h2>
                    <p>This is the content of the modal window.</p>
                    <button onClick={closeModal}>Close Modal</button>
                </CustomModal>
            </div>
            
            <div className="container">
                <List tasks={tasks}></List>
            </div>

            <Footer></Footer>
        </div>
    );
}

export default MainPage;