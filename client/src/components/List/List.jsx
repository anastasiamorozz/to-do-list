import React from 'react';
import './List.scss';
import Task from '../Task/Task'

const List = ({tasks})=>{
    return(
        <div className="list">
            {tasks.length === 0 && (
                <h2>No tasks yet!</h2>
            )}
            {tasks.map((task)=>(
                <Task key={task._id} task={task}></Task>
            ))}
        </div>
    );
}

export default List;