function LodashFactory($window) {  
  return $window._;
}

// Define dependencies
LodashFactory.$inject = ['$window'];

// Register factory
ngModule.factory('_', LodashFactory);  