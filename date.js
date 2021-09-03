exports.getDate = function (){
  const Today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  return Today.toLocaleDateString("en-US", options);
}

exports.getTime = function(){
var today = new Date();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return  time
}

exports.getDay = function(){
  const Today = new Date();
  const options = {
    weekday: "long"
  };
  return Today.toLocaleDateString("en-US", options);
}
