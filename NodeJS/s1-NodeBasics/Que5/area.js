

exports.rectangle = (length,breadth)=>{
    return length*breadth;
}
exports.square = (side)=>{
    return side*side;
}
exports.circle = (radius)=>{
    return Math.PI*this.square(radius);
}