#include "TPM.jsx";

var number = Number(prompt("Number of G1s","50"));
var color = prompt("Color?","white");
var width = prompt("Width?","500");
var height = prompt("Height?","6");

field(getDoc(),"g1",color,number,6,50,100,width,height);