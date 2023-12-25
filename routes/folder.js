const { createFolder } = require('../controllers/folder');
const { asyncHandler } = require('../middlewares/asyncHandler');

const router = require('express').Router();

// router.post('/:name', asyncHandler((req, res) => {
//     const { userId } = req.locals;
//     const { name } = req.params;
//     return createFolder(userId, name);
// }))