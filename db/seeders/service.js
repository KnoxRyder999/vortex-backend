'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('services', [
      {
        name: "Chain",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-1.png",
      },
      {
        name: "cars",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-2.png",
      },
      {
        name: "trucks",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-5.png",
      },
      {
        name: "vest",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-4.png",
      },
      {
        name: "MLO",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-2.png",
      },
      {
        name: "men's clothing",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-5.png",
      },
      {
        name: "women's clothing",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-1.png",
      },
      {
        name: "gun packs",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-4.png",
      },
      {
        name: "patchs",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-2.png",
      },
      {
        name: "posters",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-1.png",
      },
      {
        name: "bikes",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-5.png",
      },
      {
        name: "thumbnails",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-1.png",
      },
      {
        name: "maps",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        photo: "vortex-4.png",
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('services', null, {});
  }
};
