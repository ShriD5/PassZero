import connectDB from '../middlewares/mongodb';
import modelUser from '../../models/testModel';

// const bcrypt = require('bcrypt');
// const saltRounds = 8;

// var username = 'starbuck';
// var password = 'ldfgkj78%^&appdKO039*';

export default async function handler(req, res) {
  const { method } = req;
  console.log('lowda');
  const User = modelUser(await connectDB());
  console.log('lowda 2');

  switch (method) {
    case 'GET':
      try {
        console.log('lowda Returns');
        const users = await User.find({});
        console.log('Death of lowda');

        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const { email, password } = req.body;

        const user = await User.create({ email, password });
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
