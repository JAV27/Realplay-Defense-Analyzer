$(document).ready(function() { 

    let json = '';
    let newJson = '';
    let parsed = '';
    let team = '';
    let half = '';
    let stats= [];

    $('button.submit').on('click', () => {

        $(".card ul").html('');

        json = $('textarea').val();
        newJson = json.replace(/'/g, '\"');
        parsed = JSON.parse(newJson);
        team = $('input[name="team"]:checked').val();
        half = (team==="Home" ? "top" : "bottom");

        stats = analyze(parsed, half);

        $('.info').append("<li>Number of Defensive Plays: " + stats[0] + "</li>");
        $('.info').append("<li>Innings Played: " + stats[1] + "</li>");
        $('.info').append("<li>Runs Allowed: " + stats[3] + "</li>");

        chartFill(stats[2]);
    });

    $('select').on('change', () => { 
        $('.player-plays').html('');

        let position = $('option:selected').val();

        if(position==="Overall") {
            
        } else {
            let plays = trackPosition(position, stats[4]);
        
            let numberOfPlays = plays.length;
    
            $('.player-plays').append("<li>Plays by position " + position + ": " + numberOfPlays + "</li>");
            
            plays.map((play) => {
                $('.player-plays').append("<li>" + play + "</li>");
            });
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

    return [numberOfPlays, innings, sortedResults, RBIs, allResults];
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
    innings = Math.ceil(innings/2);

    return innings;
}

let rbiCounter = (json) => {
    return json.filter((play) => {
        return play.result.match(/rbi/gi)
    }).length;
}

let chartFill = (data) => {

    let plays = [];

    for(let play in data) {
        plays.push({ y: data[play], label: play});
    }

    let compare = (a,b) => {
        if(a.y > b.y) {
            return 1;
        } else if(a.y < b.y) {
            return -1;
        }

        return 0;
    }

    plays.sort(compare);

    $('div.chart').CanvasJSChart({
        axisX: {
            interval: 1
        },
        axisY2: {
            interlacedColor: "lightgrey",
            gridColor: "grey",
        },
        data: [{
            axisYType: "secondary",
            color: "#1991eb",
            animationEnabled: true,
            type: "bar", 
            dataPoints: plays
        }]
    });


}

let trackPosition = (position, data) => {
    return data.filter((play) => {
        return play.match(position);
    });
}