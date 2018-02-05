require(['local'], function(local){
    console.log(local);
    var olocal = new local.local();
    olocal.start();
});