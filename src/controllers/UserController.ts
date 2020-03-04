import * as express from 'express';
import { User } from '../models/User/User';

class UserController {
    public path = '/user';
    public router: express.Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        // UserController middleware
        this.router.use(this.validateInput);

        // Controller endpoints
        this.router.post(this.path + '/login', this.login);
        this.router.post(this.path, this.createUser);
        this.router.get(this.path, this.getAllUsers);
        this.router.get(this.path + '/:id', this.getUser);

        this.router.put(this.path + '/:id', this.updateUser);

        this.router.delete(this.path + '/:id', this.deleteUser);
    }

    public validateInput(req: express.Request, res: express.Response, next: express.NextFunction) {
        const params = { id: req.url.split('/')[2] };
        switch (req.method) {
            case 'GET':
                break;
            case 'DELETE':
                if (!params.id) { return res.status(400).send({ message: 'Id is required' }); }
                break;
            case 'POST':
                if (Object.keys(req.body).length === 0) { return res.status(400).send({ message: "Request body can't be empty" }); }
                break;
            case 'PUT':
                if (!params.id) { return res.status(400).send({ message: 'Id is required' }); }
                if (Object.keys(req.body).length === 0) { return res.status(400).send({ message: "Request body can't be empty" }); }
                break;
        }
        next();
    }
    public async login(req: express.Request, res: express.Response) {
        const loginData = req.body;
        const user = await User.findOne(
            {
                NAME: loginData.name,
                EMAIL: loginData.email,
            });
        if (user && user.PASSWORD == loginData.password) {
            return res.send('login');
        } else {
            return res.send('wrong credentials');
        }
    }

    public async createUser(req: express.Request, res: express.Response) {
        const userData = req.body;
        const user = new User();
        user.EMAIL = userData.email;
        user.NAME = userData.name;
        user.PASSWORD = userData.password; // This should be encrypted!
        user.save();

        return res.send(user);
    }

    public async getAllUsers(req: express.Request, res: express.Response) {
        const clients = await User.find();
        return res.send(clients);
    }

    public async getUser(req: express.Request, res: express.Response) {
        const client = await User.findOne(req.params.id);
        return res.send(client);
    }



    public async updateUser(req: express.Request, res: express.Response) {
        const user = await User.findOne(req.params.id);
        if (user !== undefined) {
            await User.update(req.params.id, req.body);
            return res.status(200).send({ message: 'User updated correctly' });
        }

        return res.status(404).send({ message: 'User not found' });
    }

    public async deleteUser(req: express.Request, res: express.Response) {
        User.delete(req.params.id);
        return res.status(200).send({ message: 'User deleted successfully' });
    }
}

export default UserController;