import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();

    const emailSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password).then(result => {
            const user = result.user;
            setUser(user);
            alert('signed in')
        })
            .catch((error) => {
                console.log(error);
            }
            );
    };

    const provider = new GoogleAuthProvider();

    const googleSignIn = () => {
        return signInWithPopup(auth, provider).then(result => {
            const user = result.user;
            setUser(user);
            alert('signed in')
        })
            .catch((error) => {
                console.log(error);
            }
            );
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    const logout = async () => {
        await signOut(auth);
        alert('signed out')
    }

    const value = {
        user,
        setUser,
        googleSignIn,
        logout,
        emailSignUp,
    };

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;