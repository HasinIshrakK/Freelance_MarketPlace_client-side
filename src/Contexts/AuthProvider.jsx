import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();

    const emailSignUp = async (email, password, name, photo) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(result.user, {
            displayName: name,
            photoURL: photo
        });

        return result.user;
    };

    const emailSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const _user = result.user;
                setUser(_user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully Logged In",
                    showConfirmButton: false,
                    timer: 1500,
                    theme: 'auto'
                });
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
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully Logged In",
                showConfirmButton: false,
                timer: 1500,
                theme: 'auto'
            });
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
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Logged Out",
            showConfirmButton: false,
            timer: 1500,
            theme: 'auto'
        });
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