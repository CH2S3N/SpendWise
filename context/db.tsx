import * as FileSystem from 'expo-file-system';
import { Asset} from 'expo-asset';


// load the database
const loadDatabase =async () => {

    // path of the database
    const dbName = "mySQLiteDB.db";
    const dbAsset = require("./../assets/mySQLiteDB.db");
    const dbUri =Asset.fromModule(dbAsset).uri;
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

    //to reset the database
    // await FileSystem.deleteAsync(dbFilePath, { idempotent: true }); 

    // making db if db doesnt exist
    try {
      const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
      if (!fileInfo.exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, {
          intermediates: true,
        });
  

        await FileSystem.downloadAsync(dbUri, dbFilePath);
      }
  
  
    } catch (error: any) {
      console.error('Error loading database:', error.message);

    }
  };

  export default loadDatabase;