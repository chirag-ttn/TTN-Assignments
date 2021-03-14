function areaCircle(radius) {
    let area = Math.PI * Math.pow(radius, 2);
    // console.log('Area of the circle is ' + area);
    return area;
}

function areaRectangle(length, breadth) {
    let area = length * breadth;
    // console.log('Area of the rectangle is ' + area);
    return area;
}

function areaCylinder(radius, height) {
    let area = 2 * Math.PI * Math.pow(radius, 2) + (2 * Math.PI * radius * height);
    // console.log('Area of the Cylinder is ' + a + ' square unit');
    return area;
}

export {
    areaCircle,
    areaCylinder,
    areaRectangle
}