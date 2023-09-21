import {createSlice} from '@reduxjs/toolkit';


const taskList = JSON.parse(localStorage.getItem('tasks_list')) || [];

console.log(taskList);

const taskSlice = createSlice({

    name:'tasks',
    initialState:taskList,
    reducers:{
addTask : (state,action) => {
    state.push(action.payload);
    localStorage.setItem('tasks_list',JSON.stringify(state));
    console.log(state);
},
editTask:(state,action) => {
const {id,title,desc,dueDate,status,priority} = action.payload;   
const exactState = state.find(val => val.id === id);
if(exactState){
    exactState.title = title;
    exactState.desc = desc;
    exactState.dueDate = dueDate;
    exactState.status = status;
    exactState.priority = priority;
}
localStorage.setItem('tasks_list',JSON.stringify(state));
},
deleteTask:(state,action) => {
    const {id} = action.payload;
    const finalState = state.filter(val => val.id !== id);
    localStorage.setItem('tasks_list',JSON.stringify(finalState));
    return finalState;
},
statusChecked:(state,action) => {
    const {id,status} = action.payload;
    const exactState = state.find(val => val.id === id);
    if(exactState){
        exactState.status = status;
    }
    localStorage.setItem('tasks_list',JSON.stringify(state));
}

}
    

});

export const taskState = (state) => state.tasks;

export const {addTask,editTask,deleteTask,statusChecked} = taskSlice.actions;
export default taskSlice.reducer;