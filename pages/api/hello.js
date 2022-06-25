import nextConnect from 'next-connect';
import middleware from '../middlewares/mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  res.send('h');
});

export default handler;
