let game = {


    start : function(){
        introScreen.run();
    }
};

let introScreen = new Screen( $('.intro-screen') , function(){

    this.open();

    $('.continue').on("click" , function(){
        
        introScreen.transitionTo( q1Screen );
        
        $('.continue').off("click");

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

Screen.prototype.transitionTo = function( next ){
    
    let element = this.element;

    TweenMax.to( element, .5, 
        {
            top:"50px", 
            autoAlpha: 0,
            delay: .5,
            ease: "easeOut",
            onComplete: function(){
                TweenMax.set( element , { display: "none" });

                next.run();
            }
        });
        
}

game.start();