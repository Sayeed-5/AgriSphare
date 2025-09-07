import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        GoogleAuthProvider, 
        signInWithPopup, 
        onAuthStateChanged, 
        signOut 
    } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, setDoc } from 'firebase/firestore'

const FirebaseContext = createContext(null);
const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
  apiKey: "AIzaSyDN_ui-coacmMB129tNLoEvx3j-SUXvF0U",
  authDomain: "agrisphere-46d8d.firebaseapp.com",
  projectId: "agrisphere-46d8d",
  storageBucket: "agrisphere-46d8d.firebasestorage.app",
  messagingSenderId: "10363134237",
  appId: "1:10363134237:web:12f520dd82da6e611101f4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const firestore = getFirestore(app)


export const FirebaseProvider = (props) => {

    const [user , setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
            else {
                setUser(null)
            }
        });
    }, [])

    // console.log(user);

    const signupWithEmailPassword = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const signinWithEmailPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const signinWithGoogle = () => signInWithPopup(auth, googleProvider);
    const logout = () => signOut(auth);
    const CreateNewUser = async (username, email, phone, password, user) => {
        return await setDoc(doc(firestore, 'Users', user.uid), {
          username,
          email,
          phone, 
          password,
          role: "user"
        });
    };

    const CreateNewSeller = async (username, email, fullname, phone, password, location, gstinNo, categories, adharNo, user) => {
        return await setDoc(doc(firestore, 'Users', user.uid), {
          username,
          email,
          fullname,
          phone, 
          password,
          location, 
          gstinNo, 
          categories, 
          adharNo,
          role: "seller"
        });
    };

    const AddNewProduct = async (name, category, price, minOrder, stock, imageUrl) => {
        return await addDoc(collection(firestore, 'Products'), {
          name,
          category,
          price, 
          minOrder,
          stock,
          image : imageUrl,
          userId: user.uid,
          email: user.email,
          UserName: user.displayName,
          photoURL: user.photoURL
        });
    };
   
    const getAllProducts = () => {
        return getDocs(collection(firestore, 'Products'));
    }

    const fetchMyProducts = async () => {
        if (!user) return;
        const collectionRef = collection(firestore, 'Products');
        const q = query(collectionRef, where('userId', '==', user.uid));
        const result = await getDocs(q);
        return result;
    }

    const placeOrder = async (productId) => {
        const collectionRef = collection(firestore, 'Products', productId, 'Orders');
        const result = await addDoc(collectionRef, {
            userId: user.uid,
            email: user.email,
            displayName: user.displayName,
        });
        return result
    }

    const getOrders = async (productId) => {
        const collectionRef = collection(firestore, 'Products', productId, 'Orders');
        const result = await getDocs(collectionRef);
        return result;
    }

    const fetchMyOrders = async () => {
        const myProductsSnapshot = await fetchMyProducts();
        const orders = [];
      
        for (let doc of myProductsSnapshot.docs) {
          const productId = doc.id;
          const productData = doc.data();
      
          const ordersSnapshot = await getOrders(productId);
          ordersSnapshot.forEach(orderDoc => {
            orders.push({
              id: orderDoc.id,
              productId: productId,
              product: productData.name,
              pricePerUnit: productData.price,
              avatar: productData.image,
              name: orderDoc.data().displayName,
              quantity: productData.minOrder,
              total: productData.price * parseFloat(productData.minOrder),
              status: "ongoing", // default (later update from Firestore if you store it)
              ...orderDoc.data()
            });
          });
        }
      
        return orders;
      };
      
      
    const isLoggedIn = user ? true : false;

    //console.log(user);

    return (
        <FirebaseContext.Provider value={{signupWithEmailPassword, signinWithEmailPassword, signinWithGoogle, CreateNewUser, logout, getAllProducts, AddNewProduct, fetchMyProducts, placeOrder, CreateNewSeller, getOrders, fetchMyOrders, user, isLoggedIn}}>
            {props.children}
        </FirebaseContext.Provider>
    );
}

export { useFirebase };