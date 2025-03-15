import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

// load the database
const loadDatabase = async () => {
  const dbName = "mySQLiteDB.db";
  const dbAsset = require("./../assets/mySQLiteDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
  
  // console.log("Database URI:", dbUri);
  // console.log("Database File Path:", dbFilePath);
  
  // to reset the database
  // await FileSystem.deleteAsync(dbFilePath, { idempotent: true });

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  // console.log("Database file info:", fileInfo);
 
  try {
    if (!fileInfo.exists) {
      // console.log("Database file does not exist. Copying from assets...");
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
      await FileSystem.downloadAsync(dbUri, dbFilePath);
    } else {
      // console.log("Database already exists:", fileInfo);
    }

    const newFileInfo = await FileSystem.getInfoAsync(dbFilePath);
    // console.log("Database file info after copy:", newFileInfo);
    // console.log("Database Loaded successfully")

    return dbFilePath;

  } catch (error: any) {
    console.error('Error loading database:', error.message);
  }


};

export default loadDatabase;



// 