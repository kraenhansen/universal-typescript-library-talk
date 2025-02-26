import { Greeter } from "my-lib";
// import "my-lib/experimental-yell";

const greeter = new Greeter();

import "./App.css";

function App() {
  return (
    <>
      <h1>My Awesome App</h1>
      <h2>{greeter.greet()}</h2>
    </>
  );
}

export default App;
