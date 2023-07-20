const Task = require('../models/Task');

const taskResolvers = {
  Query: {
    tasks: async () => {
      try {
        const tasks = await Task.find();
        return tasks;
      } catch (error) {
        throw new Error('Failed to fetch tasks');
      }
    },

    tasksByUserId: async (_, { userId }) => {
      try {
     
        const tasks = await Task.find({ userId });
        return tasks;
      } catch (error) {
        throw new Error('Failed to fetch tasks');
      }
    },

    completedTasks: async (_, { userId }) => {
      try {
        const tasks = await Task.find({ userId, completed: true });
        return tasks;
      } catch (error) {
        throw new Error('Failed to fetch completed tasks');
      }
    },
    incompleteTasks: async (_, { userId }) => {
      try {
        const tasks = await Task.find({ userId, completed: false });
        return tasks;
      } catch (error) {
        throw new Error('Failed to fetch incomplete tasks');
      }
    },

    task: async (_, { id }) => {
      try {
        const task = await Task.findById(id);
        if (!task) {
          throw new Error('Task not found');
        }
        return task;
      } catch (error) {
        throw new Error('Failed to fetch task');
      }
    },
  },
  Mutation: {
    createTask: async (_, { input } ) => {
      try {
        const { title, description, userId } = input;

        const task = new Task({ title, description,  userId});
        await task.save();
        return task;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to create task '+ error);
      }
    },
    updateTask: async (_, { id, input }) => {
      const { title, description, completed } = input;
        try {
          const task = await Task.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true }
          );
          if (!task) {
            throw new Error('Task not found');
          }
          return task;
        } catch (error) {
          throw new Error('Failed to update task');
        }
      },
      deleteTask: async (_, { id }) => {
        try {
          const task = await Task.findByIdAndRemove(id);
          if (!task) {
            throw new Error('Task not found');
          }
          return task;
        } catch (error) {
          throw new Error('Failed to delete task');
        }
      }, 
  },
};

module.exports = taskResolvers;
