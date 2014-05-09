<?php require('dwr-main/bootstrap.php'); ?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script type="text/javascript" src="core.js"></script>
<script type="text/javascript" src="interface.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	
	var post	=	{
			
		param1 : 'is',
		param2 : 'is not'
	};
	
	var handleGetUsers	=	function(d, s , st) {
		console.log( d ) ;
		console.log( s ) ;
		console.log( st );
	};
	
	Users.getAll(handleGetUsers, post);

});
</script>
</head>

<body>

</body>
</html>