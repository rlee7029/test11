import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_INCOMPLETE_TASKS_BY_USER_ID } from '../../graphql/queries';
import { DELETE_TASK } from '../../graphql/mutations';
import { getToken } from '../../utils/auth';
import { Link } from 'react-router-dom';
import './TaskList.css'; 

const TaskList = () => {
  const { token, userId } = getToken();
  const { loading, error, data } = useQuery(GET_INCOMPLETE_TASKS_BY_USER_ID, {
    variables: { userId },
    fetchPolicy: 'network-only',
  });

  const [deleteTask] = useMutation(DELETE_TASK);

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask({
        variables: { id: taskId },
        refetchQueries: [{ query: GET_INCOMPLETE_TASKS_BY_USER_ID, variables: { userId } }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error fetching tasks: {error.message}</p>;

  const { incompleteTasks } = data;
  console.log(data);

  return (
  <div class="title">  <h2>Task List</h2>
<div className="task-list">

      {incompleteTasks.map((task) => (
        <div className={`task-card ${task.completed ? 'completed' : 'incomplete'}`} key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {task.completed ? (
            <p className="task-status completed">Task Completed</p>
          ) : (
            <p className="task-status incomplete">Task Incomplete</p>
          )}
          <div className="task-actions">
            <Link to={`/tasks/${task.id}`} className="btn btn-primary">
              Update Task
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteTask(task.id)}
            >
              Delete Task
            </button>
          </div>
        </div>
      ))}
    </div>
</div>
  );
};

export default TaskList;
