//Var declare
var Food = 10;
var CC = 0;
var WD = 1;
var X = 0;
var Y = 0;
var Step = 0;
var Randomer = 0;
var BeastFind = false;
var BeastHealth = 5;
var BeastX = NaN;
var BeastY = NaN;
var BeastDirection = NaN;

//Function declare
    //Shortcuts
function Say(word){
    $("#word").show();
    $("#word").html(word);
}

function Murmur(puns){
    $("#wiseword").show();
    $("#wiseword").html(puns);
}

function GainFood(fooding){
    Food += fooding;
}

function Randoming(min, max) { // Random Integer Generator
    return Math.floor(Math.random() * (max + 1 - min) ) + min;
}

    //Events
function Shrub(){
    Say("You found a shrub from a tree, get 3 foods");
    GainFood(3);
}

function Herb(){
    Randomer = Randoming(0,100);
    if (Randomer <= 25){
    Say("You picked a flower from the ground and eat it. Mmm, tasty. (get 2 food)");
    } else if (Randomer > 25 && Randomer <=50) {
    Say("You picked up a nicely looked plant, get 2 food.");
    } else if (Randomer > 50 && Randomer <=75) {
    Say("A nut is on the ground, so you pick it up and eat");
    } else {
    Say("An apple fall onto your head, so you just simply eat it while ignoring the pain.");
    }
    GainFood(2);
}

function Wilding(){
    Say("The sun is too hot for you to continue walking. You have to eat one more food.");
    GainFood(-1);
}

function Monkey(){
    if ( WD === 0){ // Got Stole
    Say("A monkey lunge at you, you fall onto the ground, and the monkey steal one of your food.");
    Food --;
    }

    if ( WD>=1 && WD<=4 ){ // Block off
    Say("A monkey lunge at you, you block him off with your weapon");
    WD --;
    }
    
    if ( WD>=5 ){
    Say("A monkey lunge at you, you swing your weapon and kill it. Then you cook it fresh and easy, but your weapon lose some endurance.");
    WD -= 2;
    Food += 3;
    }
}

function Sharpen(){
    if (WD === 0){
    Say("You pick up a blade. It's shining under the sunlight. It looks broke, but still usable.");
    }
    if (WD > 0){
    Say("You sharpen your blade on a sharp stone.");
    }
    WD += 2;
}

function Compass(){
    Randomer = Randoming(0,100);
    if (Randomer <= 33){
    Say("You picked up one compass component");
    CC ++;
    } else {
    Say("You saw one compass component, but soon being eaten by a naughty squirrel, but it dies afterward, so you eat the squirrel.");
    Food ++;
    }
}

function Origin(){
    Say("You look around, its the same place that you started!");
}

function FertileLand(){
    Say("You found a fertile land, you plant all your food, and they are double up.");
    Food *= 2;
}

//Randomly execute(function) Events
function Events(){
    eval(arguments[Randoming(0,arguments.length-1)]+"()");
}

$(".B").click(function(){
    Step ++;
});
//Everystep you take before

//Clicking
    //North
$("#b1").click(function(){
    Y ++;
});

    //West
$("#b2").click(function(){
    X --;
});

    //East
$("#b3").click(function(){
    X ++;
});

    //South
$("#b4").click(function(){
    Y --;
});

//Everystep you take after
$(".B").click(function(){
    //Normal Events
    if ( (X !== 0 || Y !== 0) && Step !== 10 && !(BeastFind === false && X >= 100) && !(BeastX === X && BeastY === Y) ){
    Events("Shrub","Herb","Wilding","Shrub","Herb","Wilding","Monkey","Sharpen","Compass");
        return;
    }
    //Back to the square
    if (X === 0 && Y === 0){
    Origin();
    }
    //Fertile Land
    if (Step === 10){
    FertileLand();
        return;
    }
    
    //Beast encounter
    if (BeastFind === false && X >= 100){
    BeastFind = true;
        if (WD > 5){
        Say("You encounter the beast! You manage to fight the beast with your nice weapon, and the beast escape to the east!");
        WD -= 2;
        } else {
        Say("You encounter the beast! You try to fight the beast, but the beast is too strong, so you fling your weapon to the beast, and the beast escape to the east! You also drop some food.");
        WD = 0;
        Food -= 4;
        }
        BeastX = X + 5;
        BeastY = Y;
        Murmur("Told Ya, if go east, you encounter the beast!");
    }
    
    //Beast Tracking
    if (BeastX === X && BeastY === Y){
        //Randoming Escape Direction
        Randomer = Randoming(0,3);
        if (Randomer === 0){
            BeastDirection = "north";
            BeastY += 5;
        }
        if (Randomer === 1){
            BeastDirection = "west";
            BeastX -= 5;
        }
        if (Randomer === 2){
            BeastDirection = "east";
            BeastX += 5;
        }
        if (Randomer === 3){
            BeastDirection = "south";
            BeastY -= 5;
        }
        //Dialogue
        if (WD > 0){
        Say("You hits the beast! The beast has between escape to the "+BeastDirection+"!");
        BeastHealth -= 1;
        WD -= 1;
        } else {
        Say("You got no weapon to fight the beast! The beast saw you and run away to the "+BeastDirection);
        }
        
        if (BeastHealth <= 0){
        Say("You slain the beast! You get tons of fresh meat, and you found some compass component inside the beast's body!");
        BeastX = NaN;
        BeastY = NaN;
        BeastDirection = NaN;
        Food += 50;
        CC += 3;
        }
    }
});

$(".B").click(function(){
    GainFood(-1);
    $("#Food").html("Food: "+Food);
    $("#CC").html("Compass Component: "+CC);
    $("#WD").html("Weapon Durability: "+WD);
    $("#wiseword").hide();
    
    if (Randoming(0,10) < 2 && Y > 20 && BeastFind === false){
        Murmur("If you go east you will encounter the beast!");
    }
    
    if (CC > 9){
    $("Body").html("You have voyaged out of the jungle!");
    }
    
    if (Food < 0){
        Food = 0;
        $("#Food").html("Food: "+Food);
        $(".B").hide();
        Say("You starve to death!");
    }
});
