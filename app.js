let game = {


    start : function(){
        introScreen.open();
    }
};

let introScreen = new Screen( $('.intro-screen') , function(){
    console.log('Intro screen running!');
} );

function Screen ( element , run ){
    this.element = element;
    this.run = run;
}

Screen.prototype.open = function(){

    TweenLite.from( this.element, .5, 
        {
            top:"50px", 
            autoAlpha: 0,
            delay: .5,
            easing: "easeOut"
        });

}

Screen.prototype.close = function(){
    // Closing animation
}

game.start();