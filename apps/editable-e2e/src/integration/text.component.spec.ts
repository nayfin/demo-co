describe('editable', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textcomponent--primary&knob-backgroundColor&knob-isUpdating&knob-textValue=initial-value'));

  it('should render the component', () => {
    cy.get('editable-text')
      .should('exist')
      .should('contain', 'initial-value');
  });
});
