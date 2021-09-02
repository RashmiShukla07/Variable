exports.getDate = function (){
  const Today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  return Today.toLocaleDateString("en-US", options);
}

exports.getDay = function(){
  const Today = new Date();
  const options = {
    weekday: "long"
  };
  return Today.toLocaleDateString("en-US", options);
}
