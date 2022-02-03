img="";
status="";
objects=[];

function preload(){
img=loadImage("dog_cat.jpg");
}

function setup(){
canvas=createCanvas(640,420);
canvas.center();
objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="status:detecting objects";
}

function modelLoaded(){
    console.log("modelLoaded");
    status=true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}

function draw(){
image(img,0,0,640,420);
//something
//fill("#F31986");
//text("dog",45,75);
//noFill();
//stroke("#F31986");
//rect(30,75,400,350);

//text("cat",300,100);
//rect(300,110,300,300);

if(status!=""){
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status: object detected";
        fill("#FC343D");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke("#FC343D");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}