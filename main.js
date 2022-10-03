
count_dog = 0;
count_cow = 0;
count_cat = 0;
count_wild_animal = 0;

function update(){
    count_text = "Dog - "+count_dog+" Wild Animal - "+count_wild_animal+" Cat - "+count_cat+" Cow - "+count_cow;
    document.getElementById("count").innerHTML = count_text;
    document.getElementById("count").style.color = "rgb("+random_number_r+","+random_number_g+","+random_number_b+",)";
}

function startClassification(){
    navigator.mediaDevices.getUserMedia({audio:true});
    classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/PJfBLNlcu/model.json", modelReady);
}

function modelReady(){
    classifier.classify(gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        random_number_r = Math.floor(Math.random()*255)+1;
        random_number_g = Math.floor(Math.random()*255)+1;
        random_number_b = Math.floor(Math.random()*255)+1;

        document.getElementById("result_label").innerHTML = results[0].label;
        document.getElementById("result_label").style.color = "rgb("+random_number_r+","+random_number_g+","+random_number_b+",)";

        img = document.getElementById("img");

        if(results[0].label == "Mooing"){
            img.src = "cow.gif"
            count_cow = count_cow+1;
            update();
        } else if(results[0].label == "Barking"){
            img.src = "dog.gif"
            count_dog = count_dog+1;
            update();
        }  else if(results[0].label == "Growling"){
            img.src = "wolf.png"
            count_wild_animal = count_wild_animal+1;
            update();
        }  else if(results[0].label == "Meowing"){
            img.src = "cat.gif"
            count_cat = count_cat+1;
            update();
        }  else{
            img.src = "ear.png"
        }
    }
}
