
const apiUrl = import.meta.env.VITE_API_URL;

function calcGB(w1, l1, w2, l2) {
    const gb = (Math.abs(w1 - w2) + Math.abs(l1 - l2)) / 2;
    return gb > 0 ? gb : '-';
}

function createDataset(overallData, filterFunction) {
    const dataset = structuredClone(overallData).filter(filterFunction);
    const overallLeader = dataset[0];
    dataset.forEach(team => {
        team.gb = calcGB(overallLeader.wins, overallLeader.losses, team.wins, team.losses);
    });
    return dataset;
}

export default async function loadData() {
    const resp = await fetch(`${apiUrl}/records`);
    const rawData = await resp.json();

    const overallData = rawData.map((team) => {
        const pct = team.wins / (team.wins + team.losses);
        return {...team, pct, gb: '-'}
    })
    .sort((a, b) => b.pct - a.pct);

    let overallLeader = overallData[0];
    overallData.forEach(team => {
        team.gb = calcGB(overallLeader.wins, overallLeader.losses, team.wins, team.losses);
    });

    const leagueData = [
        {
            sectionName: 'American League', 
            data: createDataset(overallData, team => team.league === 'AL'),
        },
        {
            sectionName: 'National League', 
            data: createDataset(overallData, team => team.league === 'NL'),
        },
    ];

    const divisionData = [
        {
            sectionName: 'American League East',
            data: createDataset(overallData, team => team.league === 'AL' && team.division === 'East'),
        },
        {
            sectionName: 'American League Central',
            data: createDataset(overallData, team => team.league === 'AL' && team.division === 'Central'),
        },
        {
            sectionName: 'American League West',
            data: createDataset(overallData, team => team.league === 'AL' && team.division === 'West'),
        },
        {
            sectionName: 'National League East',
            data: createDataset(overallData, team => team.league === 'NL' && team.division === 'East'),
        },
        {
            sectionName: 'National League Central',
            data: createDataset(overallData, team => team.league === 'NL' && team.division === 'Central'),
        },
        {
            sectionName: 'National League West',
            data: createDataset(overallData, team => team.league === 'NL' && team.division === 'West'),
        },
    ];

    return {
        overallData: [{
            sectionName: 'Overall',
            data: overallData,
        }],
        leagueData,
        divisionData
    }
}