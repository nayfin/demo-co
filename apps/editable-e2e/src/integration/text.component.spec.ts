describe('editable', () => {
  beforeEach(() => cy.visit('/iframe.html?id=textcomponent--primary&knob-backgroundColor&knob-dataStatus=saved&knob-textValue=hello-world'));

  it('should render the component', () => {
    cy.get('editable-text').should('exist').should('contain', 'initial-values');
  });
});
