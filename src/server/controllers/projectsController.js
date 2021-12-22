const router = require('express').Router();
const auth = require('../middlewares/auth');
const projectsService = require('../services/project');

router.get("/all", async (req, res) => {
    const projects = await projectsService.getAllPublicProjects();
    res.status(200).json(projects);
});

router.get("/:id", async (req, res) => {
    const project = await projectsService.getProjectById(req.params.id);
    res.status(200).json(project);
});

router.post('/create', auth, async (req, res) => {
    try {
        const { name, description, imageUrl, public } = req.body;
        const project = await projectsService.createProject(name, description, imageUrl, req.user.user_id, public);
        res.status(200).json(project);
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }

});

router.post('/addmember', auth, async (req, res) => {
    try {
        const { projectId, email } = req.body;
        console.log(projectId, email);
 
        const updatedProject = await projectsService.addMemberToProject(projectId, email);
        res.status(200).json(updatedProject);
        
    } catch (error) {
        console.log(error);
        res.status(400).send("An error has occured while adding a new member to the project!");
    }
});

router.post('/removemember', auth, async (req, res) => {
    try {
        const { projectId, email } = req.body;
        const groupMembers = await projectsService.removeMemberFromProject(projectId, email);
        res.status(200).json(groupMembers);
    } catch (error) {
        console.log(error);
        res.status(400).send("An error has occured while removing a member from the project!");
    }
});

router.post('/delete', auth, async (req, res) => {
    try {
        const { projectId } = req.body;
        const result = await projectsService.deleteProject(projectId);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).send("An error has occured while deleting the project!");
    }
});


router.post('/edit', auth, async (req, res) => {
    try {
        const { projectId, name, description, imageUrl, public, data } = req.body;
        let project = {};
        console.log(req.body);
        if (data) {
            const updateData = {
                name,
                description,
                imageUrl,
                public,
                data
            }
            project = await projectsService.editProject(projectId, updateData);
        } else {
            const updateData = {
                name,
                description,
                imageUrl,
                public
            }
            project = await projectsService.editProject(projectId, updateData);
        }
        res.status(200).json(project);
    } catch (error) {
        console.log(error);
        res.status(400).send("An error has occured while editing the project!");
    }
});

module.exports = router;