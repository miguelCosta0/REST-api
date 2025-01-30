'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
async up (queryInterface, Sequelize) {
    await queryInterface.createTable('photos', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        original_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        file_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        aluno_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'alunos',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false
        }
    })
},

async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('photos');
}
};
