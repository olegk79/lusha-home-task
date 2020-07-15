module.exports = (req,paramsList) => {
    let missingParams = [];
    paramsList.forEach(param=>{
        if(!req[param]) {
            missingParams.push(param);
        }
    });
    return missingParams;
};