<?php
	include_once('Models/Games.php');
	include_once('Models/Deaths.php');
	$readOnly = isset($_GET['readOnly']) ? $_GET['readOnly'] : 0;
	$gameID = (isset($_GET['gameID']) && filter_var($_GET['gameID'], FILTER_VALIDATE_INT)) ? $_GET['gameID'] : 0;
	
	$Deaths = new Deaths($gameID);
	if($readOnly == 0){
		$Deaths->Increment();
	}

	echo json_encode($Deaths);
?>

