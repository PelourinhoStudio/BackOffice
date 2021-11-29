import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: 'AIzaSyDjtLvaL3S8trnzQFZDsJSzXt3l9-pCRY4',
    authDomain: 'pelourinho-studio.firebaseapp.com',
    storageBucket: 'pelourinho-studio.appspot.com'
};
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp)

export { storage, ref, uploadBytesResumable, getDownloadURL }