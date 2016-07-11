<?php
	include_once('DatabaseConnection.php');
	
	class Model{
		protected $db;
		protected $tableName;
		protected $tableKey;

		function __construct(){
			global $database;
			$this->db =& $database;
		}

		public function GetByID($ID){
			return $this->db->queryGetRow('SELECT * FROM '.$tableName.' WHERE '.$tableKey.' = :ID LIMIT 1;',['ID'=>intval($ID)]);
		}

		public function GetAll(){
			return $this->db->queryGetAll('SELECT * FROM '.$tableName.';');			
		}
	}

?>