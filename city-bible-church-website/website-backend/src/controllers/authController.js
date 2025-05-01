class AuthController {
    constructor(User) {
        this.User = User;
    }

    async register(req, res) {
        const { username, password } = req.body;

        try {
            const existingUser = await this.User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const newUser = new this.User({ username, password });
            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await this.User.findOne({ username });
            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = user.generateAuthToken();
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}

export default AuthController;