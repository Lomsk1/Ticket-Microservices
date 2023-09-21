import express from 'express';

const router = express.Router();

router.post('/api/v1/users/sighout', (req, res) => {
    res.send("hi there")
});

export { router as signoutRouter };
