import { useEffect, useState } from 'react';
import loadData from './DataLoader';
import Standings from './components/Standings';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function App() {
  const [ divisionStandings, setDivisionStandings ] = useState({});
  const [ leagueStandings, setLeagueStandings ] = useState({});
  const [ overallStandings, setOverallStandings ] = useState({});
  useEffect(() => {
    async function dataLoad() {
      const { divisionData, leagueData, overallData } = await loadData();
      setDivisionStandings(divisionData);
      setLeagueStandings(leagueData);
      setOverallStandings(overallData);
    }
    dataLoad();
  }, []);
  return (
    <>
      <div className="container py-3">
        <h1 className="fs-3 text-center">MLB Standings</h1>
        <Tabs defaultActiveKey="division">
          <Tab eventKey="division" title="Division">
            <Standings data={divisionStandings} />
          </Tab>
          <Tab eventKey="league" title="League">
            <Standings data={leagueStandings} />
          </Tab>
          <Tab eventKey="overall" title="Overall">
            <Standings data={overallStandings} />
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default App;
