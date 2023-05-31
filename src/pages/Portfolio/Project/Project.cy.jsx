import React from 'react';
import Project from './Project';
import './Project.css';

describe('<Project />', () => {
	// Mount the component and Wait for API call to finish at the start of each test
	beforeEach(() => {
		cy.intercept({
			method: 'GET',
			url: 'https://portfolio-backend.raymondleemv.com/api/projects',
		}).as('getProjects');
		cy.mount(<Project />);
		cy.wait('@getProjects');
	});

	describe('next project button', () => {
		it('should do nothing when going beyond upper limit of projects', () => {
			cy.get('#projects-description-content')
				.find('.project-description')
				.then((projects) => {
					let numProjets = projects.length;
					cy.log(`number of projects is ${numProjets}`);
					for (let i = 0; i < numProjets; ++i) {
						cy.get('#projects-description-next-btn').click();
					}
					cy.get('#current-project-number').should('have.text', numProjets);
				});
		});
		it('should show next project', () => {
			cy.get('#current-project-number').should('have.text', 1);
			cy.get('#projects-description-next-btn').click();
			cy.get('#current-project-number').should('have.text', 2);
		});
	});

	describe('previous project button', () => {
		it('should do nothing when going beyond lower limit of projects', () => {
			cy.get('#projects-description-prev-btn').click();
			cy.get('#current-project-number').should('have.text', 1);
		});
		it('should show previous project', () => {
			cy.get('#projects-description-next-btn').click();
			cy.get('#current-project-number').should('have.text', 2);
			cy.get('#projects-description-prev-btn').click();
			cy.get('#current-project-number').should('have.text', 1);
		});
	});
});
