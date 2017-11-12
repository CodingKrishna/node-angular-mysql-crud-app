var app = angular.module("myApp",['ngRoute']);
app.config(function($routeProvider) {
  
  $routeProvider.when('/',{
         templateUrl :"customers.html",
         controller: "customerCtrl"
  }).when('/add_customer',{
         templateUrl: "add_customer.html",
        controller: "customerCtrl"
  }).when('/edit_customer',{
     templateUrl: "edit_customer.html",
    
  });
});

app.controller('customerCtrl',function($scope, $http, $location){
  $scope.customers = [];  
  $scope.getCustomers = function(){

    $http({
          method:"GET",
          url:" http://localhost:4300/customers"
      }).then(function successCallback(res){
          $scope.customers = res.data;
      }, function failureCallback(res){
          $scope.errorMsg=res.statusText;
      });

  };
   
  $scope.addCustomers = function(student){

    $http({
          method:"POST",
          url:" http://localhost:4300/customers/add",
          data: JSON.stringify(student)
      }).then(function successCallback(res){
          if(res.data === 'success'){
            $location.path("/");
          }
      }, function failureCallback(res){
          $scope.errorMsg=res.statusText;
      });

  };

  $scope.init = function(){
     $scope.getCustomers();
  };

  $scope.init();

});
