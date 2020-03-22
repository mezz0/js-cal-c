<?php
	
		function getUserIpAddr(){
		  if(!empty($_SERVER['HTTP_CLIENT_IP'])){
		      //ip from share internet
		      $ip = $_SERVER['HTTP_CLIENT_IP'];
		  }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
		      //ip pass from proxy
		      $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		  }else{
		      $ip = $_SERVER['REMOTE_ADDR'];
		  }
		  return $ip;
		}

	  $list = array (
		  array('date', 'ip', 'browser', 'sum'),
		  array(date("Y/m/d"), getUserIpAddr(), get_browser(), $sum),
		);

		$fp = fopen('./src/data.csv', 'w');

		foreach ($list as $fields) {
		  fputcsv($fp, $fields);
		}

		fclose($fp);

?>