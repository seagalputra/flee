import { createRxDatabase, RxDatabase, addRxPlugin } from 'rxdb';
import SQLite from 'react-native-sqlite-2';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

const SQLiteAdapter = SQLiteAdapterFactory(SQLite);

addRxPlugin(SQLiteAdapter);
addRxPlugin(require('pouchdb-adapter-http'));

let database: Promise<RxDatabase> | null = null;

const _createDatabase = async (): Promise<RxDatabase> => {
  return createRxDatabase({
    name: 'fleedb',
    adapter: 'react-native-sqlite',
  });
};

const getDatabase = (): Promise<RxDatabase> => {
  if (!database) {
    database = _createDatabase();
  }

  return database;
};

export { getDatabase };
