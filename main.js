song1 = "";
song2 = "";
leftWristX = "0";
leftWristY = "0";
rightWristX = "0";
RightWristY = "0";
leftwristscore = "0";
song = ""

function preload()
{
    song1 = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose, gotPoses');
}

function gotPoses(results)
{
    if(results.length > 0)
{
    scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	


    leftWristX = results[0].pose.left.Wrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

    rightWrist = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
}
} 

function modelLoaded() {
    console.log('PoseNet Is Initialized')
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
	stroke("#FF0000");


    if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY);
		new_leftWristY = floor(InNumberleftWristY *2);
		leftWristY_divide_1000 = new_leftWristY/1000;
		document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;		
		song.setVolume(leftWristY_divide_1000);	
	}

}
