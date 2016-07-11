var gameID = 0;

var currentSlide = 0;
var currentSlideID = '';
var currentLastDeath = 0;
var slideDuration = 0;
var slideTimer = 0;
var deathCount = 0;
var deathDate = new Date();
var todaysDeathCount = 0;
var deathRate = 0;
var lastDeaths = [];
var firstLoaded = false;
var questLabel = '';
var questTime = new Date();

var skullAnimator = new AnimationHandler({script: [
	{ frame: 0, action: "playSound('scream');" },
	{ frame: 33, action: "playSound('laugh');" },
	{ frame: 131, action: "" }
]});

skullAnimator.AddElement(
	new AnimationElement({ID: "skullMouth", hiddenWhenStopped: true, script: [
		{ "background-position" : "-96px 0px" },
		{ "background-position" : "-96px -48px" },
		{ "background-position" : "-96px -96px" },
		{ "background-position" : "-96px -48px" }
	]})
);

skullAnimator.AddElement(
	new AnimationElement({ID: "skullEyes", hiddenWhenStopped: true, script: [
		{ "background-position" : "-144px 0px" },
		{ "background-position" : "-144px -48px" },
		{ "background-position" : "-144px -96px" },
		{ "background-position" : "-144px -48px" }
	]})
);

skullAnimator.AddElement(
	new AnimationElement({ID: "skullJaw", script: [
		{ frame: 0, action: { "top" : "60px" } },
		{ frame: 34, action: { "top" : "66px" } },
		{ frame: 36, action: { "top" : "72px" } },
		{ frame: 38, action: { "top" : "66px" } },
		{ frame: 40, action: { "top" : "60px" } },
		{ frame: 42, action: { "top" : "66px" } },
		{ frame: 44, action: { "top" : "72px" } },
		{ frame: 46, action: { "top" : "66px" } },
		{ frame: 48, action: { "top" : "60px" } },
		{ frame: 50, action: { "top" : "66px" } },
		{ frame: 52, action: { "top" : "72px" } },
		{ frame: 54, action: { "top" : "66px" } },
		{ frame: 56, action: { "top" : "60px" } },
		{ frame: 58, action: { "top" : "66px" } },
		{ frame: 61, action: { "top" : "72px" } },
		{ frame: 64, action: { "top" : "66px" } },
		{ frame: 67, action: { "top" : "60px" } },
		{ frame: 70, action: { "top" : "66px" } },
		{ frame: 73, action: { "top" : "72px" } },
		{ frame: 76, action: { "top" : "66px" } },
		{ frame: 79, action: { "top" : "60px" } },
		{ frame: 82, action: { "top" : "66px" } },
		{ frame: 85, action: { "top" : "72px" } },
		{ frame: 88, action: { "top" : "66px" } },
		{ frame: 91, action: { "top" : "60px" } },
		{ frame: 94, action: { "top" : "66px" } },
		{ frame: 97, action: { "top" : "72px" } },
		{ frame: 100, action: { "top" : "66px" } },
		{ frame: 103, action: { "top" : "60px" } },
		{ frame: 106, action: { "top" : "66px" } },
		{ frame: 109, action: { "top" : "72px" } },
		{ frame: 112, action: { "top" : "66px" } },
		{ frame: 115, action: { "top" : "60px" } },
		{ frame: 118, action: { "top" : "66px" } },
		{ frame: 121, action: { "top" : "72px" } },
		{ frame: 124, action: { "top" : "66px" } },
		{ frame: 127, action: { "top" : "60px" } }
	]})
);

var bloodAnimator = new AnimationHandler({script: [				
	{ frame: 1, action: '$("#blood-a").addClass("splat");' },
	{ frame: 8, action: '$("#blood-b").addClass("fade-in");' },
	{ frame: 36, action: '$(".blood-drip").addClass("blood-dripping");' },
	{ frame: 201, action: '$("#bloodContainer").addClass("fade-out");' },
	{ frame: 231, action: '$(".blood-drip").removeClass("blood-dripping"); $("#blood-a").removeClass("splat"); $("#blood-b").removeClass("fade-in"); $("#bloodContainer").removeClass("fade-out");' },
	{ frame: 232, action: '' }
]});

var milestoneAnimator = new AnimationHandler({script: [
	{ frame: 1, action: '$("#milestoneContainer").show(); $(".milestoneValue").html(deathCount);' },
	{ frame: 311, action: '$("#milestoneContainer").hide();' }
]});

var rattleAnimator = new AnimationHandler({script: [
	 'rattleCounter(20);',
	 'rattleCounter(19);',
	 'rattleCounter(18);',
	 'rattleCounter(17);',
	 'rattleCounter(16);',
	 'rattleCounter(15);',
	 'rattleCounter(14);',
	 'rattleCounter(13);',
	 'rattleCounter(12);',
	 'rattleCounter(11);',				
	 'rattleCounter(10);',
	 'rattleCounter(9);',
	 'rattleCounter(8);',
	 'rattleCounter(7);',
	 'rattleCounter(6);',
	 'rattleCounter(5);',
	 'rattleCounter(4);',
	 'rattleCounter(3);',
	 'rattleCounter(2);',
	 'rattleCounter(1);',
	 'rattleCounter(0);'
]});

function deathRequest(readOnly){
	if (gameID > 0){
		readOnly = readOnly || false;
		$.ajax({
			url: "services/IncrementDeaths.php",
			data: { 'readOnly': readOnly ? 1 : 0, 'gameID': gameID },
			dataType: "json"
		}).done(function(response){
			updateDisplayData(response);
		});
	}
}

function updateDisplayData(newData){
	deathCount = newData.deathCount;
	deathDate = new Date(newData.deathTime);
	todaysDeathCount = newData.todaysDeathCount;
	deathRate = newData.deathRate;
	lastDeaths = newData.lastDeaths;
	lastDeaths.reverse();

	if(firstLoaded){
		skullAnimator.Start();
		bloodAnimator.Start();
		rattleAnimator.Start();
		if((deathCount == 50)||(deathCount % 100 == 0)){
			milestoneAnimator.Start();
		}
	}
	firstLoaded = true;

	currentSlide = $("#lastDeathDates.slick-initialized").length ? $('#statsContainer').slick('slickCurrentSlide') : 0;
	currentSlideID = $('#statsContainer > div > div > div[data-slick-index='+currentSlide+']').attr('id');

	updateStyledContent("#deathCounter",deathCount);

	// Delete any existing carousels
	if($("#lastDeathDates.slick-initialized").length){
		for(i=$("#lastDeathDates .slick-slide").length;i>0;i--){
			$("#lastDeathDates").slick("slickRemove",i-1);
		}
		$("#lastDeathDates").slick("unslick");
	}
	if($("#statsContainer.slick-initialized").length){
		for(i=$("#statsContainer .slick-slide").length;i>0;i--){
			$("#statsContainer").slick("slickRemove",i-1);
		}
		$("#statsContainer").slick("unslick");
	}

	if(deathCount > 0){

		// Build carousels
		$('#statsContainer').slick({
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			vertical: true
		});	
		if(deathDate){
			$("#statsContainer").slick('slickAdd',
				`<div id="deathClock" class="statsItem">
					<div class="deathStats deathTimer lineOne" data-value="0:00:00:00">0:00:00:00</div>
					<div class="deathStats lineTwo" data-value="SINCE LAST DEATH">SINCE LAST DEATH</div>
				</div>`
			);
			updateDeathTimer();
		}

		if(deathRate > 1){
			$("#statsContainer").slick('slickAdd',
				`<div id="deathRate" class="statsItem">
					<div class="deathStats lineOne" data-value="`+deathRate.toString()+` DEATHS">`+deathRate.toString()+` DEATHS</div>
					<div class="deathStats lineTwo" data-value="PER HOUR">PER HOUR</div>
				</div>`
			);				
		}

		if(lastDeaths.length > 0){
			$("#statsContainer").slick('slickAdd',
				`<div id="lastDeaths" class="statsItem">
					<div class="deathStats lineOne" data-value="LAST `+lastDeaths.length.toString()+` DEATH`+((lastDeaths.length > 1) ? 'S' : '')+`">LAST `+lastDeaths.length.toString()+` DEATH`+((lastDeaths.length > 1) ? 'S' : '')+`</div>
					<div class="deathStats lineTwo" id="lastDeathDates"></div>
				</div>`
			);
		}

		if(todaysDeathCount > 0){
			$("#statsContainer").slick('slickAdd',
				`<div id="deathsToday" class="statsItem">
					<div class="deathStats lineOne" data-value="`+todaysDeathCount.toString()+` DEATH`+((todaysDeathCount > 1) ? 'S' : '')+`">`+todaysDeathCount.toString()+` DEATH`+((todaysDeathCount > 1) ? 'S' : '')+`</div>
					<div class="deathStats lineTwo" data-value="TODAY">TODAY</div>
				</div>`
			);					
		}

		// The last deaths carousel needs to be populated after the main carousel is completed
		if(lastDeaths.length > 0){					
			$('#lastDeathDates').slick({
				arrows: false,
				slidesToShow: 1,
					slidesToScroll: 1
			});
			lastDeaths.forEach(function(item,index){
				$("#lastDeathDates").slick('slickAdd','<div class="lastDeathDate" data-value="'+item+'">'+item+'</div>');
			});
		}
		
		if (currentSlideID && currentSlideID != ''){
			$('#statsContainer').slick('slickGoTo',$('#'+currentSlideID).attr('data-slick-index'),true);
		}

	}

}

function timeSince(lastTime){
	var now = new Date().getTime();
	var sinceLastTime = Math.floor((now - lastTime.getTime())/1000);
	var lastTimeString = (sinceLastTime % 60).toString();
	if((sinceLastTime % 60) < 10){lastTimeString = "0"+lastTimeString;}
	sinceLastTime = Math.floor(sinceLastTime/60);
	lastTimeString = (sinceLastTime % 60)+":"+lastTimeString;
	if((sinceLastTime % 60) < 10){lastTimeString = "0"+lastTimeString;}
	sinceLastTime = Math.floor(sinceLastTime/60);
	lastTimeString = (sinceLastTime % 24)+":"+lastTimeString;
	if((sinceLastTime % 24) < 10){lastTimeString = "0"+lastTimeString;}
	sinceLastTime = Math.floor(sinceLastTime/24);
	return sinceLastTime+":"+lastTimeString;
}

function updateDeathTimer(){	
	updateStyledContent(".deathTimer",timeSince(deathDate));
}

function updateQuestTimer(){	
	if (questLabel != '') updateStyledContent("#questTimer",timeSince(questTime));
}

function playSound(id){
	$("#audio-"+id).each(function(){
		this.play();
	});
}

function rattleCounter(amount){
	$("#deathCounter").css({"top" : ((Math.random() * amount * 2) + 30 - amount) + "px", "left" : ((Math.random() * amount * 2) + 80 - amount) + "px"});
}

function updateStyledContent(element,value){
	$(element).html(value);
	$(element).attr("data-value",value);
}

function showDirectoryMenu(){
	$.ajax({
		url: "services/FetchDirectory.php",
		dataType: "json"
	}).done(function(response){
		buildDirectoryMenu(response);
	});
}

function buildDirectoryMenu(response){
	var directoryContent = "";
	for(var element in response){
		directoryContent += '<li data-ID="'+this.response[element].ID+'" data-total="'+this.response[element].total+'" data-label="'+this.response[element].label+'">'+this.response[element].label+'</li>';
	}
	directoryContent += '<li data-new data-label="New Game">New Game</li><li data-add><form onsubmit="event.preventDefault(); return addCounter();"><input id="newCounter" type="text" value="" /></form></li>';
	$("#directoryMenu ul").html(directoryContent);
	$("#directoryMenu").show();
	initializeDirectoryMenu();
}

function initializeDirectoryMenu(){
	$("#directoryMenu ul li[data-ID]").click(function(){loadCounter($(this).attr("data-ID"));});
	$("#directoryMenu ul li[data-new]").click(function(){$("#directoryMenu ul li[data-new").hide();$("#directoryMenu ul li[data-add]").show();$("#directoryMenu ul li[data-add] input").focus();});	
}

function addCounter(){	
	$.ajax({
		url: "services/GetCounter.php",
		data: {newName: $("#newCounter").val()},
		dataType: "json"
	}).done(function(response){
		gameID = response.ID;
		$("#directoryMenu").hide();
		firstLoaded = true;
	});
	return false;
}

function loadCounter(loadGameID){		
	$.ajax({
		url: "services/GetCounter.php",
		data: {gameID: loadGameID},
		dataType: "json"
	}).done(function(response){
		gameID = loadGameID;
		updateDisplayData(response);
		loadQuest();
		$("#directoryMenu").hide();
	});
	return false;
}

function addQuest(){		
	$.ajax({
		url: "services/GetQuest.php",
		data: {gameID: gameID, label: $("#newQuest").val()},
		dataType: "json"
	}).done(function(response){
		$("#questDisplay").show();
		$("#questEntry").hide();
		initializeQuest(response);
	});
	return false;
}

function loadQuest(){		
	$.ajax({
		url: "services/GetQuest.php",
		data: {gameID: gameID},
		dataType: "json"
	}).done(function(response){
		initializeQuest(response);
	});
	return false;
}

function initializeQuest(newQuest){
	if(newQuest.label){
		questLabel = newQuest.label + ':';
		questTime = new Date(newQuest.startTime);
		updateStyledContent("#questLabel",questLabel);
		$("#questTimer").show();
		updateQuestTimer();
	}
}

$(function(){
	initializeDirectoryMenu();
	skullAnimator.Initialize();			

	$(document).keypress(function(event){
		if($("input").length == $("input:hidden").length){
			if(event.which == 122 || event.which == 90) deathRequest();
		}
	});

	$("#skullContainer").click(function(){
		deathRequest();	
	});

	$("#questDisplay").click(function(){
		$("#questDisplay").hide();
		$("#questEntry").show();
		$("#questEntry input").focus();
	});

	window.setInterval(function(){	
		if(gameID == 0 || deathCount == 0)return false;		
		
		currentSlide = $('#statsContainer').slick('slickCurrentSlide');
		currentSlideID = $('#statsContainer > div > div > div[data-slick-index='+currentSlide+']').attr('id');
		updateDeathTimer();
		updateQuestTimer();

		switch(currentSlideID){
			case 'deathClock':
				slideDuration = 10;
				break;
			case 'deathRate':
				slideDuration = 3;
				break;
			case 'lastDeaths':
				slideDuration = 2 * lastDeaths.length;
				break;
			case 'deathsToday':
				slideDuration = 3;
				break;
			default:
				slideDuration = 3;
		}
		slideTimer++;
		if(slideTimer >= slideDuration){
			$('#statsContainer').slick('slickNext');
			slideTimer = 0;
			if((currentSlideID != 'lastDeaths') && ($("#lastDeaths").length > 0)){							
				$('#lastDeathDates').slick('slickGoTo',lastDeaths.length-1,true);							
			}
		}else if((currentSlideID == 'lastDeaths') && (slideTimer % 2 == 0)){						
			$('#lastDeathDates').slick('slickPrev');
		}
	}, 1000);

	window.setInterval(function(){					
		skullAnimator.Animate();
		bloodAnimator.Animate();
		milestoneAnimator.Animate();
		rattleAnimator.Animate();
	}, 33);

	$(".hide").each(function(){
		$(this).removeClass("hide").hide();
	});

});		