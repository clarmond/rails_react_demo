import StandingsTable from "./StandingsTable";

const Standings = ({ data }) => {
    return (
        <>
            {data.length && data.map(section => (
                <section key={section.sectionName}>
                    <div className="d-inline-flex align-items-center fs-6 fw-bold pt-3 pb-1">
                        { section.sectionName.includes('American') && (
                            <img src="images/al-logo.png" alt="American League logo" className="league-logo" />
                        )}
                        { section.sectionName.includes('National') && (
                            <img src="images/nl-logo.png" alt="National League logo" className="league-logo" />
                        )}
                        { section.sectionName.includes('Overall') && (
                            <img src="images/mlb-logo.png" alt="Major League Baseball logo" className="league-logo" />
                        )}
                        {section.sectionName}
                    </div>
                    <StandingsTable teamData={section.data} />
                </section>
            ))}
        </>
    );
}

export default Standings;