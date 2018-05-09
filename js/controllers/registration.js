MainApp.controller('RegistrationController',
    ['$scope', 'Authentication',
        function ($scope, Authentication) {

            $scope.login = function () {
                Authentication.login($scope.user);
            }; //login

            $scope.logout = function () {
                Authentication.logout();
            }; //logout

            $scope.register = function () {
                Authentication.register($scope.user);
            }; //register

            $scope.resetPassword = function () {
                Authentication.resetPassword($scope.resetEmail);
            }; //register

        }]); //Controllerr

