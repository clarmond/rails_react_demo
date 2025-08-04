import StandingsTable from "./StandingsTable";

const Standings = ({ data }) => {
    return (
        <>
            {data.length && data.map(section => (
                <section key={section.sectionName}>
                    <div className="fs-6 fw-bold pt-3 pb-1">{section.sectionName}</div>
                    <StandingsTable teamData={section.data} />
                </section>
            ))}
        </>
    );
}

export default Standings;