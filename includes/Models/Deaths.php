<?php
	include_once('Models/Model.php');

	class Deaths extends Model{
		public $gameID;
		public $deathCount;
		public $deathTime;
		public $lastDeaths;
		public $todaysDeathCount;
		public $deathRate;

		function __construct($gameID){
			parent::__construct();
			$this->tableName = 'tblDeaths';
			$this->tableKey = 'ID';
			$this->gameID  = filter_var($gameID, FILTER_VALIDATE_INT) ? $gameID : 0;
			$this->GetDeaths();
		}

		public function GetDeaths(){
			$result = $this->db->queryGetRow('SELECT COUNT(1) as deathCount, MAX(deathTime) as deathTime 
											  FROM tblDeaths
											  WHERE gameID = :gameID;',
											['gameID'=>$this->gameID]);
			$this->deathCount = $result->deathCount;
			$this->deathTime = $result->deathTime;
			$result = $this->db->queryGetAll('SELECT deathTime 
												FROM tblDeaths 
												WHERE gameID = :gameID
												ORDER BY deathTime DESC 
												LIMIT 5;',
											['gameID'=>$this->gameID]);
			$this->lastDeaths = [];
			foreach($result as $row){
				array_push($this->lastDeaths,(count($this->lastDeaths)+1).') '.date('n/j H:i:s',strtotime($row->deathTime)));
			}
			$result = $this->db->queryGetRow('SELECT COUNT(1) as deathCount 
												FROM tblDeaths 
												WHERE deathTime > :date
												  AND gameID = :gameID;',
											['date'=>date('Y-m-d 06:00:00',time()-21600),
											 'gameID'=>$this->gameID]);
			$this->todaysDeathCount = $result->deathCount;
			$result = $this->db->queryGetRow('SELECT CASE WHEN COUNT(1) < 1 THEN 0 ELSE 3600*(COUNT(1)/TIMESTAMPDIFF(SECOND,MIN(deathTime), MAX(DeathTime))) END as deathRate
												FROM(
													SELECT deathTime
													FROM tblDeaths
													WHERE deathTime > DATE_ADD(now(), INTERVAL -5 hour)
													AND gameID = :gameID
													ORDER BY deathTime DESC
													LIMIT 5
												) data;',
											['gameID'=>$this->gameID]);
			$this->deathRate = number_format($result->deathRate, 2, '.', '');
		}

		public function Increment(){
			$this->db->query('INSERT INTO tblDeaths (gameID, deathTime) VALUES (:gameID ,now());',['gameID'=>$this->gameID]);
			$this->GetDeaths();
		}
	}

?>