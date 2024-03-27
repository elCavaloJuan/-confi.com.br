song = "";

function preLoad(){
    song = loadSound("music.mp3");
}
scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO); 
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('Сеть позы инициализируется')
}

function gotPoses(result){
    if(results.lenght > 0){
        console.log(result);
        scoreRightWrist = result[0].pose.keypoints[10].score;
        scoreLeftWrist = result[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    Fill("#6B8E23");
    stroke("#5F9EA0");
    if(scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById('speed').innerHTML = "speed = 0.5X";
            song.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById('speed').innerHTML = "speed = 1X";
            song.rate(1.0);
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById('speed').innerHTML = "speed = 1.5X";
            song.rate(1.5)
    }
    else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById('speed').innerHTML = "speed = 2X";
        song.rate(2);
}
else if(rightWristY > 400){
    document.getElementById('speed').innerHTML = "speed = 2.5X";
    song.rate(2.5)
    }
}

if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    inNumberLeftWristY = Number(leftWristY);
    remove_decimals = fluor(inNumberLeftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume =" + volume;
    song.setVolume(volume);
    
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}}
