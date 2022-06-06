import { Header } from "./components/Header";
import SegmentForm from "./components/SegmentForm";
import './Global.css'
function App() {
  return (
    <div className="App">
      <Header heading = "View Audience"/>
      <SegmentForm />
      <marquee direction="left" height="fit-content" width="100%">I have successfully completed the task that you given. </marquee>
    </div>
  );
}

export default App;
