// myFunctions initiliase in app.js as global myFunctions.function()
module.exports = {
    sortDescDate: function(a, b) {
        if (a.date < b.date) {
            return 1;
        }
        if (a.date > b.date) {
            return -1;
        }
        return 0;
    }
};