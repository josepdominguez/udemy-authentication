import { Injectable } from '@angular/core';
import { User } from './user.interface';
import {Router} from '@angular/router'
import {Subject, Observable} from 'rxjs/Rx'
declare var firebase: any; //Because it's declared in index.html

@Injectable()


export class AuthService {
    constructor(private router: Router){}
    signupUser(user: User) {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }
    signinUser(user: User){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }
    isAuthenticated(): Observable<boolean>{
        /*

        var user = firebase.auth().currentUser;

        if (user) {
            return true;
        } else {
            return false;
        }

        This lead to some errors. When we are logged in from a protected page, 
        and click F5 we were redirected to the singup page. Why? Becase firebase
        was not yet ready: the user didn't have yet the value true because the API
        didn't have time to load. We will solve this with SUBJECTS.
        SUBJECTS: Subjects are Observables where we are not limited to serving but where we
        in our own can trigger certain results. So we'll do both: listen and emit.
        */
        const subject = new Subject<boolean>(); 
        /*<boolean>: Subject is a kind of observable but here we are not limited to observing.
        Also this is a generic type which means we can tell it which value it will pass eventually.
        We want to resolve to a boolean. So whenever we trigger something on that subject
        we will pass a boolean. ANd when we subscribe to the subject we know we will 
        eventually get back a boolean.

        */
        
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                subject.next(true); //emit the next value
            }else {
                subject.next(false);
            }
        });
        return subject.asObservable();
    }
    logout(){
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }, function (error) {
            // An error happened.
        });
        this.router.navigate(['/signin']);
    }
}