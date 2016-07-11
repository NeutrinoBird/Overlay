<?php
	include_once('Models/Model.php');

	class Games extends Model{
		public $counterListings;

		function __construct(){
			parent::__construct();
			$this->tableName = 'tblGames';
			$this->tableKey = 'ID';			
			$this->counterListings = [];
		}

		public function GetDirectory(){
			$result = $this->db->queryGetAll("
				SELECT tblGames.ID, tblGames.label, COUNT(tblDeaths.ID) as total, MAX(tblDeaths.deathTime) as lastDate
				FROM tblGames
				LEFT JOIN tblDeaths ON tblDeaths.gameID = tblGames.ID
				WHERE tblGames.isActive = 1
				GROUP BY tblGames.ID, tblGames.label
				ORDER BY MAX(tblDeaths.deathTime) DESC;
			");
			$this->counterListings = [];
			foreach($result as $row){
				array_push($this->counterListings,[
					'ID' => $row->ID,
					'label' => $row->label,
					'total' => $row->total,
					'lastDate' => ($row->lastDate == '') ? 0 : strtotime($row->lastDate)
				]);
			}
		}

		public function AddListing($name){
			return $this->db->queryInsertGetID("INSERT INTO tblGames (label) VALUES (:name);",['name'=>$name]);			
		}

	}

?>