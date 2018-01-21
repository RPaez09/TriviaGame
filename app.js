let game = {


    start : function(){
        introScreen.run();
    }
};

let introScreen = new Screen( $('.intro-screen') , function(){

    this.open();

    $('.continue').on("click" , function(){
        
        introScreen.close();
        
        $('.continue').off("click");

        q1Screen.run();

    });
} );

let q1Screen = new Screen( $('.q1-screen') , function(){

    this.open();

    console.log('q1 running!');

} );

function Screen ( element , run ){
    this.element = element;
    this.run = run;
}

Screen.prototype.open = function(){

    let element = this.element;

    TweenMax.set( element , { display: "inherit" });

    TweenMax.from( element, .5, 
        {
            top:"50px", 
            autoAlpha: 0,
            delay: .5,
            ease: "easeOut"
        });
}

Screen.prototype.close = function(){
    
    let element = this.element;

    TweenMax.to( element, .5, 
        {
            top:"50px", 
            autoAlpha: 0,
            delay: .5,
            ease: "easeOut",
            onComplete: function(){
                TweenMax.set( element , { display: "none" });
            }
        });
        
}

game.start();