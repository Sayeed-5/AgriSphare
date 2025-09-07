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
import { getFirestore, collection, addDoc, getDocs, query, where, doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'

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
    const [dbUser, setDbUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user)

                const userDoc = await getDoc(doc(firestore, "Users", user.uid));
                if (userDoc.exists()) {
                    setDbUser(userDoc.data());
                }
            }
            else {
                setUser(null)
                setDbUser(null);
            }
        });
    }, [])

    // console.log(user);

    const signupWithEmailPassword = (email, password) => createUserWithEmailAndPassword(auth, email, password);
    const signinWithEmailPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const signinWithGoogle = () => signInWithPopup(auth, googleProvider);
    const logout = () => signOut(auth);
    const CreateNewUser = async (username, email, phone, password, location, user) => {
        return await setDoc(doc(firestore, 'Users', user.uid), {
          username,
          email,
          phone, 
          password,
          location,
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

    const AddNewProduct = async (name, category, description, unit, price, minOrder, stock, imageUrl) => {
        return await addDoc(collection(firestore, 'Products'), {
          name,
          category,
          description,
          unit,
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
    // Place Order function
    const placeOrder = async (productId, user) => {
        try {
            // 1. Save inside product's sub-collection
            const productOrdersRef = collection(firestore, "Products", productId, "Orders");
            const productOrderDoc = await addDoc(productOrdersRef, {
                userId: user.uid,
                email: user.email,
                displayName: user.displayName,
                productId,
                status: "ongoing",
            });

            // 2. Save inside global Orders collection (same orderId)
            const globalOrderRef = doc(firestore, "Orders", productOrderDoc.id);
            await setDoc(globalOrderRef, {
                userId: user.uid,
                email: user.email,
                displayName: user.displayName,
                productId,
                status: "ongoing",
            });

            return productOrderDoc; // return order ref if needed
        } catch (error) {
            console.error("Error placing order:", error);
            throw error;
        }
    };


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
              status: orderData.status || "ongoing", // default (later update from Firestore if you store it)
              ...orderDoc.data()
            });
          });
        }
        return orders;
    };
      
    const getProductsByid = async (id) => {
        return getDoc(doc(firestore, 'Products', id));
    }

    const updateOrderStatus = async (productId, orderId, newStatus) => {
        try {
          // 1. Update inside Product → productId → Orders
          const productOrderRef = doc(firestore, "Products", productId, "Orders", orderId);
          await updateDoc(productOrderRef, {
            status: newStatus,
          });
      
          // 2. Update inside Global Orders
          const globalOrderRef = doc(firestore, "Orders", orderId);
          await updateDoc(globalOrderRef, {
            status: newStatus,
          });
      
          console.log("Order status updated:", newStatus);
        } catch (error) {
          console.error("Error updating order status:", error);
        }
    };
      
    const isLoggedIn = user ? true : false;

    //console.log(user);

    return (
        <FirebaseContext.Provider value={{signupWithEmailPassword, signinWithEmailPassword, signinWithGoogle, CreateNewUser, logout, getAllProducts, AddNewProduct, fetchMyProducts, placeOrder, CreateNewSeller, getOrders, fetchMyOrders, getProductsByid, updateOrderStatus, user,dbUser, isLoggedIn}}>
            {props.children}
        </FirebaseContext.Provider>
    );
}

export { useFirebase };