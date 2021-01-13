function _new() {
    var constructor = Array.prototype.shift.call(arguments);
    var obj = Object.create(constructor.prototype);
    var result = constructor.apply(obj, arguments);
    return result instanceof Object ? result : obj;
}

function People(name, age) {
    this.name = name;
    this.age = age;
}
var p1 = _new(People, "xiaoming", 11);
console.log(p1);