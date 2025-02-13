import ChartPanel from "./components/ChartPanel";
import Header from "./components/Header";
import MetricsPanel from "./components/MetricsPanel";

export function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col p-4 gap-y-8">
        <MetricsPanel experimentId={null}/>
        <ChartPanel experimentId={null} />
      </div>
    </>
  )
}
