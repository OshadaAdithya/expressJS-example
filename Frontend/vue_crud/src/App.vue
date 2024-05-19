<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div>
    
    <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      
      <!--<HelloWorld msg="Welcome to Home Page" />-->

      <nav>
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/register">Sign Up</RouterLink>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/taskList">Task List</RouterLink>
        
      </nav>
    </div>
  </header>
  <RouterView />
</div>

  
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  padding-bottom: 20px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 25px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: #57bb8e;
  
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

/*nav a:hover {
  color: #42b983; /* Highlight color on hover 
}*/

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-weight: bold;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

nav a:first-of-type {
  border: 0;
}

button{
  margin: 0 10px;
  padding: 5px;
  border: none;
  border-radius: 4px;
}

/*@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}*/

.wrapper{
  text-align: center;
  margin: 0 auto; 
}
</style>
