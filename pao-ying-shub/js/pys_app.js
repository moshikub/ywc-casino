/**
 * Created by Pong on 04/01/2558.
 */

var application = angular.module('pysApp', ['ngFx']);

application.controller('PysController', ['$scope', '$timeout', '$interval',
    function($scope, $timeout, $interval) {
        $scope.mode = 'idle';
        $scope.hasChanged = false;
        $scope.showMode = {
            'select': false,
            'idle': true
        };

        $scope.player1 = {};
        $scope.player2 = {};

        $scope.items = {
            'scissors' : {
                'title' : 'Scissors',
                'win' : 'paper',
                'lose' : 'rock'
            },
            'paper' : {
                'title' : 'Paper',
                'win' : 'rock',
                'lose' : 'scissors'
            },
            'rock': {
                'title' : 'Rock',
                'win' : 'scissors',
                'lose' : 'paper'
            }
        };

        $scope.getItemWin = function() {
            return $scope.items[$scope.player1.select].win;
        };

        $scope.getItemLose = function() {
            return $scope.items[$scope.player1.select].lose;
        };

        $scope.botSelect = function() {
            var botChoice = [];

            if ($scope.player1.chance <= 0.25) {
                botChoice.push($scope.getItemWin());

                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);

                botChoice.push($scope.getItemLose());
                botChoice.push($scope.getItemLose());
                botChoice.push($scope.getItemLose());
                botChoice.push($scope.getItemLose());
                botChoice.push($scope.getItemLose());
                botChoice.push($scope.getItemLose());
            }
            else if ($scope.player1.chance <= 0.50) {
                botChoice.push($scope.getItemWin());
                botChoice.push($scope.getItemWin());

                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);

                botChoice.push($scope.getItemLose());
                botChoice.push($scope.getItemLose());
                botChoice.push($scope.getItemLose());
                botChoice.push($scope.getItemLose());
            }
            else if ($scope.player1.chance <= 0.75) {
                botChoice.push($scope.getItemWin());
                botChoice.push($scope.getItemWin());
                botChoice.push($scope.getItemWin());

                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);

                botChoice.push($scope.getItemLose());
                botChoice.push($scope.getItemLose());
            }
            else {
                botChoice.push($scope.getItemWin());
                botChoice.push($scope.getItemWin());
                botChoice.push($scope.getItemWin());
                botChoice.push($scope.getItemWin());
                botChoice.push($scope.getItemWin());

                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);
                botChoice.push($scope.player1.select);
            }


            $scope.player2.select = botChoice[Math.floor(Math.random() * botChoice.length)];
        };

        $scope.checkResult = function(){
            if($scope.player1.select == $scope.player2.select){
                $scope.player1.unfortunate++;

                $scope.player1.status = 'draw';
                $scope.player1.chance = 0.25;
            }
            else if($scope.getItemWin() == $scope.player2.select){
                $scope.player1.unfortunate = 0;

                $scope.player1.status = 'win';
                $scope.player1.chance = 0.25;
            }
            else if($scope.getItemLose() == $scope.player2.select){
                $scope.player1.status = 'lose';
                $scope.player1.unfortunate += 2;

                if ($scope.player1.unfortunate < 5){
                    $scope.player1.chance = 0.5;
                }
                else if ($scope.player1.unfortunate >= 5) {
                    $scope.player1.chance = 0.75;
                }
                else if ($scope.player1.unfortunate >= 10) {
                    $scope.player1.chance = 1;
                }

            }

            $scope.mode = 'idle';
        };

        $scope.fight = function(){
            if ($scope.player1.select == 'none' || $scope.mode != 'idle') {
                //alert('ใจเย็น เลือกก่อนนะ');
            }else{
                $scope.mode = 'fight';
                $scope.player2.select = 'none';
                $scope.player1.status = 'idle';

                $timeout(function(){
                    $scope.botSelect();
                    $scope.checkResult();
                }, 1000);
            }
        };

        $scope.botIdleRandom = function() {
            var allBotChoice = ['paper', 'scissors', 'rock'];
            var botChoice = [];

            for(var choice in allBotChoice) {
                if (allBotChoice[choice] != $scope.player2.idleRandom) {
                    botChoice.push(allBotChoice[choice]);
                }
            }

            $scope.player2.idleRandom = botChoice[Math.floor(Math.random() * botChoice.length)];
        };

        $scope.botIdleInterval = $interval($scope.botIdleRandom, 100);

        $scope.modeSelect = function() {
            //$scope.player1.select = 'none';
            $scope.mode = 'select';
            $scope.showMode.idle = false;

            $timeout(function(){
                $scope.showMode.select = true;
            }, 200);
        };

        $scope.modeIdle = function() {
            $scope.mode = 'idle';
            $scope.showMode.select = false;

            $timeout(function(){
                $scope.showMode.idle = true;
            }, 200);
        };

        $scope.botReset = function(){
            $scope.player2.select = 'none';
        };

        $scope.reset = function(){
            $scope.player1 = {
                'chance': 0.25,
                'select': 'none',
                'unfortunate': 0,
                'status': 'idle'
            };

            $scope.player2 = {
                'select': 'none'
            };
        };

        // Init
        $scope.reset();

    }]);