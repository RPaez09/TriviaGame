let game = {

    currentQuestion : 0,

    questions: [
        {
            name : "The greenway spans how many paved miles:",
            choices : [ "11.3" , "17.8" , "25.7" , "33" ],
            correctIndex : 3
        },
        {
            name : "Which of the following towns does the greenway not connect to:",
            choices : [ "Wendell" , "Knightdale" , "Wake Forest" , "Clayton" ],
            correctIndex : 0
        },
        {
            name : "The greenway is considered a small part of which longer trail:",
            choices : [ "Tanawha Trail" , "Mountains-To-Sea Trail" , "Sauratown Trail" , "Haw River Trail" ],
            correctIndex : 1
        },
        {
            name : "When did the Raleigh city adopt the Capital Areal Greenway System plan:",
            choices : [ "1992" , "1985" , "1976" , "1969" ],
            correctIndex : 2
        }
    ],

    start : function(){
        introScreen.run();
    }
};

let introScreen = new Screen( $('.intro-screen') , function(){

    this.open();

    $('.continue').on("click" , function(){
        
        introScreen.transitionTo( questionScreen );
        
        $('.continue').off("click");

    });
} );

let questionScreen = new Screen( $('.question-screen') , function(){

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