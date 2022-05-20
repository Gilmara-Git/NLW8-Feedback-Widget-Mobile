import express from 'express';
import { routes } from './routes';
import cors  from 'cors';


const app = express();

app.use(cors({
    origin:'http://localhost:3000'
}));
app.use(express.json()); // middleware 
app.use(routes);

app.listen(3333, ()=>{
    console.log('I am a function that indicates the Http server is running')
});
