import React from 'react'

const NewTask = ({newTask}) => {
  return (
    <div className='row'>
        <div className="col-lg-10 offset-lg-2 mb-5 text-right">
            <button type="button" className='btn btn-primary' onClick={() => newTask()}><i className="fa fa-plus mr-1"></i>Create Task</button>
        </div>
    </div>

  )
}

export default NewTask