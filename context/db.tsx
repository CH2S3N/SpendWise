import * as FileSystem from 'expo-file-system'
import { Asset} from 'expo-asset'

// load the database
const loadDatabase =async () => {
    // path of the database
    const dbName = "mySQLiteDB.db";
    const dbAsset = require("./../assets/mySQLiteDB.db");
    const dbUri =Asset.fromModule(dbAsset).uri;
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
  
    // making db if db doesnt exist
    
    const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
    if (!fileInfo.exists){
      await FileSystem.makeDirectoryAsync(
          `${FileSystem.documentDirectory}SQLite`,
          {intermediates: true}
      );
      await FileSystem.downloadAsync(dbUri,dbFilePath);
    }
  
  };

  export default loadDatabase;