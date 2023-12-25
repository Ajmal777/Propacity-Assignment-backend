const { register, allUsers, login } = require('../controllers/user');
const { asyncHandler } = require('../middlewares/asyncHandler');

const router = require('express').Router();

router.post('/register', asyncHandler((req, res) => {
    return register(req.body);
}));
router.post('/login', asyncHandler((req, res) => {
    return login(req.body);
}));
router.get('/', asyncHandler((req, res) => {
    return allUsers();
}))

module.exports = router;