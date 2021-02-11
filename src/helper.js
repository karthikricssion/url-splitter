// Helper funtions

function isEmpty(str) {
    if (typeof str !== 'undefined' && str) {
        return false
    }
  
    return true
}
  
module.exports = {
    isEmpty: isEmpty
}
  