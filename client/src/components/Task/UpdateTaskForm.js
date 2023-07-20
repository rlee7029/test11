import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_TASK } from '../../graphql/mutations';
import { GET_TASK } from '../../graphql/queries';
import { useParams } from 'react-router-dom';
import { getToken } from '../../utils/auth';

const UpdateTaskForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [updateTask, { loading, error }] = useMutation(UPDATE_TASK);
  const [successMessage, setSuccessMessage] = useState('');

  const { loading: queryLoading, error: queryError, data: queryData } = useQuery(GET_TASK, {
    variables: { id },
  });

  useEffect(() => {
    if (queryData && queryData.task) {
      const { task } = queryData;
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.completed);
    }
  }, [queryData]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const { token, userId } = getToken();
    try {
      const { data } = await updateTask({
        variables: { id, input: { title, description, completed,userId } },
      });

    
      setSuccessMessage('Task updated successfully!');

    } catch (error) {
      console.log(error);
    }
  };

  if (queryLoading) return <p>Loading task...</p>;
  if (queryError) return <p>Error fetching task: {queryError.message}</p>;

  return (
    <div><h2 class="title">Update Task</h2>
    <form onSubmit={handleUpdateTask}>
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
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Updating Task...' : 'Update Task'}
      </button>
      {error && <p>{error.message}</p>}
      {successMessage && <p>{successMessage}</p>}
    </form>
</div>
  );
};

export default UpdateTaskForm;
