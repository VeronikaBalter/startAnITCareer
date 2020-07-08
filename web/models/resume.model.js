module.exports = (sequelize, Sequelize) => {
    const Resume = sequelize.define("resume", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      typeOfEmploymentId:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      about:{
        type: Sequelize.STRING  
      },
      salary:{
        type: Sequelize.INTEGER
      }

      
    });
  
    return Resume;
  };