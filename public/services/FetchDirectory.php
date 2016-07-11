<?php
	include_once('Models/Games.php');
	
	$Directory = new Games();
	$Directory->GetDirectory();

	echo json_encode($Directory->counterListings);
?>

