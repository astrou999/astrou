import { NavBar } from "./componentsPlay/NavBar";
import { Notfound } from "./componentsPlay/Notfound";
import { Footer } from "./componentsPlay/Footer";

function NotFound() {
  return (
    <div style={{height: "100%", overflow: "hidden"}}>
      <NavBar />
      <Notfound />
      <Footer />
    </div>
  );
}

export default NotFound;