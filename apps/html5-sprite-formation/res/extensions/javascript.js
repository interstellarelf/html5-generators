


Object.prototype.Type = function(){

  if(this instanceof Array)
  {
    return 'Array';
  }
  else if(this instanceof Object && this.constructor.name !== 'Object')
  {
    return 'Object';
  }
  else {

    

  }

};
