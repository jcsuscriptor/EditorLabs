Blockly.Blocks['control_avanzar'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("Avanzar");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['control_girar_izquierda'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("girar a izquierda");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(90);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['control_girar_derecha'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("girar a derecha");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(225);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};