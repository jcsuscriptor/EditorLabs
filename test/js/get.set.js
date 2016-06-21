function Product(name,price) {
  this.name = name;
  this.price = price;
//this.discount = 0; // <- remove this line and refactor with the code below
  var _discount; // private member
  Object.defineProperty(this,"discount",{
    get: function() { return _discount; },
    set: function(value) { _discount = value; if(_discount>80) _discount = 80; }
  });
}


alert('hola')