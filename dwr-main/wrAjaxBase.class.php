<?php

class wrAjaxBase {
	
	protected	$_childrens	=	array();
	protected	$_position	=	0;
	protected	$_jsString	=	null;
	
	public function __construct() {
	
		foreach (glob(FILES_GLOB . '*') as $file) {
		
			$className	=	trim( preg_replace('/.php/i', '', $file) );
			$className	=	explode(DIRECTORY_SEPARATOR, $className); 
			$className	=	$className[count($className)-1];
			
			include( $file );
			
			if ( class_exists( $className ) ) {
				$reflection	=	new ReflectionClass(new $className);
				$this->_childrens[$className]	=	$reflection->getMethods(ReflectionMethod::IS_PUBLIC);
			}
		}
		
		$this->_position	=	0;
	}
	
	public function map() {
		/*
		foreach($this->_childrens as $k => $v)
		{
			$reflection		=	new ReflectionClass($this->_childrens[$k]);
			$methods		=	$reflection->getMethods(ReflectionMethod::IS_PUBLIC);
		
			echo "<pre>";
			print_r( $methods );
			echo "</pre>";
		}
		*/
		//header("Content-type:text/plain");
		
			
		
		$jsString	=	'';
		foreach( $this->_childrens as $key => $met ) {
			$jsString.= "\n" . $key . " = new Object();\n";
				foreach($this->_childrens[$key] as $k => $v) {
					
					$param	=	'';
					$inside	=	'';
					
					$modelReflector = new ReflectionClass($key );
					$method = $modelReflector->getMethod($v->name);
					$parameters = $method->getParameters();
					
					if(count($parameters)) {
						$c	=	count($parameters);
						for($i = 0 ; $i < $c ; $i++) {
							$param.= $parameters[$i]->name . ',';
							/*
							if (!$parameters[$i]->isOptional()) {
								$inside.= "\tif( !".$parameters[$i]->name." ) {\n";
									$inside.= "\t\tthrow('missing argument or argument value');\n";
								$inside.= "\t}";
							}*/
							
						}
					}
					
					$param	.=	"cb";
					$param	 =	rtrim($param, ',');
					
					
					$p	=	$key.'.'.$v->name;
					$d	=	'params';
					$c	=	'cb';
					
					$inside .=	"\tif( 'undefined' == typeof params ) params = {};";
					$inside	.=	"\n\n\twrs.callRegisteredMethod('".$p."', ".$d.", ".$c.");";
					//$inside	.=	"\n\n\treturn;";
				
					$jsString.= $key.'.' . $v->name . " = function(cb, params) {\n";
					$jsString.= $inside;
					$jsString.= "\n};\n";
					
				}
		}
		
		
		$fp = fopen('interface.js', 'w+b');
		fwrite($fp, $jsString);
		fclose($fp);
	}
	
	public function getJs() {
		return $this->_jsString;
	}
	
}

