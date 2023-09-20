import { useLocation,useParams, useNavigate } from 'react-router-dom';
import { addTask,editTask } from '../features/Tasks/taskSlice';
import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {nanoid} from '@reduxjs/toolkit';

const FormPage = () => {


    const [title,setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const [dueDate,setDueDate] = useState('');
    const [status,setStatus] = useState('');
    const [priority,setPriority] = useState('');
   
    

const AllData = useSelector((state) => state.tasks);
const canSave = [title,desc,dueDate,priority].every(Boolean);

const path = useLocation();
const {id} = useParams();
const dispatch = useDispatch();

let pathname = path.pathname.split('/');
pathname = pathname.slice(-1)[0];
const navigate = useNavigate();

useEffect(() => {
if(pathname !== "form"){
    const taskData = AllData.find(val => val.id === id);
    setTitle(taskData.title);
    setDesc(taskData.desc);
    setDueDate(taskData.dueDate);
    setStatus(taskData.status);
    setPriority(taskData.priority);
}
},[id,AllData,pathname]);



const submitBtn = (e) =>{
    e.preventDefault();
    if(pathname === "form"){
    dispatch(addTask({id:nanoid(),title,desc,dueDate,status,priority}));
    navigate('/');
    }else{
        dispatch(editTask({id:id,title,desc,dueDate,status,priority}));
        navigate('/');  
    }

}



const cancelBtn = () =>{
    navigate('/');
}




  return (
    <div className="container mt-3">
        
    <div className="row">
        <div className="text-left font-weight-bold col-lg-8 offset-lg-2">
            <h4 className="text-center mb-4">{(pathname === "form") ? "Create a New Task" : "Edit The Task"}</h4>

            <form>
            
                 {/* Task Title Input */}
                <div className="form-group my-4">
                    <label htmlFor="taskTitle" >Task Title</label>
                    <input type="text" value={title} className="form-control" id="taskTitle" placeholder="Enter task title"   onChange={(e) => setTitle(e.target.value)}/>
                    {/* {error.title && <span className='text-danger'>{error.title}</span>} */}
                </div>

                 {/* Task Priority Select Box */}
                <div className="form-group  my-4">
                    <label htmlFor="taskPriority">Task Priority</label>
                    <select className="form-control" value={priority} id="taskPriority"  onChange={(e) => setPriority(e.target.value)}>
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    {/* {error.priority && <span className='text-danger'>{error.priority}</span>} */}
                </div>

                 {/* Task Description Textarea  */}
                <div className="form-group  my-4">
                    <label htmlFor="taskDescription">Task Description</label>
                    <textarea className="form-control" value={desc} id="taskDescription" rows="3" placeholder="Enter task description" onChange={(e) => setDesc(e.target.value)}></textarea>
                    {/* {error.desc && <span className='text-danger'>{error.desc}</span>} */}
                </div>

                 {/* Task Due Date Input */}
                <div className="form-group  my-4">
                    <label htmlFor="taskDueDate">Task Due Date</label>
                    <input type="date" className="form-control" value={dueDate} id="taskDueDate"   onChange={(e) => setDueDate(e.target.value)}/>
                    {/* {error.dueDate && <span className='text-danger'>{error.dueDate}</span>} */}
                </div>

                 {/* Task Completion Checkbox */}
                <div className="form-check  my-4">
                    <input type="checkbox" className="form-check-input" checked={status} disabled ={(pathname === "form") ? true : false} id="taskCompletion"  onChange={(e) => setStatus(!status)}/>
                    <label className="form-check-label" htmlFor="taskCompletion">Task Completion</label><br/>
                    {/* {error.status && <span className='text-danger'>{error.status}</span>} */}
                </div>

                 {/* Submit & Cancel Button */}
                 <div className='text-center'>
                <button type="submit" className={`btn ml-5 mt-3 ${(!canSave) ? "btn-secondary" : "btn-primary" }`} disabled = {!canSave} onClick={(e) => submitBtn(e)}>Save</button>
                <button type="button" className="btn btn-danger mx-2 mt-3" onClick={() => cancelBtn()}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default FormPage