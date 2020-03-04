import App from './App';

// import PetController from './controllers/PetController';
import UserController from './controllers/UserController';

const controllers = [
    // new PetController(), 
    new UserController()
];
const app = new App(controllers, 3000);

app.listen();

export default app;