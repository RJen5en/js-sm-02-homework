// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhlw6Tjd7oBlw4GaUM7qGGccY-yd3cy30",
    authDomain: "hilocasino-1593f.firebaseapp.com",
    databaseURL: "https://hilocasino-1593f.firebaseio.com",
    storageBucket: "hilocasino-1593f.appspot.com",
    messagingSenderId: "1053266914474"
  };
  firebase.initializeApp(config);


var provider = new firebase.auth.GoogleAuthProvider();
console.log(provider);

  function toggleSignIn() {
      if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          document.getElementById('quickstart-oauthtoken').textContent = token;
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert('You have already signed up with a different auth provider for that email.');
          } else {
            console.error(error);
          }
        });
      } else {
        // [START signout]
        firebase.auth().signOut();
        $('#game').hide();
        $('#login').show();
        $('div#nameOfUser').html('');
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }

    var initApp = function () {
      $('div#game').hide();
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          $('div#login').hide();
          $('div#game').show();
          $('#quickstart-sign-in').show();
          $(app.init);
          $('div#nameOfUser').show().append('<br>Logged In: ' + user.displayName).css('font-size', '26px');
        } else {
          document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
        }
        document.getElementById('quickstart-sign-in').disabled = false;
      });
      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);

      var app = {

        init:function(){


          var database = firebase.database();
          var user = firebase.auth().currentUser;
          var uid = user.uid;
          console.log(user.uid)
          console.log(user.displayName);
          var highScore = 50;
          var dealerDeck = [];
          var playerDeck = [];
          var dealerAmountLeft = 26;
          var playerAmountLeft = 26;
          var playerTotal = 50;
          var betAmount = 0;
          var language = "en-US";
    


            //Card class
            function Card(value, name, suit) {
                this.value = value;
                this.name = name;
                this.suit = suit;
            }

            //Deck class
            function Deck() {
                switch (language) {
                    case "en-US":
                        this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
                        this.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
                        break;
                }
                var cards = [];
                for (var s = 0; s < this.suits.length; s++) {
                    for (var n = 0; n < this.names.length; n++) {
                        cards.push(new Card(n + 1, this.names[n], this.suits[s]));
                    }
                }
                return cards;
            }

            //Create a deck
            var myDeck = new Deck();
            function shuffle(o) {
                for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                return o;
            };

            //Shuffles the deck
            myDeck = shuffle(myDeck);

            //Give card to player and dealer
            function giveCards(o) {
                var count = o.length / 2;
                for (i = 0; i < count; i++) {
                    dealerDeck.push(o.shift(0));
                    playerDeck.push(o.shift(0));
                }
                dealerAmountLeft = 26;
                playerAmountLeft = 26;
            }
            giveCards(myDeck);
            function DealerCard() {}
            function PlayerCard() {}

            //Overrides toString() on the dealer card class, which means "new DealerCard().toString()" will return the suit and name
            DealerCard.prototype.toString = function() {
                return dealerCard[0].name  + " of " + dealerCard[0].suit;
            }
            var resetScore = function() {
                playerTotal = 50;
            }
            //Overrides toString() on the player card class, which means "new PlayerCard().toString()" will return the suit and name
            PlayerCard.prototype.toString = function() {
                return playerCard[0].name  + " of " + playerCard[0].suit;
                // var pCard = playerCard[0].suit + " " + playerCard[0].name;
            }
            //Call this = Give each player a random card from their deck
            function selectCards() {
                dealerCard = dealerDeck.splice(Math.floor(Math.random() * dealerDeck.length), 1);
                playerCard = playerDeck.splice(Math.floor(Math.random() * playerDeck.length), 1);
            }
            //Checks who wins each card draw.
            function checkWinner() {
                    if (dealerCard[0].value < playerCard[0].value) {
                        $("#winner").text("You win!");
                        setPlayerTotal(betAmount, false);
                        updatePlayerTotal();
                    } else if (dealerCard[0].value > playerCard[0].value) {
                        $("#winner").text("Dealer wins!");
                        setPlayerTotal(betAmount, true);
                        updatePlayerTotal();
                    } else if (dealerCard[0].value == playerCard[0].value) {
                        $("#winner").text("Draw!");
                    }
                };

            //When the deal button has been pressed, start dealing the cards
            $("#deal").on("click", function() {
                console.log("Amount of player cards: " + playerAmountLeft);
                if (betAmount > playerTotal) {
                    alert("Bet amount too high! Lowering bet.");
                    setBetAmount(0);
                } else if(betAmount == 0 && playerTotal > 0) {
                  alert('Please place a bet.');
                  
                } else if (playerTotal > 0) {
                    selectCards();
                    dealerAmountLeft--;
                    playerAmountLeft--;
                    
                    $("#dealer").text(new DealerCard().toString());
                    $("#player").text(new PlayerCard().toString());
                    
                    
                    var pCard = playerCard[0].name  + " of " + playerCard[0].suit;
                    var dCard = dealerCard[0].name  + " of " + dealerCard[0].suit;
                    $('#dealerImageCard').html('<img src="img/cards/' + dCard +'.png">');
                    $('#playerImageCard').html('<img src="img/cards/' + pCard + '.png">');
                    console.log(pCard);
                    console.log(dCard)

                    // createMessage();

                    checkWinner();
                    if (playerAmountLeft == 0) {
                        console.log('Resetting deck.');
                        myDeck = new Deck();
                        myDeck = shuffle(myDeck);
                        giveCards(myDeck);
                    }
                } else {
                    alert("OUT OF MONEY. RESETTING SCORE.");
                    resetScore(50);
                    updatePlayerTotal();
                }
            });

            //Set bet amount
            $(".amount").on("click", function() {
                setBetAmount($(this).attr("data-amount"), false);
                $(".amount").removeClass("selected");
                $(this).addClass("selected");
            });

            //Reset the bet amount
            $("#reset").on("click", function() {
                setBetAmount(betAmount, true);
            });

            //Function to update the bet amount
            function updateBetAmount() {
                $("#betAmount").text("Bet Amount: " + betAmount);
            }

            //Function to update the player total
            function updatePlayerTotal() {
                $("#totalAmount").text("Total: " + playerTotal);
                $('#highScore').text("High Score: " + highScore);
                setHighScore();
                
              }
           
            //Function to set the bet amount. Takes 2 arguments. n is the amount and neg determines if it should deduct or add the amount
            function setBetAmount(n, neg) {
                if (neg) {
                    betAmount += -Math.abs(parseFloat(n))
                } else {
                    betAmount += parseFloat(n);
                }
                if (betAmount >= playerTotal) {
                    betAmount = playerTotal;
                }
                updateBetAmount();
            }
            //Sets the player total after winning or losing 
            function setPlayerTotal(n, neg) {
                if (neg) {
                    playerTotal += -Math.abs(parseFloat(n));
                } else {
                    playerTotal += parseFloat(n);
                }
                updatePlayerTotal();
            }
            function setHighScore() {
              if (playerTotal > highScore){
                highScore = playerTotal;
                $('#winner').append('<br>New High Score!');
              } else {
                highScore = highScore;
              }
            }



        }

        
      }

    }
    window.onload = function() {
      initApp();
    };









