const Formidable = require('formidable');
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
    const form = new Formidable.IncomingForm({ uploadDir: __dirname + "/../../frontend/public/uploads", keepExtensions: true, multiples: true, createDirsFromUploads: true })
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Form parsing failed!")
      }
      const getVal = val => Array.isArray(val) ? val[0] : val
      const photos = files.photos.map(item => '/uploads/' + item.newFilename)
      const video = files.video ? '/uploads/' + getVal(files.video).newFilename : ""
      const category = getVal(fields.category);
      const client = getVal(fields.client);
      const clientPublic = getVal(fields.clientPublic);
      const description = getVal(fields.description);
      const name = getVal(fields.name);
      const skills = getVal(fields.skills).split(',');
      Project.create({ name, description, client, clientPublic, skills, photos, video, category })
        .then(pro => {
          res.send(pro)
        })
        .catch(err => {
          console.log(err);
          return res.status(500).send("failed!")
        })
    })
  } catch (err) {
    res.status(500).json({ error: 'Project creation failed' });
  }
};

// PUT /projects/:id – Update an existing project
exports.updateProject = async (req, res) => {
  try {
    const form = new Formidable.IncomingForm({ uploadDir: __dirname + "/../../frontend/public/uploads", keepExtensions: true, multiples: true, createDirsFromUploads: true })
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Form parsing failed!")
      }
      const getVal = val => Array.isArray(val) ? val[0] : val
      const photos = files.photos? files.photos.map(item => '/uploads/' + item.newFilename): []
      const video = files.video ? '/uploads/' + getVal(files.video).newFilename : ""
      const category = getVal(fields.category);
      const client = getVal(fields.client);
      const clientPublic = getVal(fields.clientPublic);
      const description = getVal(fields.description);
      const name = getVal(fields.name);
      const id = getVal(fields.id);
      const skills = fields.skills? getVal(fields.skills).split(','): []
      Project.findByPk(id)
      .then(pro => {
        if (!pro) return res.status(404).json({ message: 'Project not found' });
        pro.update({ name, description, client, clientPublic, skills, category });
        if(photos.length > 0)pro.update({photos})
        if(video)pro.update({video})
        res.json(pro);
      })
    })
  } catch(e) {
    console.log(e);
    res.status(500).send("err")
  }
}

  // DELETE /projects/:id – Delete a project
  exports.deleteProject = async (req, res) => {
    try {
      const project = await Project.findByPk(req.params.id);
      if (!project) return res.status(404).json({ message: 'Project not found' });

      await project.destroy();
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete project', error });
    }
  };
