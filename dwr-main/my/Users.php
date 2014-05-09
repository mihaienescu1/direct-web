<?php

class Users {
	
	public function getAll() {
		
		return array('A' => 'B', 'C' => array(1,2,3) );
	}
	
	public function getByName( Array $params = array() ) {
		
		$ret	=	array('name' => '', 'id' => 2121, 'status' => 'OK');
		
		if( array_key_exists($params['name']) ) 
			$ret['name'] = 'undefined';
		else 
			$ret['name'] = $params['name'];
		
		return $ret;
			
	}
}	