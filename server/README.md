# tummocAssessment

This repo for the assignment in the MERN stack given from tummaoc

## Steps to follow implement Google OAuth

    1. Set up a new project in the Google Developers Console:
        a. Go to the Google Developers Console (https://console.cloud.google.com/apis/credentials/consent?project=goauth-388411/).
        b. Create a new project and enable the Google+ API.
        c. Go to  OAuth consent screen on left side navbar and Configure that, by providing the necessary information such as the application name and authorized domains.
        d. Go to Credetials tab, Obtain the client ID and client secret for your application.

    2. Server-side implementation (Node.js with Express):
        a. Install the required dependencies:
        '''npm install express passport passport-google-oauth20'''
