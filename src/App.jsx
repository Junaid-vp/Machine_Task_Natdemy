import { Outlet } from "react-router-dom";
import properties from "./data/properties.json";
 console.log(properties);
const App = () => {
  return (
    <>
   


      <Outlet />
    </>
  );
};

export default App;