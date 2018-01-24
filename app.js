let game = {

    currentQuestion : 0,
    currentAnswerChoice : 0,
    timedOut : false,

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

    // first populate question and choices...
    $('.question-name').html( game.questions[ game.currentQuestion ].name );

    //now render answer choices
    let answerHTML = "";

    for( var i = 0; i < game.questions[ game.currentQuestion ].choices.length; i++ ){
        answerHTML  += "<div class='button answer-choice' data-index='" + i + "'>" + game.questions[ game.currentQuestion ].choices[ i ] +"</div>";
    }

    $('.answer-wrapper').html( answerHTML );

    this.open(); // transition this screen into view

    let timedOut = setTimeout( function(){ // start the timer

        game.timedOut = true;
        questionScreen.transitionTo( answerScreen );

    } , 10000);

    $('.answer-choice').on('click' , function(){ //event for submitting your answer

        $('.answer-choice').off('click'); // remove this event
        clearTimeout( timedOut ); // remove the timer

        game.currentAnswerChoice = parseInt( $(this).attr('data-index') ); // the user submitted answer

        questionScreen.transitionTo( answerScreen );
    })

} );

let answerScreen = new Screen( $('.answer-screen') , function(){
    
    this.element.html(""); // flush the html to regenerate this page

    let status = $("<h2></h2>"); // using the proper method to create html elements thank you very much
    status.addClass("answer-status");

    // check if you ran out of time in that last question
    if( game.timedOut === false ){
        // check if the last answer was correct of not
        if( game.currentAnswerChoice === game.questions[ game.currentQuestion ].correctIndex ){
            status.html("You've got the right answer");
        } else {
            status.html("Sorry, Wrong answer");
        }
    } else {
        status.html("Looks like you ran out of time, Sorry");
    }

    this.element.append( status );

    //now for the continue button
    let continueBtn = $("<div></div>");
    continueBtn.addClass("button continue");
    continueBtn.html("Continue");
    this.element.append( continueBtn );

    this.open();

    continueBtn.on( 'click' , function(){

        continueBtn.off( 'click' );
        
        game.timedOut = false;
        game.currentQuestion++;

        if( game.currentQuestion === game.questions.length ){ // if last question is answered
            answerScreen.transitionTo( conclusionScreen ); //conclude the survey
        } else {
            answerScreen.transitionTo( questionScreen ); // loop back to another question
        }
    } );
} );

let conclusionScreen = new Screen( $('.conclusion-screen') , function(){
    
    let conclusionHeader = $('<h2></h2>');
    conclusionHeader.html("Thank you for taking the quiz!");
    this.element.append( conclusionHeader );

    this.open();

});

function Screen ( element , run ){
    this.element = element;
    this.run = run;
}

Screen.prototype.open = function(){

    let element = this.element;

    TweenMax.set( element , { display: "block" });

    TweenMax.to( element, .5, 
        {
            top:"0", 
            autoAlpha: 1,
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