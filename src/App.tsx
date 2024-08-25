import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="App">
      <div className="bg-background-primary text-content-primary">
        <h1 className="text-heading-large text-brand-primary">제목</h1>
        <p className="text-paragraph-base text-content-secondary">본문 내용</p>
        <button className="bg-feature-easy text-core-white">쉬운 난이도</button>
      </div>
    </div>
  );
}

export default App;
