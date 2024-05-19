<template>
    <section class="vh-100 bg-image"
  style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Create an account</h2>

              <form>

                <div class="form-outline mb-4">
                  <input type="text" id="form3Example1cg" class="form-control form-control-lg" v-model="fname"/>
                  <label class="form-label" for="form3Example1cg">First Name</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="text" id="form3Example3cg" class="form-control form-control-lg" v-model="lname" />
                  <label class="form-label" for="form3Example3cg">Last Name</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="email" id="form3Example4cg" class="form-control form-control-lg" v-model="email" />
                  <label class="form-label" for="form3Example4cg">Email</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4cdg" class="form-control form-control-lg" v-model="password" />
                  <label class="form-label" for="form3Example4cdg">Password</label>
                </div>

                <div class="form-check d-flex justify-content-center mb-5">
                  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label class="form-check-label" for="form2Example3g">
                    I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                  </label>
                </div>

                <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" @click.prevent="registerUser">Register</button>
                </div>

                <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                    class="fw-bold text-body"><u>Login here</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    
</template>

<script>
import { ref } from 'vue';

export default {
    setup(){
        const fname= ref('');
        const lname= ref('');
        const email= ref('');
        const password=ref('');

        const registerUser= async() =>{
            try {
                const response= await fetch("http://localhost:3000/api/users/register",{
                    method: 'POST',
                    body: JSON.stringify({
                        first_name: fname.value,
                        last_name: lname.value,
                        email: email.value,
                        password: password.value,
                        role: 3

                    }),
                    headers: {
                        'Content-Type': 'application/json'     //this is necessary , otherwise it won't work
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    //localStorage.setItem('authToken', response.headers.get('auth-token'));
                    //console.log('response.headers.get', response.headers.get('auth-token'))
                    console.log(data); // Handle success response
                } else {
                    console.error('Registration failed');
                }

              fname.value= '';
              lname.value= '';
              email.value= '';
              password.value = '';
            }
            catch (error) {
                console.error('Error during registration:', error);
                
            }
        }
        // Return variables and functions for template use
      return {
        fname,
        lname,
        email,
        password,
        registerUser
      };
    }
}


</script>

<style scoped>
.gradient-custom-3 {
/* fallback for old browsers */
background: #84fab0;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5))
}
.gradient-custom-4 {
/* fallback for old browsers */
background: #84fab0;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1))
}



</style>