describe('editable', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textcomponent--primary&knob-backgroundColor&knob-dataStatus=saved&knob-textValue'));

  it('should render the component', () => {
    cy.get('editable-text').should('exist');
  });
});
