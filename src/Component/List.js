import React from 'react'
import NewTask from './NewTask';
import { useNavigate, Link } from 'react-router-dom';

import {useSelector,useDispatch} from 'react-redux';
import { deleteTask,statusChecked } from '../features/Tasks/taskSlice';
const List = () => {

const tasks = useSelector((state) => state.tasks);
const dispatch = useDispatch();
const navigate = useNavigate();    


const acticon = {
    fontSize:"14px",
    cursor: "pointer"
}

const newTask = () =>{
    navigate('/form');

}

const delBtn = (id) =>{
    dispatch(deleteTask({id}));
        }

        const statusChange = (id,e) => {
            
            const status = e.target.checked;
            console.log(id,status);
            dispatch(statusChecked({id,status}))
        }


  return (
    <div className="container mt-3">
        <h4 className='text-center'>List Of Tasks</h4>
        <NewTask newTask={newTask}/>
        <div class="table-responsive">
        <table className="table table-hover w-100">
            <thead>
                <tr>
                    <th>S.no</th>
                    <th>Task Title</th>
                    <th>Task Desc</th>
                    <th>Task Due Date</th>
                    <th>Task Completion Status</th>
                    <th>Task Priority</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                 {/* Sample table row  */}
 
{tasks.map((val,ind) =>

<tr key={ind}>
<td>{(parseInt(ind)+1)}</td>
<td>{val.title}</td>
<td>{val.desc}</td>
<td>{val.dueDate}</td>
<td>
                            <input type="checkbox"  className="custom-control custom-checkbox" checked={val.status} onChange={(e) => statusChange(val.id,e)} id="customCheck1"/>
                            
                     </td>
                     
<td ><div className={val.priority}>{val.priority}</div></td>
<td>
<Link to={`/editForm/${val.id}`} className="btn" ><i className="fas fa-edit mx-2 text-primary" style={acticon}></i></Link>
<button className="btn" onClick={() => delBtn(val.id)}><i className="fas fa-trash-alt text-danger" style={acticon} ></i></button>
                    </td>
</tr>



)}
 {(!tasks.length) && <tr><td colSpan="7" className='text-center'>No tasks are available ...</td></tr>
 }

                 
             
                 {/* Add more rows as needed  */}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default List