<?php
require('dwr-main/wrAjaxConfig.php');
require('dwr-main/wrAjaxBase.class.php');


$object	=	$_REQUEST['_obj'];
$method	=	$_REQUEST['_met'];


echo json_encode( $_REQUEST );
