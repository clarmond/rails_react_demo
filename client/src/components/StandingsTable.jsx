const StandingsTable = ( { teamData }) => {
    return (
        <table className="table table-sm table-hover">
            <thead>
                <tr className="table-light">
                    <th>Team</th>
                    <th className="text-center">Wins</th>
                    <th className="text-center">Losses</th>
                    <th className="text-center">GB</th>
                </tr>
            </thead>
            <tbody>
                {teamData.length && teamData.map(team => (
                    <tr key={team.abbrev}>
                        <td>
                            <div className="team-logo">
                                <img src={`images/${team.abbrev}.svg`} alt={`${team.name} logo`} />
                            </div>
                            { team.name }
                        </td>
                        <td className="text-center">{ team.wins }</td>
                        <td className="text-center">{ team.losses }</td>
                        <td className="text-center">{ team.gb }</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
 
export default StandingsTable;