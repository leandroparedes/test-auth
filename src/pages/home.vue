<template>
    <f7-page name="home">
        <!-- Top Navbar -->
        <f7-navbar large :sliding="false">
            <f7-nav-left>
                <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
            </f7-nav-left>
            <f7-nav-title sliding>test-auth</f7-nav-title>
            <f7-nav-title-large>test-auth</f7-nav-title-large>
        </f7-navbar>

        <!-- Page content -->

        <!-- User is authenticated-->
        <f7-block v-if="user">
            <div class="text-align-center">
                <img
                    v-if="user.photoURL"
                    :src="user.photoURL"
                    :alt="user.displayName"
                    class="avatar"
                >
                <f7-icon v-else f7="person" size="80"></f7-icon>
            </div>

            <h1 class="text-align-center">{{ user.displayName }}</h1>
        
            <f7-button @click="logout">Logout</f7-button>
        </f7-block>

        <!-- User is not authenticated -->
        <f7-block v-else>

            <f7-card>
                <!-- Login form -->
                <f7-card-header>Sign In</f7-card-header>
                <f7-card-content>
                    <form @submit.prevent="loginWithEmail">
                        <f7-list no-hairlines-md>
                            <f7-list-input
                                :value="login.email"
                                @input="login.email = $event.target.value"
                                label="Email Address"
                                placeholder="domain@example.cl"
                                type="email"
                                required
                            ></f7-list-input>

                            <f7-list-input
                                :value="login.password"
                                @input="login.password = $event.target.value"
                                label="Password"
                                type="password"
                                required
                            ></f7-list-input>
                        </f7-list>

                        <f7-button fill type="submit">Login with email</f7-button>
                    </form>
                </f7-card-content>
            </f7-card>

            <f7-block>
                <f7-block-title>Other sign in methods</f7-block-title>
                <f7-button
                    color="red"
                    fill
                    @click="loginWithGoogle"
                >
                    Sign in with Google
                </f7-button>
            </f7-block>

            <!-- Register form -->
            <f7-block>
                <f7-button
                    v-if="! register.showRegisterForm"
                    outline
                    @click="register.showRegisterForm = true"
                >
                    Create new account
                </f7-button>
            </f7-block>

            <f7-block>
                <form
                    v-if="register.showRegisterForm"
                    @submit.prevent="registerAccount"
                >
                    <f7-list no-hairlines-md>
                        <f7-list-input
                            :value="register.name"
                            @input="register.name = $event.target.value"
                            label="What's your name?"
                            placeholder="Leandro Paredes"
                            type="text"
                            required
                        ></f7-list-input>
                        <f7-list-input
                            :value="register.email"
                            @input="register.email = $event.target.value"
                            label="The email address you are going to sign in with"
                            placeholder="domain@example.cl"
                            type="email"
                            required
                        ></f7-list-input>
                        <f7-list-input
                            :value="register.password"
                            @input="register.password = $event.target.value"
                            label="Choose a password"
                            placeholder="password"
                            type="password"
                            required
                        ></f7-list-input>
                    </f7-list>

                    <f7-button fill type="submit">Create new account</f7-button>
                </form>
            </f7-block>
        </f7-block>
    </f7-page>
</template>

<script>
export default {
    data: function () {
        return {
            user: null,

            login: {
                email: '',
                password: ''
            },

            register: {
                name: '',
                email: '',
                password: '',
                showRegisterForm: false
            },
        };
    },

    mounted: function () {
        this.$f7.dialog.preloader();

        this.$firebase.auth().onAuthStateChanged(user => {
            this.user = user;

            this.$f7.dialog.close();
        });
    },

    methods: {
        loginWithEmail: function () {
            this.$firebase.auth()
                    .signInWithEmailAndPassword(this.login.email, this.login.password)
                    .then(res => {
                        this.user = this.$firebase.auth().currentUser.user;
                    })
                    .catch(error => {
                        console.error('Failed to login user.', error);
                        this.$f7.dialog.alert(`${error.message}. Please try again`);
                    });
        },
        loginWithGoogle: function () {
            const provider = new this.$firebase.auth.GoogleAuthProvider();
            this.$firebase.auth().signInWithRedirect(provider);
        },
        registerAccount: function () {
            this.$firebase.auth()
                    .createUserWithEmailAndPassword(this.register.email, this.register.password)
                    .then(userCredential => {
                        userCredential.user.updateProfile({
                            displayName: this.register.name
                        });
                    })
                    .catch(error => {
                        console.error('Failed to create user.', error);
                        this.$f7.dialog.alert(`${error.message}. Please try again`);
                    });
        },
        logout: function () {
            this.$firebase.auth()
                    .signOut()
                    .catch(error => {
                        console.error('Error while trying to loggout user', error);
                    });
        }
    }
}
</script>

<style scoped>
    .avatar {
        vertical-align: middle;
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
</style>