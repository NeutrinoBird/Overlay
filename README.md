This project is a database-driven video overlay, used for video streaming. 
Its purpose is to provide an informative and decorative display of statistics when streaming games via Twitch or YouTube.
Currently, the overlay provides a death counter with statistics, and a quest timer for displaying the player's current objective.

The overlay is meant to be loaded through the Browser Source Plugin for OBS (Open Broadcaster Software).
It uses PHP/MySQL to store statistical and indicative data, and uses jQuery/CSS animations to display the information to the viewers.

## SETUP

The folder structure for this project assumes that the DocumentRoot of the server is pointed to the public directory, while the include_path in php.ini is pointed to the includes directory.
If you lack the permissions to configure these settings, you will need to move the files to your server's site root and include folders, respectively.

You will need add three tables to your MySQL database. Ideally, you should create a new database to store these tables, but you can use an existing database.
Use the following queries to create the tables:
```
CREATE TABLE tblGames(
	ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	label VARCHAR(50) NOT NULL,
	isActive BIT NOT NULL DEFAULT 1
);

CREATE TABLE tblDeaths(
	ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	gameID INT NOT NULL, 
	deathTime DATETIME NOT NULL,
	FOREIGN KEY (gameID) REFERENCES tblGames(ID)
);

CREATE TABLE tblQuests(
	ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	gameID INT NOT NULL, 
	label VARCHAR(100) NOT NULL,
	startTime DATETIME NOT NULL,
	FOREIGN KEY (gameID) REFERENCES tblGames(ID)
);
```
Additionally, you will need to modify includes/DatabaseLogin.php. This file contains the MySQL connection login info, which you will need to provide. This information includes the host DSN, username and password for the MySQL user, and the name of the database containing the above tables.

## USAGE

1. In OBS, add a new BrowserSource to the source list.
  1. Point the URL to overlay.php on your server.
  2. Set the width and height to 1600x900. (I designed it for this resolution for testing and performance reasons; It does not need to match your stream's resolution.)
  3. Set the FPS to 30. (Setting it higher can affect performance.)
  4. Check "Shutdown when not active" if you want to reset the interface by hiding and revealing the source.
  5. Click OK.
2. Resize the new source in the preview window to match the full frame of the stream.
3. To interact with the overlay, right click the browser source in the source list, and click "Interact".
  - At first, you will see a game selection menu. You will need to first click "New Game", type in a name for the game, and press enter. This will set up a new counter for that game.
  - To increment the death counter, click the skull, or press 'Z'.
  - To update the current objective display, click the text at the bottom of the overlay. Type in some new text, and press enter. A timer will show the time since you set this text.

## NOTES

The OBS Browser Plugin implements an older version of Chrome. As a result, it is incompatible with newer ECMAScript functionality, including modern class definitions and parameter defaults.
