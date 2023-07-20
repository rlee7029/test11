const { AuthenticationError } = require('apollo-server-express');
const { generateToken } = require('../config/auth');
const User = require('../models/User');

const userResolvers = {

  Query: {
    me: async (_, __, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError('User not authenticated');
        }

        // Retrieve the user from the database based on the user ID in the context
        const user = await User.findById(context.user.id);

        // Return the user object
        return user;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to get user');
      }
    },
  },

  Mutation: {
    register: async (_, { input }) => {
      try {
        const { username, password } = input;
      
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error('Username is already taken');
        }

        const newUser = new User({
          username,
          password,
          createdAt: Date.now(),
        });
        await newUser.save();

        // Generate and return a JWT token
        const token = generateToken(newUser._id);
        return {
          token,
          user: newUser,
        };
      } catch (error) {
        console.log(error);
        throw new Error('Failed to register user! '+error);
      }
    },
    login: async (_, { input }) => {
      try {
        const { username, password } = input;

        const user = await User.findOne({ username });
        if (!user) {
          console.log("invalid username");
          throw new AuthenticationError('Invalid username or password');
        }
       

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
          console.log("invalid password")
          throw new AuthenticationError('Invalid username or password');
        }


        const token = generateToken(user._id);
        return {
          token,
          user,
        };
      } catch (error) {
        console.log(error)
        throw new AuthenticationError('Failed to log in '+error);
      }
    },
  },
};

module.exports = userResolvers;
