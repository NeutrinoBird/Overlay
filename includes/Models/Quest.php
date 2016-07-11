<?php
	include_once('Models/Model.php');

	class Quest extends Model{
		public $label;
		public $startTime;
		private $gameID;

		function __construct($gameID,$label=''){
			parent::__construct();
			$this->tableName = 'tblQuests';
			$this->tableKey = 'ID';
			$this->gameID = filter_var($gameID, FILTER_VALIDATE_INT) ? $gameID : 0;
			if(($label != '')&&($gameID > 0)){
				$this->AddQuest($label);
			}
			$this->GetQuest();
		}

		public function GetQuest(){			
			$result = $this->db->queryGetRow("
				SELECT label, startTime
				FROM tblQuests
				WHERE gameID = :gameID
				ORDER BY startTime DESC
				LIMIT 1;
			",['gameID'=>$this->gameID]);
			$this->label = $result->label;
			$this->startTime = $result->startTime;
		}

		public function AddQuest($label){			
			$this->db->query("INSERT INTO tblQuests (gameID, label, startTime) VALUES (:gameID, :label, now());",['gameID'=>$this->gameID, 'label'=>$label]);			
		}

	}

?>