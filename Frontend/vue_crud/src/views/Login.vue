<template>
    <div class="wrapper_login">
        <!--<div class="logo">
            <img src="@/assets/logo.svg" alt="">
        </div>-->
        <div class="text-center mt-4 name">
            Task Management System
        </div>
        <form class="p-3 mt-3">
            <div class="form-field d-flex align-items-center">
                <span class="far fa-user"></span>
                <!--<input type="text" name="userName" id="userName" placeholder="Username">-->
                <input type="text" name="email" id="userName" placeholder="Username" v-model="email">
            </div>
            <div class="form-field d-flex align-items-center">
                <span class="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Password" v-model="password">
            </div>
            <button class="btn mt-3" @click.prevent="login">Login</button> <!--use .prevent to avoid defualt action of the event-->   
        </form>
        <br>
        <div class="text-center fs-6">
            <!--<a href="#">Forget password?</a>-->
            Don't Have an Account?   <a href="register">Sign up</a>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup(){
        const email= ref('');
        const password=ref('');
        const router= useRouter();

       
        const login= async() =>{

            try {
                const response = await fetch('http://localhost:3000/api/users/login',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'

                    },
                    body: JSON.stringify({
                        email: email.value,
                        password: password.value
                    })
                });

                console.log('test')
                const result = await response.json();
                console.log(result)

                if (response.ok) {
                    // Store the token in localStorage for future authenticated requests
                    localStorage.setItem('authToken', result.token);
                   
                    console.log('Login successful');
                    //redirect to homepage
                    router.push('/home');
                
                
                }else {
                    //throw new Error("Network response was not OK");
                    console.error('Login failed:', result.message);
                    
                }
                
            } catch (error) {

                console.log('Error during login',error);
            }
        }

        const makeAuthenticatedRequest= async() => {
            try {
                // Retrieve the token from localStorage
                const token = localStorage.getItem('authToken');

                // Make an authenticated request to an admin-only endpoint
                const response = await fetch('http://localhost:3000/api/roles/admin-only', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });

                console.log('Response:', response.data);
            } catch (error) {
                console.error('Error during authenticated request:', error.response.data.message);
            }
        }

        return{email,password, login }

    }};
</script>
<style scoped>


/* Importing fonts from Google */
/*@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');*/

/* Reseting */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background: #ecf0f3;
}

.wrapper_login {
    max-width: 550px;
    min-height: 400px;
    margin: 80px auto;
    padding: 40px 30px 30px 30px;
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #fff;
}

/*.logo {
    width: 80px;
    margin: auto;
}

.logo img {
    width: 100%;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0px 0px 3px #5f5f5f,
        0px 0px 0px 5px #ecf0f3,
        8px 8px 15px #a7aaa7,
        -8px -8px 15px #fff;
}*/


.wrapper_login .name {
    font-weight: 600;
    font-size: 2.0rem;     /*1.4 */
    letter-spacing: 1.3px;
    padding-left: 10px;
    color: #555;
}

.wrapper_login .form-field input {
    width: 100%;
    display: block;
    border: none;
    outline: none;
    background: none;
    font-size: 1.7rem;
    color: #666;
    padding: 10px 15px 10px 10px;
    /* border: 1px solid red; */
}

.wrapper_login .form-field {
    padding-left: 10px;
    margin-bottom: 20px;
    border-radius: 20px;
    box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
}

.wrapper_login .form-field .fas {
    color: #555;
}

.wrapper_login .btn {
    box-shadow: none;
    width: 100%;
    height: 40px;
    background-color: #03A9F4;
    color: #fff;
    border-radius: 25px;
    box-shadow: 3px 3px 3px #b1b1b1,
        -3px -3px 3px #fff;
    letter-spacing: 1.3px;
}

.wrapper_login .btn:hover {
    background-color: #039BE5;
}

.wrapper_login a {
    margin-top: 20px;
    text-decoration: none;
    font-size: 1.5rem;   /* 0.8 */
    color: #03A9F4;
}

.wrapper_login a:hover {
    color: #039BE5;
}

@media(max-width: 380px) {
    .wrapper_login {
        margin: 30px 20px;
        padding: 40px 15px 15px 15px;
    }
}

</style>