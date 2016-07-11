<?php	
	include_once('Models/Quest.php');	
	$gameID = (isset($_GET['gameID']) && filter_var($_GET['gameID'], FILTER_VALIDATE_INT)) ? $_GET['gameID'] : 0;
	$label = isset($_GET['label']) ? $_GET['label'] : '';
	
	$Quest = new Quest($gameID,$label);

	echo json_encode($Quest);
?>
