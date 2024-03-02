const User = require('../Models/User');
const { generateToken } = require('../Helpers/jwtToken');

const register = async (req, res) => {
    const searchEmail = req.body.email;
    const findEmail = await User.findOne({ email: searchEmail });

    if (!findEmail) {
        try {
            const { firstname, lastname, email, password } = req.body;
            const user = new User({
                firstname,
                lastname,
                email,
                password
            });
            await user.save();
            res.status(200).json({ message: "User registered successfully" });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        return res.status(400).json({ message: "Email already in use" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.isPasswordMatched(password))) {
        res.status(200).json({
            message: "User logged in successfully",
            token: generateToken(user?._id)
        });
    } else {
        res.status(400).json({ message: "Invalid credentials" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
}

module.exports = { register, login, deleteUser }