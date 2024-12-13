// Pots
const pots = {
    pot1: ['Spain', 'Netherlands', 'France', 'Croatia', 'Portugal', 'Denmark', 'Italy', 'Germany', 'England', 'Belgium', 'Switzerland', 'Austria'],
    pot2: ['Ukraine', 'Sweden', 'Turkey', 'Wales', 'Hungary', 'Poland', 'Romania', 'Greece', 'Slovakia', 'Czech Republic', 'Norway'],
    pot3: ['Scotland', 'Slovenia', 'Republic of Ireland', 'Albania', 'North Macedonia', 'Georgia', 'Finland', 'Iceland', 'Northern Ireland', 'Montenegro', 'Israel'],
    pot5: ['Moldova', 'Malta', 'Andorra', 'Gibraltar', 'Liechtenstein', 'San Marino']
};

// Teams involved in Nations League QF or PO
const nationsLeagueTeams = {
    pot1: ['Spain', 'Netherlands', 'France', 'Croatia', 'Portugal', 'Denmark', 'Italy', 'Germany', 'Belgium', 'Austria'],
    pot2: ['Ukraine', 'Turkey', 'Hungary', 'Serbia', 'Greece', 'Slovakia'],
    pot3: ['Scotland', 'Slovenia', 'Republic of Ireland', 'Georgia', 'Iceland'],
    pot4: ['Bulgaria', 'Luxembourg', 'Belarus', 'Kosovo', 'Armenia', 'Kazakhstan', 'Azerbaijan', 'Estonia', 'Cyprus', 'Faroe Islands', 'Latvia', 'Lithuania']
};

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Function to simulate a single group with Kosovo and teams from other pots
function simulateGroupWithKosovo() {
    // Clear the console before starting the new simulation
    console.clear();

    // Create the group & counter
    let group = [];
    let qfOrPoCount = 0;

    // Team selection
    let randomPot1 = shuffleArray(pots.pot1)[0];
    console.log("Selected team from Pot 1:", randomPot1);
    group.push(randomPot1);
    if (nationsLeagueTeams.pot1.includes(randomPot1)) {
        qfOrPoCount++;
    }

    let randomPot2 = selectValidTeam(pots.pot2, group);
    console.log("Selected team from Pot 2:", randomPot2);
    group.push(randomPot2);
    if (nationsLeagueTeams.pot2.includes(randomPot2)) {
        qfOrPoCount++;
    }

    let randomPot3 = selectValidTeam(pots.pot3, group);
    console.log("Selected team from Pot 3:", randomPot3);
    group.push(randomPot3);
    if (nationsLeagueTeams.pot3.includes(randomPot3)) {
        qfOrPoCount++;
    }

    // Add Kosovo (Kosovo is always 4th)
    console.log("Adding Kosovo to the group.");
    group.push('Kosovo');
    qfOrPoCount++;

    // Count how many teams in the group are QF or PO
    console.log("Number of QF or PO teams in the group:", qfOrPoCount);

    // Group size logic
    let groupSize;
    if (qfOrPoCount > 1) {
        groupSize = 4;
    } else {
        groupSize = Math.random() < 0.5 ? 4 : 5;
    }
    console.log("Group size chosen:", groupSize === 5 ? "5" : "4");

    if (groupSize === 5) {
        let randomPot5 = selectValidTeam(pots.pot5, group);
        console.log("Selected team from Pot 5:", randomPot5);
        group.push(randomPot5);
    }

    displayGroup(group);
}

// Check function
function selectValidTeam(pot, group) {
    let validTeam;
    let attempts = 0;
    do {
        validTeam = shuffleArray(pot)[0];
        console.log("Trying to add team:", validTeam);
        attempts++;
    } while (
        isProhibitedClash(group, validTeam) ||
        isExcessiveTravelConflict(group, validTeam) ||
        attempts > 100
    );
    console.log(`Valid team selected from Pot: ${validTeam}`);
    return validTeam;
}

// Helper functions
function isProhibitedClash(group, team) {
    const prohibitedClashes = [
        ['Belarus', 'Ukraine'],
        ['Gibraltar', 'Spain']
    ];

    for (let pair of prohibitedClashes) {
        if (pair.includes(team) && group.includes(pair[0])) {
            console.log(`Prohibited clash detected: ${team} vs ${pair[0]}`);
            return true;
        }
    }
    return false;
}

function isExcessiveTravelConflict(group, team) {
    const excessiveTravel = {
        'Azerbaijan': ['Gibraltar', 'Iceland', 'Portugal'],
        'Iceland': ['Armenia', 'Cyprus'],
        'Kazakhstan': ['Andorra', 'England', 'France', 'Gibraltar', 'Iceland', 'Malta', 'Northern Ireland', 'Portugal', 'Republic of Ireland', 'Scotland', 'Spain', 'Wales']
    };

    if (excessiveTravel[team]) {
        for (let conflict of excessiveTravel[team]) {
            if (group.includes(conflict)) {
                console.log(`Excessive travel conflict detected: ${team} vs ${conflict}`);
                return true;
            }
        }
    }
    return false;
}

// Group generator
function displayGroup(group) {
    let resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    group.forEach((team, index) => {
        let countryCode = getCountryCode(team);

        let listItem = document.createElement('li');
        listItem.innerHTML = ` 
            <span class="flag-icon flag-icon-${countryCode}"></span> ${team}
        `;
        resultsContainer.appendChild(listItem);
    });
}

// UEFA Nations flags
function getCountryCode(team) {
    const countryCodes = {
        'Spain': 'es',
        'Netherlands': 'nl',
        'France': 'fr',
        'Croatia': 'hr',
        'Portugal': 'pt',
        'Denmark': 'dk',
        'Italy': 'it',
        'Germany': 'de',
        'England': 'gb-eng',
        'Belgium': 'be',
        'Switzerland': 'ch',
        'Austria': 'at',
        'Ukraine': 'ua',
        'Sweden': 'se',
        'Turkey': 'tr',
        'Wales': 'gb-wls',
        'Hungary': 'hu',
        'Poland': 'pl',
        'Romania': 'ro',
        'Greece': 'gr',
        'Slovakia': 'sk',
        'Czech Republic': 'cz',
        'Norway': 'no',
        'Scotland': 'gb-sct',
        'Slovenia': 'si',
        'Republic of Ireland': 'ie',
        'Albania': 'al',
        'North Macedonia': 'mk',
        'Georgia': 'ge',
        'Finland': 'fi',
        'Iceland': 'is',
        'Northern Ireland': 'gb-nir',
        'Montenegro': 'me',
        'Bosnia and Herzegovina': 'ba',
        'Israel': 'il',
        'Bulgaria': 'bg',
        'Luxembourg': 'lu',
        'Belarus': 'by',
        'Kosovo': 'xk',
        'Armenia': 'am',
        'Kazakhstan': 'kz',
        'Azerbaijan': 'az',
        'Estonia': 'ee',
        'Cyprus': 'cy',
        'Faroe Islands': 'fo',
        'Latvia': 'lv',
        'Lithuania': 'lt',
        'Moldova': 'md',
        'Malta': 'mt',
        'Andorra': 'ad',
        'Gibraltar': 'gi',
        'Liechtenstein': 'li',
        'San Marino': 'sm'
    };
    return countryCodes[team] || 'xx'; // Default to 'xx' if no code found
}