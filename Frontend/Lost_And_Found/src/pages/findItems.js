function findItems(items, filter, searchVal){
  if(Object.keys(items).length === 0)   return null;
  
  if(searchVal === ""){
    Object.entries(items).forEach(element => {
      console.log(element);
      
      
    });
  }else{
    
  }
  return items;
}

export default findItems;