require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const taskSchema = require('./schemas/taskSchema');
const userSchema = require('./schemas/userSchema');
const taskResolvers = require('./resolvers/taskResolvers');
const userResolvers = require('./resolvers/userResolvers');
const { generateToken, verifyToken } = require('./config/auth');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const crypto = require('crypto');
const cors = require('cors');
const path = require('path')

connectDB();

const app = express();

// Generate a random nonce value
const nonce = crypto.randomBytes(16).toString('base64');

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs: [taskSchema, userSchema],
  resolvers: [taskResolvers, userResolvers],
  context: async ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token && token.length > 10) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = userId ? await User.findById(userId) : null;
        return {
          userId,
          user,
          generateToken,
          comparePassword: User.comparePassword,
        };
      } catch (error) {
        //console.log(error);
      }
    }
  },
});
// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, 'client/build')));

// Your other Express routes go here

app.use(cors());
app.use((req, res, next) => {
  res.set('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'`);
  next();
});

// Catch-all route for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


// Define route for creating a PaymentIntent
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation',
            },
            unit_amount: 500, // 500 cents corresponds to $5
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Redirect URL after successful payment
      cancel_url: 'http://localhost:3000/cancel', // Redirect URL after canceled payment
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Checkout Session:', error);
    res.status(500).json({ error: 'An error occurred while creating the Checkout Session' });
  }
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`GraphQL endpoint: ${server.graphqlPath}`);
  });
});
