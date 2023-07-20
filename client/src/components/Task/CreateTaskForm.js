import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../../graphql/mutations';
import { getToken } from '../../utils/auth';


const CreateTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { token, userId } = getToken();
  const [createTask, { loading, error }] = useMutation(CREATE_TASK);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createTask({
        variables: { input: { title, description, userId: userId, } },
      });

      setSuccessMessage('Task created successfully!');


 //     setTitle('');
 //     setDescription('');
 //     window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div><h2 className='title'>Add new task</h2>
    <form onSubmit={handleCreateTask}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating Task...' : 'Create Task'}
      </button>
      {error && <p>{error.message}</p>}
      {successMessage && <p>{successMessage}</p>}
    </form>
    </div>
  );
};

export default CreateTaskForm;
