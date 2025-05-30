const { Service } = require('../db');

// GET /services – List all services
exports.getAllServices = async (req, res) => {
  try {
    const serviceList = await Service.findAll();
    const services = serviceList.map(item => { return { ...item.dataValues, product: "" } })
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch services', error });
  }
};

// GET /services/:id – Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const serviceList = await Service.findByPk(req.params.id);
    if (!serviceList) return res.status(404).json({ message: 'Service not found' });
    const services = serviceList.map(item => { return { ...item.dataValues, product: "" } })
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch service', error });
  }
};

// POST /services – Create a new service
exports.createService = async (req, res) => {
  try {
    Service.create(req.body)
      .then(proj => res.send(proj))
      .catch(err => {
        console.log(err);
        res.status(500).send("failed to create service")
      })
  } catch (err) {
    res.status(500).json({ error: 'Service creation failed' });
  }
};

// PUT /services/:id – Update an existing service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.body
    Service.findByPk(id)
      .then(proj => {
        if (!proj) return res.status(400).send({ message: "service not found" })
        proj.update(req.body)
          .then(pro => res.send(pro))
          .catch(err => {
            console.log(err);
            res.status(500).send("failed updating service")
          })
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("faild to update service")
      })
  } catch (e) {
    console.log(e);
    res.status(500).send("err")
  }
}

// DELETE /services/:id – Delete a service
exports.deleteService = async (req, res) => {
  try {
    console.log(req.user);
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    await service.destroy();
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error });
  }
};
