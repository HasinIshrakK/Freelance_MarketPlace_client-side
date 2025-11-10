import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();

    const emailSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password).then(result => {
            const newUser = result.user;
            setUser(newUser);
            alert('signed up')
        })
            .catch((error) => {
                console.log(error);
            }
            );
    };

    const emailSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const _user = result.user;
                setUser(_user)
                alert('signed in')
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
        emailSignIn,
    };

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;