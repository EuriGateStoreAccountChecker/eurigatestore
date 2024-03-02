document.addEventListener("DOMContentLoaded", function() {
    const checkButton = document.getElementById("checkButton");
    const matchResultDiv = document.getElementById("matchResult");

    checkButton.addEventListener("click", async function() {
        try {
            const accountsResponse = await fetch("Accounts.txt");
            const accountsData = await accountsResponse.text();
            const accounts = accountsData.split('\n');

            matchResultDiv.innerHTML = "";

            for (const account of accounts) {
                const [username, tag] = account.split(':');
                const recentMatch = await fetchRecentMatch(username, tag);
                matchResultDiv.innerHTML += `<p>${username}: ${recentMatch}</p>`;
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    });

    async function fetchRecentMatch(username, tag) {
        try {
            const riotAPIKey = "RGAPI-b794344a-5528-4612-9da6-55e16a372a54";
            const getPuuid = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${username}/${tag}?api_key=${riotAPIKey}`;
            const response = await fetch(getPuuid);
            const data = await response.json();

            console.log("Data:", data);

            if (data && data.puuid) {
                const puuid = data.puuid;
                const returnMatches = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${riotAPIKey}`;
                const matchesResponse = await fetch(returnMatches);
                const matchData = await matchesResponse.json();

                console.log("Match data:", matchData);

                if (matchData && matchData.length > 0) {
                    const firstMatchId = matchData[0];
                    const finalResult = `https://europe.api.riotgames.com/lol/match/v5/matches/${firstMatchId}?api_key=${riotAPIKey}`;
                    const matchDetail = await fetch(finalResult);
                    const matchRes = await matchDetail.json();

                    console.log("Match details:", matchRes);

                    const gameCreationTime = new Date(matchRes.info.gameCreation);
                    return gameCreationTime.toLocaleString();
                }
            }
            return "No recent match found.";
        } catch (error) {
            console.error("Error fetching recent match:", error);
            return "Error fetching recent match";
        }
    }
});
