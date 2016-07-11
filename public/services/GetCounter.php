<?php
	include_once('Models/Games.php');
	include_once('Models/Deaths.php');
	$newName = isset($_GET['newName']) ? $_GET['newName'] : '';
	$gameID = (isset($_GET['gameID']) && filter_var($_GET['gameID'], FILTER_VALIDATE_INT)) ? $_GET['gameID'] : 0;
	
	if($newName != ''){
		$Directory = new Games();
		echo '{"ID":"'.$Directory->AddListing($newName).'"}';
	}else{
		$BBDeaths = new Deaths($gameID);
		echo json_encode($BBDeaths);
	}
?>