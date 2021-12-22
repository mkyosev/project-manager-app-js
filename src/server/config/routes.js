const authController = require('../controllers/authController');
const projectsController = require('../controllers/projectsController');

module.exports = (app) => {
    app.use('/api/v1/auth', authController);    
    app.use('/api/v1/projects', projectsController);    
}