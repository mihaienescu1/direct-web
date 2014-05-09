
Cars = new Object();
Cars.getModels = function(cb, params) {
	if( 'undefined' == typeof params ) params = {};

	wrs.callRegisteredMethod('Cars.getModels', params, cb);
};

Users = new Object();
Users.getAll = function(cb, params) {
	if( 'undefined' == typeof params ) params = {};

	wrs.callRegisteredMethod('Users.getAll', params, cb);
};
Users.getByName = function(cb, params) {
	if( 'undefined' == typeof params ) params = {};

	wrs.callRegisteredMethod('Users.getByName', params, cb);
};
