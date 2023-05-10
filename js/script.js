function liveDataUpdate() {
    let image1 = document.getElementById('playing_image');
    let team = document.getElementById('team');
    let score = document.getElementById('score_view');
    let wick = document.getElementById('wickets');
    let overs = document.getElementById('overs');
    let run_rate = document.getElementById('runrate');
    let player1_name = document.getElementById('player1_name');
    let player1_score = document.getElementById('p1_score');
    let player1_balls = document.getElementById('b_count1');
    let player2_name = document.getElementById('player2_name');
    let player2_score = document.getElementById('p2_score');
    let player2_balls = document.getElementById('b_count2');
    let balling_name = document.getElementById('balling_name');
    let ball_wick = document.getElementById('ball_wick');
    let balling_logo = document.getElementById('balling_logo');
    let dot1 = document.getElementById('dot1');
    let dot2 = document.getElementById('dot2');
    setInterval(function () {
        fetch('https://livescore-dnc.vercel.app/match/get/645a59eb22db9672da0491a1').then(function (res) {
            return res.json();
        }).then(function (data) {
            console.log(data.match.balls);
            overs.textContent = data.match.overs;
            if (data.match.now_playing == "Team1") {
                if (data.match.balls == 0 || data.team1.score == 0) {
                    run_rate.textContent = "0.0";
                } else {
                    run_rate.textContent = (data.team1.score/data.match.balls).toFixed(1);
                }
                score.textContent = data.team1.score;
                wick.textContent = data.team1.wick;
                team.textContent = data.team1.name;
            } else {
                if (data.match.balls == 0 || data.team2.score == 0) {
                    run_rate.textContent = "0.0";
                } else {
                    run_rate.textContent = (data.team2.score/data.match.balls).toFixed(1);
                }
                run_rate.textContent = (data.match.balls/data.team1.score).toFixed(1);
                score.textContent = data.team2.score;
                wick.textContent = data.team2.wick;
                team.textContent = data.team2.name;
            }
            player1_name.textContent = data.match.player1;
            player2_name.textContent = data.match.player2;
            player1_score.textContent = data.match.player1_score;
            player2_score.textContent = data.match.player2_score;
            player1_balls.textContent = data.match.player1_balls;
            player2_balls.textContent = data.match.player2_balls;
            balling_name.textContent = data.match.balling;
            ball_wick.textContent = data.match.balling_wick;
            if (data.match.player1 == "Fetching..." || data.match.player2 == "Fetching...") {
                dot1.style.display = "block";
                dot2.style.display = "block";   
            } else {
                if (data.match.now_player == "player1") {
                    dot1.style.display = "block";
                    dot2.style.display = "none";
                } else {
                    dot2.style.display = "block";
                    dot1.style.display = "none";
                }
            }
        }).catch(function (error) {
            console.log(error);
        })
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
    liveDataUpdate();
});

// Code init 2023 May