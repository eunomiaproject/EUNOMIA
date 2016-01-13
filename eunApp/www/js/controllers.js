angular.module('starter.controllers', [])

.factory('officialsGoogleFactory', function($http) {
  return{
    getOfficials : function(address) {
      return $http({
        url: 'https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDdPvQ-R7FGD7RA9rMJO8NS2eKi910Gp6g&address=' + address,
        method: 'GET'
      });
    },
    getVoterInfo : function(address) {
      return $http({
        url: 'https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyDdPvQ-R7FGD7RA9rMJO8NS2eKi910Gp6g&electionId=2000&address=' + address,
        method: 'GET'
      });
    }
  };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, officialsGoogleFactory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.list = {};

  officialsGoogleFactory.getOfficials().success(function(data) {
    $scope.list = data;
	});
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.service('addressService', function() {
  var address = '';
  var setAddress = function(addressObj) {
    address = addressObj.street + ' ' + addressObj.city + ' ' + addressObj.state + ' ' + addressObj.zip;
    alert(address);
  };
  var returnAddress = function() {
    return address;
  };
  return {
    setAddress: setAddress,
    returnAddress: returnAddress
  };
})

.controller('AddressCtrl', function($scope, $state, addressService) {
 $scope.getAddress = function(isValid) {
    if (isValid) {
      addressService.setAddress($scope.address);
      $state.go('app.candidates');
    }
  };

  $scope.address = {
    street: '',
    city: '',
    state: '',
    zip: ''
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.service('candidateService', function() {
  var candidate = {};
  var setCandidate = function(data) {
    candidate = data;
  };
  var getCandidate = function() {
    return candidate;
  };
  return {
    setCandidate: setCandidate,
    getCandidate: getCandidate
  };
})

.controller('CandidatesCtrl', function($scope, officialsGoogleFactory, candidateService, addressService) {
  officialsGoogleFactory.getOfficials(addressService.returnAddress()).success(function(data) {
    $scope.candidates = data.officials;
    $scope.setCandidate = function(data) {
      candidateService.setCandidate(data);
    };
	});
})

.controller('CandidateCtrl', function($scope, candidateService) {
  $scope.candidate = candidateService.getCandidate();
})

.controller('VoterInfoCtrl', function($scope, officialsGoogleFactory, addressService) {
  officialsGoogleFactory.getVoterInfo(addressService.returnAddress()).success(function(data) {
    $scope.pollingLocations = data;
  }).error(function(error) {
    $scope.pollingLocations = error;
  });
});
