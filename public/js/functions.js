// bloggApp initiliazed in app.js as res.locals.bloggApp

// Functions
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