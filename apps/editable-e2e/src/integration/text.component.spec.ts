describe('editable', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textcomponent--primary&knob-state=editing&knob-textValue&knob-validators'));

  it('should render the component', () => {
    cy.get('editable-text').should('exist');
  });
});
