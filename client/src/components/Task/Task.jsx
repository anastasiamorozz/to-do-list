import React from 'react';
import './Task.scss';
// import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const Task = ({task}) =>{
    const {id, title, day, completed} = task;
    // Handling the checkbox click event to update the status of a task in database
    const handleCheckboxClicked = ()=>{
        // let url = `http://localhost:3001/tasks/${id}`;
        // if(completed){
        //     axios.delete(url)
        //     .then(()=>console.log("Deleted"))
        //     .catch((err)=> console.error(`Error: ${err}`));
        // }else{
        //         let data={title};
        //         axios.post(url,data)
        //         .then(()=>console.log('Added'))
        //         .catch((err)=> console.error(`Error: ${err}`))
        // }
    };
    return (
        <div className="task">
            <div className="name">
                <input type='checkbox' checked={completed} onChange={handleCheckboxClicked}/>
                <h3>{title}</h3>
            </div>
            <p><FontAwesomeIcon icon={faCalendar} />  {day}</p>
        </div>);
}

export default Task;