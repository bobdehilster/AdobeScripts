#include "TPM.jsx";

var doc = getDoc();
var w = doc.width;
var h = doc.height;

var size = 4.5;
var num = 150;
var width = 100;
var height = 300;
var thickness = 20;

drawEllipse(doc,num,size,width,height,thickness,((w-width)/2)+(thickness/4),h/2,"white");
var x = 100;
var y = 50;
drawEllipse(doc,num,size,width,height,thickness,((w-width)/2)+(thickness/4)+x,h/2+y,"white");