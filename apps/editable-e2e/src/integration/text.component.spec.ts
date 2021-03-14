describe('editable', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textcomponent--primary&knob-backgroundColor&knob-uiState=displaying&knob-textValue'));

  it('should render the component with correct background-color', () => {
    cy.get('editable-text').should('exist')
      .should('have.css', 'background-color', 'rgb(208, 176, 218)');
  });
});
