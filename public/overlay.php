<?php
	include_once('Models/Games.php');
	
	$Directory = new Games();
	$Directory->GetDirectory();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Overlay</title>
		<link rel="stylesheet" type="text/css" href="css/deathCount.css"/>
		<link rel="stylesheet" type="text/css" href="css/lib/slick.css"/>
		<script type="text/javascript" src="js/lib/jquery-1.12.4.min.js"></script>
		<script type="text/javascript" src="js/lib/slick.min.js"></script>
		<script type="text/javascript" src="js/AnimationElement.js?r=<?php echo uniqid(); ?>"></script>
		<script type="text/javascript" src="js/AnimationHandler.js?r=<?php echo uniqid(); ?>"></script>
		<script type="text/javascript" src="js/deathCount.js?r=<?php echo uniqid(); ?>"></script>
	</head>
	<body>
		<div id="deathCounterContainer">
			<div id="skullContainer">
				<div id="skullMouth"></div>
				<div id="skullTop"></div>
				<div id="skullJaw"></div>
				<div id="skullEyes"></div>
			</div>
			<div id="deathCounter" data-value="0">0</div>
			<div id="statsContainer"></div>
		</div>
		<div id="bloodContainer">
			<div id="blood-a"></div>
			<div id="blood-b"></div>
			<div class="blood-drip" style="top: 494px; left: 379px;"></div>
			<div class="blood-drip" style="top: 479px; left: 506px;"></div>
			<div class="blood-drip" style="top: 490px; left: 531px;"></div>
			<div class="blood-drip" style="top: 522px; left: 628px;"></div>
			<div class="blood-drip" style="top: 542px; left: 450px;"></div>
			<div class="blood-drip" style="top: 543px; left: 521px;"></div>
			<div class="blood-drip" style="top: 475px; left: 620px;"></div>
			<div class="blood-drip" style="top: 603px; left: 518px;"></div>
			<div class="blood-drip" style="top: 597px; left: 495px;"></div>
			<div class="blood-drip" style="top: 628px; left: 533px; background-color:#630000;"></div>
			<div class="blood-drip" style="top: 645px; left: 572px;"></div>
			<div class="blood-drip" style="top: 652px; left: 630px;"></div>
			<div class="blood-drip" style="top: 700px; left: 651px;"></div>
			<div class="blood-drip" style="top: 704px; left: 600px;"></div>
			<div class="blood-drip" style="top: 714px; left: 625px;"></div>
			<div class="blood-drip" style="top: 773px; left: 586px;"></div>
			<div class="blood-drip" style="top: 794px; left: 575px;"></div>
			<div class="blood-drip" style="top: 797px; left: 545px;"></div>
			<div class="blood-drip" style="top: 588px; left: 375px;"></div>
			<div class="blood-drip" style="top: 694px; left: 435px; background-color:#630000;"></div>
			<div class="blood-drip" style="top: 711px; left: 531px; background-color:#630000;"></div>
		</div>
		<div id="milestoneContainer" class="hide">
			<div class="milestoneNumber shadow milestoneValue">1000</div>
			<div class="milestoneNumber"><span class="milestoneValue">1000</span></div>
			<div class="milestoneNumber outline milestoneValue">1000</div>
		</div>
		<div id="directoryMenu">
			<ul>
				<?php
					foreach($Directory->counterListings as $listing){
 						echo '<li data-ID="'.$listing['ID'].'" data-total="'.$listing['total'].'" data-label="'.$listing['label'].'">'.$listing['label'].'</li>';
					};
				?>
				<li data-new data-label="New Game">New Game</li>
				<li data-add class="hide">
					<form onsubmit="event.preventDefault(); return addCounter();">
						<input id="newCounter" type="text" value="" />
					</form>
				</li>
			</ul>	
		</div>

		<div id="questContainer">
			<div id="questDisplay" class="questRow">
				<div id="questLabel" data-value="Starting up">Starting up</div>
				<div id="questTimer" class="hide" data-value="0:00:00:00">0:00:00:00</div>				
			</div>
			<div id="questEntry" class="questRow hide">
				<form onsubmit="event.preventDefault(); return addQuest();">
					<input id="newQuest" type="text" value="" />
				</form>
			</div>
		</div>
		<audio id="audio-scream">
			<source src="media/scream.wav" type="audio/wav">
		</audio>
		<audio id="audio-laugh">
			<source src="media/laugh.wav" type="audio/wav">
		</audio>
	</body>
</html>