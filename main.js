function setup() {
  let cnv = createCanvas(int(windowWidth*0.8), int(windowHeight*0.7));
  cnv.position(int(windowWidth*0.1), int(windowHeight*0.2));
  background(230);
}

function windowResized() {
  resizeCanvas(int(windowWidth*0.8), int(windowHeight*0.7));
}

xcoords = [];
ycoords = [];

function draw() {
  stroke(0);
  strokeWeight(4);
  if (mouseIsPressed === true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
    xcoords.push((mouseX-windowWidth*0.8/2)/(windowWidth*0.8));
    ycoords.push((mouseY-windowHeight*0.7/2)/(windowHeight*0.7));
  }
  if(xcoords.length > 100000){
    clear();
    xcoords = [];
    ycoords = [];
  }
}

function mouseReleased() {
  updateValue();
  xcoords = [];
  ycoords = [];
}

function mousePressed(){
  clear();
  background(230);
}

const output = document.getElementById("render");

function updateValue() {
  console.log(xcoords);
  [realArr, imagArr] = fourier.dft(xcoords, ycoords); // ⇒ [realArray, imagArray]
  if(realArr.length > 4){
    realArr = realArr.slice(0,4);
    imagArr = imagArr.slice(0,4);
  }
  real = ""
  for(let i=0; i<realArr.length; i++){
    let sign1 = realArr[i]>0 ? "+" : "-";
    let sign2 = imagArr[i]>0 ? "-" : "+";
    if(i==0 && sign1=="+"){
      sign1 = "";
    }
    real += sign1+Math.abs(realArr[i]/realArr.length).toFixed(2)+"\\cos("+ (2*i/realArr.length*Math.PI).toFixed(2) + "t)"+sign2+Math.abs(imagArr[i]/realArr.length).toFixed(2)+"\\sin("+(2*i/realArr.length*Math.PI).toFixed(2) + "t)";
  }
  imag = ""
  for(let i=0; i<imagArr.length; i++){
    let sign1 = realArr[i]>0 ? "+" : "-";
    let sign2 = imagArr[i]>0 ? "+" : "-";
    if(i==0 && sign1=="+"){
      sign1 = "";
    }
    imag += sign1+Math.abs(realArr[i]/realArr.length).toFixed(2)+"\\sin("+ (2*i/realArr.length*Math.PI).toFixed(2) + "t)"+sign2+Math.abs(imagArr[i]/realArr.length).toFixed(2)+"\\cos("+(2*i/realArr.length*Math.PI).toFixed(2) + "t)";
  }
  if(real == ""){
    real = "?";
    imag = "?";
  }
  output.textContent = "$$\\begin{bmatrix}x \\\\ y \\end{bmatrix}=\\begin{bmatrix}"+real+" \\\\ "+imag+" \\end{bmatrix}$$";
  //adding in queue 
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, "render"]);
}
updateValue()
