class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async getUserDetails(req, res) {
        try {
            const userId = req.user.id; // Assuming user ID is stored in req.user by auth middleware
            const user = await this.userModel.findById(userId).select('-password'); // Exclude password from response
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.user.id;
            const updates = req.body; // Assuming body contains the fields to update
            const user = await this.userModel.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

export default UserController;