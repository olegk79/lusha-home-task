/*require routes*/

const routesList = [
    "getUsers","addUser"
];

const routesArr = [];

routesList.forEach(route => {
    routesArr.push(require(`./${route}`));
});


module.exports = routesArr;