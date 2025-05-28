'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('services', [
      {
        name: "Chain",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-1.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "cars",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-2.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "trucks",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-5.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "vest",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-4.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "MLO",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-2.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "men's clothing",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-5.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "women's clothing",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-1.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "gun packs",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-4.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "patchs",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-2.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "posters",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-1.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "bikes",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-5.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "thumbnails",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-1.png",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "maps",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-4.png",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('services', null, {});
  }
};
