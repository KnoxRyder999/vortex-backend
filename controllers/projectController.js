const { Project } = require('../db');

// GET /projects – List all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch projects', error });
  }
};

// GET /projects/:id – Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch project', error });
  }
};

// POST /projects – Create a new project
exports.createProject = async (req, res) => {
  try {
    Project.create(req.body)
      .then(proj => res.send(proj))
      .catch(err => {
        console.log(err);
        res.status(500).send("failed to create project")
      })
  } catch (err) {
    res.status(500).json({ error: 'Project creation failed' });
  }
};

// PUT /projects/:id – Update an existing project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.body
    Project.findByPk(id)
      .then(proj => {
        if (!proj) return res.status(400).send({ message: "project not found" })
        proj.update(req.body)
          .then(pro => res.send(pro))
          .catch(err => {
            console.log(err);
            res.status(500).send("failed updating project")
          })
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("faild to update project")
      })
  } catch (e) {
    console.log(e);
    res.status(500).send("err")
  }
}

// DELETE /projects/:id – Delete a project
exports.deleteProject = async (req, res) => {
  try {
    console.log(req.user);
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.destroy();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error });
  }
};
