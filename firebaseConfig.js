import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue, off } from 'firebase/database';

const firebaseConfig = {
  // Substitua com o objeto de configuração acima
  apiKey: "AIzaSyBmH__NnQBHzXIVNzx0AjpqH6SOg_zjW0g",
  authDomain: "boratrocar-7e01f.firebaseapp.com",
  databaseURL: "https://boratrocar-7e01f-default-rtdb.firebaseio.com",
  projectId: "boratrocar-7e01f",
  storageBucket: "boratrocar-7e01f.appspot.com",
  messagingSenderId: "254748397046",
  appId: "1:254748397046:android:2eff7e364002f06d384bd7"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);