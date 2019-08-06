$(document).ready(function() { 

    $('button.submit').on('click', () => {

        $(".card .info").html('');

        let json = $('textarea').val();
        let newJson = json.replace(/'/g, '\"');
        let parsed = JSON.parse(newJson);
        let team = $('input[name="team"]:checked').val();
        let half = (team==="Home" ? "top" : "bottom");

        let stats = analyze(parsed, half);

        $('.info').append("<li>Number of Defensive Plays: " + stats[0] + "</li>");
        $('.info').append("<li>Innings Played: " + stats[1] + "</li>");
        $('.info').append("<li>Runs Allowed: " + stats[3] + "</li>");

        for(let play in stats[2]) {
            $('ul.plays').append("<li>" + play + " " + stats[2][play] + "</li>");
        }

    });

});

let analyze = (json, half) => {
    let fieldingPlays = json.plays.filter(play => play.half === half);
    let numberOfPlays = fieldingPlays.length;

    let innings = inningCounter(json);

    let allResults = fieldingPlays.map(play => play.result);

    let sortedResults = playSorter(allResults);

    let RBIs = rbiCounter(fieldingPlays);

    return [numberOfPlays, innings, sortedResults, RBIs];
}

let playSorter = (arr) => {
    let counts = [];

    for(let i=0;i<arr.length;i++) {
        if(counts[arr[i]] === undefined) {
            counts[arr[i]] = 1;
        } else {
            counts[arr[i]] = counts[arr[i]] + 1;
        }
    }

    return counts;
}

let inningCounter = (json) => {
    let innings = 0;
    let prevHalf = "top";
    for(let i=0;i<json.plays.length;i++) {
        let currHalf = json.plays[i].half;
        if(currHalf != prevHalf) {
            innings++;
        }
        prevHalf=currHalf;
    }
    innings = Math.ceil(innings);

    return innings;
}

let rbiCounter = (json) => {
    return json.filter((play) => {
        return play.result.match(/rbi/gi)
    }).length;
}