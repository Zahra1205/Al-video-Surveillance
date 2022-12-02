status = "";
objects = [];
function preload(){
video = createVideo("video.mp4");
video.hide();
}
function setup(){
canvas = createCanvas(480, 380);
canvas.center();

}

function draw(){
image(video, 0, 0, 480, 380);
if(status != ""){
objectDetection.detect(video, gotResult);
for(var i = 0; i < objects.length; i++){
    document.getElementById("status").innerHTML= "Status : Objects Detected";
    document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;

    fill("#000000");
    percent = floor(objects[i].confidence * 100);
    text("Object : "+objects[i].label+" "+"Percentage : "+percent+"%", objects[i].x, objects[i].y);
    noFill();
    stroke("#000000");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}
}
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function start(){
    objectDetection = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status : Objects Detecting";
}
function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}