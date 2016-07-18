 
var myElement = document.getElementById("ElementoAsociarEvento");

$("#ElementoAsociarEvento").bind('userLogin', { foo : 'bar' }, function(e, arg1, arg2) {
    console.log(e.data.foo); // 'bar'
    console.log(arg1); // 'bim'
    console.log(arg2); // 'baz'

    console.debug("Event is: ", e); 
    console.debug(e);
});

$("#ElementoAsociarEvento").trigger('userLogin', [ 'bim', 'baz' ]);

 