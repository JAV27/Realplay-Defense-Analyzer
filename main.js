$(document).ready(function() { 

    $('button.submit').on('click', () => {
        let json = $('textarea').val();
        let newJson = json.replace(/'/g, '\"');
        let parsed = JSON.parse(newJson);
        let team = $('input[name="team"]:checked').val();
        let half = (team==="Home" ? "top" : "bottom");

        analyze(parsed, half);

    });

});

let analyze = (json, half) => {
    let fieldingPlays = json.plays.filter(play => play.half === half);;
    let numberOfPlays = fieldingPlays.length;

    $('p.info').html("Number of Plays: " + numberOfPlays)


}