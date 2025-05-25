'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('projects', [
      {
        id: 1,
        name: "VB Advanced Jobs System",
        description: "A comprehensive jobs system with unique progression mechanics and dynamic missions for roleplaying servers.",
        client: "MidwestRP",
        clientPublic: 1,
        category: "scripts",
        skills: JSON.stringify(["QBCore", "ESX Compatible", "Lua", "HTML/CSS/JS"]),
        photos: JSON.stringify(["/vortex-logo.png", "/vortex-3.png"]),
        video: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: "Metro Police Department HQ",
        description: "Detailed MLO of a modern police headquarters with integrated features for law enforcement roleplay.",
        client: "LosVentures RP",
        clientPublic: 1,
        category: "mlo",
        skills: JSON.stringify(["3D Modeling", "MLO", "Interior Design"]),
        photos: JSON.stringify(["/vortex-3.png", "/vortex-2.png"]),
        video: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: "VB Phone System",
        description: "Modern smartphone interface with apps, messaging, social media, and business integrations.",
        client: "GrandState RP",
        clientPublic: 1,
        category: "ui",
        skills: JSON.stringify(["HTML/CSS", "React", "Lua Integration", "Real-time Updates"]),
        photos: JSON.stringify(["/monzo1.png", "/robot.png"]),
        video: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: "Complete Server Setup",
        description: "Full server deployment with custom economy, jobs, and unique gameplay features.",
        client: "NeonCity RP",
        clientPublic: 1,
        category: "server",
        skills: JSON.stringify(["QBCore", "Server Configuration", "Database Management", "Custom Scripts"]),
        photos: JSON.stringify(["/vortex-2.png", "/vortex-logo.png"]),
        video: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('projects', null, {});
  }
};
