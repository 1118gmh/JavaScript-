let sum = require('./A').sum;
let avg = (...arg) => {
    return sum(...arg) / arg.length;
};
exports.avg = avg;