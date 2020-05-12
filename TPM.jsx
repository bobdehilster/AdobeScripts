function getDoc() {
    var doc;
    if (app.documents.length == 0) {
        doc = app.documents.add(DocumentColorSpace.CMYK, 792.0, 612.0);
     } else {
        doc = app.activeDocument;
    }

    doc.defaultFilled = true;
    doc.defaultStroked = true;
        
    //var debugStyle = doc.characterStyles.add("debug");
    //var charAttr = debugStyle.characterAttributes;
    //charAttr.size = 8;

    return doc;
}

function g1(doc,group_g1,top,left,size,angle,scale,color,stroke,jetWidth) {
    var ctop = top - size / 2; 
    var cleft = left + size / 2;
    var min = 6.8;

    var factor = 9;
    var combo = 1 + Math.random() * 6;
    var l1 = 0;
    var l2 = 0;
    var l3 = 0;

    if (combo <= 1) {
        l1 = true;
    } else if (combo <= 2) {
        l2 = true;
    } else if (combo <= 3) {
        l3 = true;
    } else if (combo <= 4) {
        l1 = true;
        l2 = true;
    } else if (combo <= 5) {
        l1 = true;
        l3 = true;
    } else if (combo <= 6) {
        l2 = true;
        l3 = true;
    } else {
        l1 = true;
        l2 = true;
        l3 = true;
    }

    var len = Math.random() * factor + min;
    if (l1 == true) addLine(group_g1,cleft+1.8,ctop-3,cleft+1.5,ctop-len,jetWidth); // 7.4
    len = Math.random() * factor+ min;
    if (l2 == true) addLine(group_g1,cleft+0.2,ctop-3.5,cleft+0.3,ctop-len,jetWidth);  // 6.8
    len = Math.random() * factor + min;
    if (l3 == true) addLine(group_g1,cleft-1,ctop-3.3,cleft-0.6,ctop-len,jetWidth); // 10

    var circle = group_g1.pathItems.ellipse(top,left,size,size,false,true);
    circle.strokeWidth = stroke;
    circle.fillColor = colorByName(color);
    group_g1.rotate(angle);
    group_g1.resize(
        scale, // x
        scale, // y
        true, // changePositions
        false, // changeFillPatterns
        false, // changeFillGradients
        true, // changeStrokePattern
        scale // changeLineWidths
    );
}

function sun(doc,group_sun,top,left,side,scale,color,opacity) {
    var number = Math.ceil(Math.random() * 5) + 3;
    var vart = 0;
    var varl = 0;

    var noColor = new NoColor();

    for (var i = 0; i < number; i++) {
        vart = 6 - Math.random()*3;
        varl = 6 - Math.random()*3;
        
        var circle = group_sun.pathItems.ellipse(top+vart, left+varl, side, side, false, true);
        circle.strokeWidth = 0.3;
        if (i == 0)
            circle.fillColor = colorByName(color);
        else
            circle.fillColor = noColor;
        circle.opacity = opacity;
    }
    group_sun.resize(
        scale, // x
        scale, // y
        true, // changePositions
        false, // changeFillPatterns
        false, // changeFillGradients
        true, // changeStrokePattern
        scale // changeLineWidths
    );
}

function drawEllipse(doc, number, size, width, height, thickness, xorg, yorg, color)
{
    var group_ellipse = doc.groupItems.add();
   
    for (var i = 0; i < number; i++)
    {
        var ang = Math.random()*360;
        var rad = (ang * Math.PI)/180;
        var w = width - thickness + Math.random() * thickness;
        var h = height - thickness + Math.random() * thickness;
        var x = (w/2) * Math.cos(rad) + xorg;
        var y = (h/2) * Math.sin(rad) + yorg;
        //pointText(doc,ang.toPrecision(4).toString()+" "+angle.toPrecision(4).toString(),x+8,y);
        scale = 70 + (Math.random() * 30);
        var group_g1 = group_ellipse.groupItems.add();
        g1(doc,group_g1,y,x,size,ang-10,scale,color,0.7,0.2);
     }
}

function drawPerpLinesCircle(doc, number, radius, length, thickness, xc, yc)
{
    var group_lines = doc.groupItems.add();
    var circle = group_lines.pathItems.ellipse(yc+radius/2,xc-radius/2,radius,radius);
    circle.strokeWidth = thickness;
    
    var degree = 360 / number;
    var arrowAngle = 17;
    var arrowLength = 5;

     for (var i = 0; i < number; i++)
    {
        var angle = i * degree;
        var rad = (angle * Math.PI)/180;
        var x1 = (radius/2) * Math.cos(rad) + xc;
        var y1 = (radius/2) * Math.sin(rad) + yc;
        var x2 = ((radius+length)/2) * Math.cos(rad) + xc;
        var y2 = ((radius+length)/2) * Math.sin(rad) + yc;
        var line = addLine(group_lines,x1,y1,x2,y2,thickness);
        var rad1 = ((angle-arrowAngle) * Math.PI)/180;
        var xa = x1 + (arrowLength * Math.cos(rad1));
        var ya = y1 + (arrowLength * Math.sin(rad1));
        var line1 = addLine(group_lines,x1,y1,xa,ya,thickness);
        var rad2 = ((angle+arrowAngle) * Math.PI)/180;
        var xb = x1 + (arrowLength * Math.cos(rad2));
        var yb = y1 + (arrowLength * Math.sin(rad2));
        var line1 = addLine(group_lines,x1,y1,xb,yb,thickness);
    }
}

function drawPerpLinesCircleShadow(doc, number, radius, length, thickness, xc, yc)
{
    var group_lines = doc.groupItems.add();
    var circle = group_lines.pathItems.ellipse(yc+radius/2,xc-radius/2,radius,radius);
    circle.strokeWidth = thickness;
    
    var degree = 360 / number;
    var arrowAngle = 17;
    var arrowLength = 5;

     for (var i = 0; i < number; i++)
    {
        var angle = i * degree;
        var scale = 30 + angle*7/18;
        if (angle > 180) scale = 30 + (360 - angle*7/18);
        var rad = (angle * Math.PI)/180;
        var x1 = (radius/2) * Math.cos(rad) + xc;
        var y1 = (radius/2) * Math.sin(rad) + yc;
        var x2 = ((radius+length)/2) * Math.cos(rad) + xc;
        var y2 = ((radius+length)/2) * Math.sin(rad) + yc;

        var line = addLine(group_lines,x1,y1,x2,y2,thickness);
        line.resize(scale,scale,true,false,false,true,scale);

        var rad1 = ((angle-arrowAngle) * Math.PI)/180;
        var xa = x1 + (arrowLength * Math.cos(rad1));
        var ya = y1 + (arrowLength * Math.sin(rad1));
        var line1 = addLine(group_lines,x1,y1,xa,ya,thickness);
        line1.resize(scale,scale,true,false,false,true,scale);

        var rad2 = ((angle+arrowAngle) * Math.PI)/180;
        var xb = x1 + (arrowLength * Math.cos(rad2));
        var yb = y1 + (arrowLength * Math.sin(rad2));
        var line2 = addLine(group_lines,x1,y1,xb,yb,thickness);
        line2.resize(scale,scale,true,false,false,true,scale);
    }
}

function sunLinePerspective(doc, number, size, x1, y1, x2, y2, opacity) {
    var group_suns = doc.groupItems.add();

    var ystep = (y2 - y1) / number;
    var xstep = (x2 - x1) / number;
    var factor = 0.75;
    var yper = ystep;
    var xper = xstep;
    var y = y1;
    var x = x1;
    var scale = 100;

    for (var i = 0; i < number; i++) {
        var group_sun = group_suns.groupItems.add();
        sun(doc,group_sun,y,x,size,scale,"yellow",opacity);
        y = y + yper;
        x = x + xper;
        scale = scale * factor;
        yper = yper * factor;
        xper = xper * factor;
    }
}

function sunRadial(doc, number, sizeSun, size, xin, yin, scale, radius, color, stroke, jetWidth) {
    var group_sun_radial = doc.groupItems.add();

    for (var i = 0; i < number; i++) {
        var ang = Math.random()*360;
        var rad = (ang * Math.PI)/180;
        //var len = Math.random()*(radius-sizeSun) + sizeSun/2;
        var len = i*i/number + sizeSun/2;
        x = len * Math.cos(rad) + xin;
        y = len * Math.sin(rad) + yin;
        var group_g1 = group_sun_radial.groupItems.add();
        g1(doc,group_g1,y,x,size,ang-90,100,color,stroke,jetWidth);
    }
    var group_sun = group_sun_radial.groupItems.add();
    sun(doc,group_sun,yin,xin - sizeSun/1.5,sizeSun,100,"yellow",100);
    
    group_sun_radial.resize(scale,scale);
    group_sun_radial.opacity = (100 - scale) / 3 + scale;
}

function sunsRadial(doc, numSun, sunSize, numG1s, color, size, stroke, jetWidth, radius, width, height, min, max) {
    var w = doc.width;
    var h = doc.height;
    var scales = [];

    for (var i = 0; i < numSun; i++) {
        scales.push(min + Math.round(Math.random() * (max - min)));
    }
    scales.sort(function(a, b){return a-b});

    for (var i = 0; i < numSun; i++) {
        top = Math.round(Math.random() * height) + (h - height)/2;
        left = Math.round(Math.random() * width) + (w - width)/2;
        scale = scales[i];
    
        var sun = sunRadial(doc,numG1s,sunSize,size,left,top,scale,radius,color,stroke,jetWidth);
    }
}

function field(doc, obj, color, num, size, min, max, width, height) {
    var w = doc.width;
    var h = doc.height;
    var group_field = doc.groupItems.add();

    for (var i = 0; i < num; i++) {
        top = Math.round(Math.random() * height) + (h - height)/2;
        left = Math.round(Math.random() * width) + (w - width)/2;
        angle = Math.round(Math.random() * 360);
        scale = min + Math.round(Math.random() * (max - min));
    
        if (obj == 'sun')
            sun(doc,top,left,size,scale,color);
        else
            g1(doc,top,left,size,angle,scale,color);
    }
}

function colorByName(colorName) {
    var colorRef = new RGBColor();

    switch (colorName) {
        case 'blue':
            colorRef.red = 0;
            colorRef.green = 0;
            colorRef.blue = 255;
            break;
        case 'red':
            colorRef.red = 255;
            colorRef.green = 0;
            colorRef.blue = 0;
            break;
        case 'black':
            colorRef.red = 0;
            colorRef.green = 0;
            colorRef.blue = 0;
            break;        
        case 'white':
            colorRef.red = 255;
            colorRef.green = 255;
            colorRef.blue = 255;
            break;
        case 'gray':
            colorRef.red = 180;
            colorRef.green = 180;
            colorRef.blue = 180;
            break;
        case 'yellow':
            colorRef.red = 255;
            colorRef.green = 255;
            colorRef.blue = 0;
            break;
        default:
          console.log('Sorry, we are out of ' + colorName + '.');
    }
    return colorRef;
}

function addLine(group, x1, y1, x2, y2, thickness)
{
    liners = group.pathItems.add();
    liners.strokeWidth = thickness;
    liners.setEntirePath([[x1,y1],[x2,y2]]);
    return liners;
}

function pointText(doc, tex, x, y)
{
	// Point Text
    var pointText = doc.textFrames.add();
	pointText.contents = tex;
	pointText.top = y;
    pointText.left = x;

    //var debugStyle = doc.characterStyles.getByName("debug");
    //debugStyle.applyTo(pointText.textRange);
}