describe('editable', () => {
  beforeEach(() => cy.visit('/iframe.html?id=colorfulbuttoncomponent--primary&knob-label=CLICK&knob-backgroundColor&knob-labelColor'));

  it('should render the component', () => {
    cy.get('editable-colorful-button').should('exist');
  });
});
