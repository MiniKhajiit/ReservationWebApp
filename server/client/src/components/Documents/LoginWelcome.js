import React from 'react';

export function LoginWelcome() {
    return (
        <div className="Welcome-container">
            <br/>
            <h1>Hello there!</h1>
            <h5>Welcome to the new Cedar Falls web aoplication!</h5>
            <br/>
            <p>There are few ways to use this app, but the first is getting an account created.</p>
            <p>If you have not already done so, click/tap on the "Create New User" button below!</p>
            <p>
                Accounts are made in reference to your name - your family name.
                You may later change your email and any other details, 
                and I do ask you include your email. 
            </p>
            <p>
                Once you hit "Submit" on creating your account,
                you will receive a verification email.
                This email creates a 2-step process to help me with security!
                After you verify, you may need to refresh your browser
                to make sure it updated correctly.
            </p>
            <br/>
            <p>After you have an account - you may login!</p>
            <br/>
            <br/>
            <p>You can reach out to me through the "Contact Support" Button.</p>
            <p>
                If you need help logging in, creating an account, 
                or if you want to report a bug or request a feature - 
                then send an email my way!
            </p>
            <br/>
            <br/>
            <p>
                ~Oh yeah!~, and try clicking that <a className="welcome-ig-link" href="https://instagram.com/cedarfallsranch">Instagram</a> button.
                <br/>
                It will take you to the associated Instagram account!
            </p>
        </div>
    )
}