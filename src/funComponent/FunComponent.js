export const FunComponent = (prop) => {
  return (
    <div className="App">
      {/* if(prop.name){
        return prop.name;
      }else{
        return "none";
      } */}
      app with prop {prop.name || 'none'}
    </div>
  );
}
