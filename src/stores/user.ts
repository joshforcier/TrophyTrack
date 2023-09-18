import { ref, readonly } from 'vue';
import { defineStore } from 'pinia';

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    updateEmail,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { auth, db } from '../boot/firebase';
import {
    collection,
    updateDoc,
    setDoc,
    getDocs,
    getDoc,
    doc,
} from 'firebase/firestore';
// import firebase from 'firebase/compat/app';
import { useRouter } from 'vue-router';

// Required for side-effects
import 'firebase/firestore';

type UserDataType = {
    email: string | null;
    uid: string;
} | null;

export const useUserStore = defineStore('userData', () => {
    const userData = ref<UserDataType>(null);
    const loadingUser = ref(false);
    const loadingAuth = ref(false);
    const loadingSession = ref(false);
    const router = useRouter();
    const userProfile = ref();
    const userPoints = ref<{ [key: string]: any }[]>([]);

    const registerUser = async (
        email: string,
        password: string,
        phone: number,
        displayName: string
    ) => {
        loadingUser.value = true;
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            userData.value = { uid: user.uid, email: user.email };

            if (user) {
                await setDoc(doc(db, 'users', user.uid), {
                    email,
                    phone,
                    displayName,
                });
            }
            router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            loadingUser.value = false;
        }
    };

    const loginUser = async (email: string, password: string) => {
        loadingUser.value = true;
        try {
            const { user } = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            userData.value = { uid: user.uid, email: user.email };
            await getUserData(user.uid);
            router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            loadingUser.value = false;
        }
    };

    const logoutUser = async () => {
        try {
            await signOut(auth);
            userData.value = { uid: '', email: null };
            router.push('/login');
        } catch (error) {
            console.log(error);
        }
    };

    const getUserData = async (uid: string) => {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            userProfile.value = {
                email: docSnap.data().email,
                displayName: docSnap.data().displayName,
                phone: docSnap.data().phone,
                notifyMeBy: docSnap.data().notifyMeBy,
                isDark: docSnap.data().isDark,
            };
        } else {
            console.log('No such document!');
        }
    };

    const getUserPoints = async (uid: string) => {
        const querySnapshot = await getDocs(
            collection(db, 'users', uid, 'points')
        );
        querySnapshot.forEach((doc) => {
            const data = { [doc.id]: doc.data() };
            userPoints.value.push(data);
        });
    };

    const updateUserDisplayName = (displayName: string) => {
        const user = auth.currentUser;
        if (user) {
            updateProfile(user, {
                displayName,
            })
                .then(() => {
                    alert('Profile updated!');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log('No user is currently logged in.');
        }
    };

    const updateUserEmail = (email: string) => {
        const user = auth.currentUser;
        if (user) {
            updateEmail(user, email)
                .then(() => {
                    alert('Profile updated!');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log('No user is currently logged in.');
        }
    };

    const updateUserData = async (
        displayName: string,
        email: string,
        phone: string,
        notifyMeBy: {
            text: boolean;
            email: boolean;
        }
    ) => {
        try {
            const user = await auth.currentUser;

            const docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                displayName,
                email,
                phone,
                notifyMeBy,
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const updateUserIsDark = async (isDark: boolean) => {
        try {
            const user = await auth.currentUser;

            const docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                isDark,
            });
            console.log('Document written with ID: ', docRef.id);
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const resetPassword = (email: string) => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent!');
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const currentUser = () => {
        loadingAuth.value = true;
        return new Promise((resolve, reject) => {
            // Removed 'async'
            const unsubscribe = onAuthStateChanged(
                auth,
                (user) => {
                    unsubscribe(); // Moved here
                    if (user) {
                        userData.value = { uid: user.uid, email: user.email };
                        getUserData(user.uid)
                            .then(() => {
                                loadingAuth.value = false;
                                resolve(user);
                            })
                            .catch(reject); // You may handle it as you wish
                    } else {
                        userData.value = { uid: '', email: null };
                        userProfile.value = {
                            email: '',
                            displayName: '',
                            phone: 0,
                            notifyMeBy: { text: false, email: false },
                            isDark: false,
                        };
                        loadingAuth.value = false;
                        resolve(null);
                    }
                },
                (e) => {
                    unsubscribe();
                    loadingAuth.value = false;
                    reject(e);
                }
            );
        });
    };

    return {
        userData: readonly(userData),
        loadingUser,
        loadingAuth,
        loadingSession,
        userProfile,
        registerUser,
        loginUser,
        logoutUser,
        updateUserDisplayName,
        updateUserEmail,
        resetPassword,
        updateUserData,
        updateUserIsDark,
        getUserData,
        getUserPoints,
        currentUser,
    };
});
